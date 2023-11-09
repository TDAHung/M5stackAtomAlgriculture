import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useSoilFacade = () => {
    const [temperatureState, setTemperatureState] = useState<any>();
    const [humidityState, setHumidityState] = useState<any>();
    const [phState, setPHState] = useState<any>();
    const [ecState, setECState] = useState<any>();
    const [nitroState, setNitroState] = useState<any>();
    const [phosphorusState, setPhosphorusState] = useState<any>();
    const [kaliumState, setKaliumState] = useState<any>();

    useEffect(() => {
        const firebaseConnection = () => {
            firestore().collection('env_temperature_state').onSnapshot(data => {
                data.forEach((item) => {
                    setTemperatureState([
                        item.data()
                    ])
                });
            });

            firestore().collection('env_humidity_state').onSnapshot(data => {
                data.forEach((item) => {
                    setHumidityState([
                        item.data()
                    ])
                });
            });

            firestore().collection('env_ph_state').onSnapshot(data => {
                data.forEach((item) => {
                    setPHState([
                        item.data()
                    ])
                });
            });

            firestore().collection('env_ec_state').onSnapshot(data => {
                data.forEach((item) => {
                    setECState([
                        item.data()
                    ])
                });
            });

            firestore().collection('env_nitro_state').onSnapshot(data => {
                data.forEach((item) => {
                    setNitroState([
                        item.data()
                    ])
                });
            });

            firestore().collection('env_phosphorus_state').onSnapshot(data => {
                data.forEach((item) => {
                    setPhosphorusState([
                        item.data()
                    ])
                });
            });

            firestore().collection('env_kalium_state').onSnapshot(data => {
                data.forEach((item) => {
                    setKaliumState([
                        item.data()
                    ])
                });
            });
        };

        firebaseConnection();
    }, [])

    return [temperatureState, humidityState, phState, ecState, nitroState, phosphorusState, kaliumState];
}

export default useSoilFacade;
