
const mqtt = require('mqtt');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./test-app-393803-firebase-adminsdk-s9gi2-6e9ac92f5b.json');
require('dotenv').config();

// Adafruit configuration
const AIO_USERNAME = 'Suchuru';
const AIO_KEY = 'aio_gmgQ91gxv21KvRWrL5MZZKEdtz9q';

// Firestore Init
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-app-393803-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = getFirestore();

const client = mqtt.connect({
    host: 'io.adafruit.com',
    port: 1883,
    username: process.env.AIO_USERNAME,
    password: process.env.AIO_PASSWORD,
});


client.on('connect', () => {
    console.log('Connected to io.adafruit.com successfully');
    client.subscribe(`${AIO_USERNAME}/feeds/env.humidity`);
    client.subscribe(`${AIO_USERNAME}/feeds/env.ec`);
    client.subscribe(`${AIO_USERNAME}/feeds/env.temperature`);
    client.subscribe(`${AIO_USERNAME}/feeds/env.kalium`);
    client.subscribe(`${AIO_USERNAME}/feeds/env.nitro`);
    client.subscribe(`${AIO_USERNAME}/feeds/env.ph`);
    client.subscribe(`${AIO_USERNAME}/feeds/env.phosphorus`);

    client.subscribe(`${AIO_USERNAME}/feeds/relay.pumpin`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.pumpout`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.solution1`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.solution2`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.solution3`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.subdivision1`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.subdivision2`);
    client.subscribe(`${AIO_USERNAME}/feeds/relay.subdivision3`);

    client.subscribe(`${AIO_USERNAME}/feeds/air.humidity`);
    client.subscribe(`${AIO_USERNAME}/feeds/air.temperature`);
    client.subscribe(`${AIO_USERNAME}/feeds/air.co2`);
    client.subscribe(`${AIO_USERNAME}/feeds/air.lux`);
});

client.on('message', (topic: String, message: String) => {
    console.log(`received message ${topic}: ${message.toString()}`);
    const subscribeTopic = topic.split('/');
    const processTopic = subscribeTopic[subscribeTopic.length - 1].split('.');
    const mqttData = message.toString();
    let collection = processTopic[processTopic.length - 1];
    if (processTopic[0] === 'env' || processTopic[0] == 'air') {
        const docRef = db.collection(`${processTopic[0]}_${collection.toString()}`);
        const stateTopic = collection.concat("_state");
        const docRefState = db.collection(`${processTopic[0]}_${stateTopic.toString()}`);
        sendNotification(`${processTopic[0]}_${collection.toString()}`, Number(mqttData));
        docRef.add({
            value: mqttData,
            created_at: Date.now(),
        });
        docRefState.doc('Gcb9KWzfG1IHFIfEbflJ').set({
            value: mqttData,
            created_ad: Date.now(),
        });
    } else {
        const stateTopic = collection.concat("_state");
        const docRefState = db.collection(`${stateTopic.toString()}`);
        docRefState.doc('Gcb9KWzfG1IHFIfEbflJ').set({
            value: mqttData,
            created_ad: Date.now(),
        });
    }
});


const sendNotification = async (topic: String, data: number) => {
    let min_range = 0;
    let max_range = 99;
    let sensor = "";
    let unit = "";
    switch (topic) {
        case `env_humidity`:
            min_range = 20;
            max_range = 80;
            sensor = "soil humidity";
            unit = '%';
            break;
        case `env_ec`:
            min_range = 150;
            max_range = 250;
            sensor = "soil electronic conductivity";
            unit = "";
            break;
        case `env_temperature`:
            min_range = 25;
            max_range = 40;
            sensor = "soil temperature";
            unit = "°C";
            break;
        case `env_kalium`:
            min_range = 0;
            max_range = 40;
            sensor = "soil kalium";
            unit = "";
            break;
        case `env_nitro`:
            min_range = 0;
            max_range = 40;
            sensor = "soil nitrogen";
            unit = "";
            break;
        case `env_ph`:
            min_range = 3;
            max_range = 12;
            sensor = "soil PH";
            unit = "";
            break;
        case `env_phosphorus`:
            min_range = 0;
            max_range = 40;
            sensor = "soil phosphorus";
            unit = "";
            break;
    }

    if (data < min_range || data > max_range) {
        const response = await db.collection("fcm_token").get();
        const tokenList: String[] = [];

        response.forEach((item: any) => {
            if (item.data().token != null) {
                tokenList.push(item.data().token);
            }
        });
        if (tokenList.length == 0) {
            return;
        }

        const message: any = {
            data: {
                score: '850',
                time: '2:45'
            },
            tokens: tokenList,
            notification: {
                title: 'Warning',
                body: `Your upcoming data of ${sensor} is out of range min value: ${min_range} ${unit}, max value: ${max_range} ${unit}: ${data} ${unit}`
            },
        };
        admin.messaging().sendMulticast(message)
            .then((notiRes: any) => {
                console.log(notiRes.successCount + ' messages were sent successfully');
            });
    }
}

client.on('close', () => {
    console.log('Connect closed');
});
