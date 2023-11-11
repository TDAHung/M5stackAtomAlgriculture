import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { Images } from '../../assets';
import { faDroplet, faExclamation, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import { styles } from './style';
import useAirFacade from './useAirFacade';

const AirStack = ({ navigation }: { navigation: any }) => {
    const metrics = useAirFacade();

    const onClick = (address: string) => {
        navigation.navigate(`${address}`);
    };

    const checkWarning = (dataState: any, min: Number, max: Number) => {
        if (dataState) {
            if (dataState[0].value <= min || dataState[0].value >= max) {
                return (
                    <View style={styles.warning}>
                        <Animatable.View animation='swing' iterationCount={'infinite'} >
                            <FontAwesomeIcon icon={faExclamation} size={35} color='#CC3300' />
                        </Animatable.View>
                    </View>
                );
            } else return null;
        } else return null;
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.buttonWrapper}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { onClick('Temperature') }}>
                            <FontAwesomeIcon icon={faTemperatureHalf} size={50} color='#FF3333' />
                            {checkWarning(metrics.temperatureState, 25, 40)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Temperature</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.humidity} onPress={() => { onClick('Humidity') }}>
                            <FontAwesomeIcon icon={faDroplet} size={50} color='#99CCFF' />
                            {checkWarning(metrics.humidityState, 20, 80)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Humidity</Text>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.co2} onPress={() => { onClick('Co2') }}>
                            <Image source={Images.co2} style={{ width: 50, height: 50 }} />
                            {checkWarning(metrics.co2State, 70, 95)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>CO2 Concentration</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.lux} onPress={() => { onClick('Brightness') }}>
                            <Image source={Images.ec} style={{ width: 50, height: 50, }} />
                            {checkWarning(metrics.luxState, 150, 300)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Brightness</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AirStack;
