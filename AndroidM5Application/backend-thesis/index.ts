
const mqtt = require('mqtt');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./test-app-393803-firebase-adminsdk-s9gi2-32742d1a17.json');

// Adafruit configuration
const AIO_USERNAME = 'Suchuru';
const AIO_KEY = 'aio_rctQ44tIQlubyfnpLYr68iav0PB8';
const FEED_NAME = 'button';

// Firestore Init
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-app-393803-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = getFirestore();

const client = mqtt.connect({
    host: 'io.adafruit.com',
    port: 1883,
    username: AIO_USERNAME,
    password: AIO_KEY,
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

client.on('close', () => {
    console.log('Connect closed');
});
