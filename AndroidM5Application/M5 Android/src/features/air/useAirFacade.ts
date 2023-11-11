import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useAirFacade = () => {
    const [temperatureState, setTemperatureState] = useState<any>();
    const [humidityState, setHumidityState] = useState<any>();
    const [co2State, setCO2State] = useState<any>();
    const [luxState, setLuxState] = useState<any>();

    useEffect(() => {
        const firebaseConnection = () => {
            firestore().collection('air_temperature_state').onSnapshot(data => {
                data.forEach((item) => {
                    setTemperatureState([
                        item.data()
                    ])
                });
            });

            firestore().collection('air_humidity_state').onSnapshot(data => {
                data.forEach((item) => {
                    setHumidityState([
                        item.data()
                    ])
                });
            });

            firestore().collection('air_co2_state').onSnapshot(data => {
                data.forEach((item) => {
                    setCO2State([
                        item.data()
                    ])
                });
            });

            firestore().collection('air_lux_state').onSnapshot(data => {
                data.forEach((item) => {
                    setLuxState([
                        item.data()
                    ])
                });
            });
        };

        firebaseConnection();
    }, [])

    return {
        temperatureState,
        humidityState,
        co2State,
        luxState
    };
}

export default useAirFacade;
