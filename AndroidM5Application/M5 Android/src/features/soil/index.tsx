import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { Images } from '../../assets';
import { faDroplet, faExclamation, faK, faN, faP, faTemperatureHalf, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import { styles } from './style';
import useSoilFacade from './useSoilFacade';

const SoilStack = ({ navigation }: { navigation: any }) => {
    const [temperatureState, humidityState, phState, ecState, nitroState, phosphorusState, kaliumState] = useSoilFacade();

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
                            {checkWarning(temperatureState, 25, 40)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Temperature</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.humidity} onPress={() => { onClick('Humidity') }}>
                            <FontAwesomeIcon icon={faDroplet} size={50} color='#99CCFF' />
                            {checkWarning(humidityState, 20, 80)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Humidity</Text>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.ph} onPress={() => { onClick('PH') }}>
                            <Image source={Images.ph} style={{ width: 50, height: 50, tintColor: "#99EDC3" }} />
                            {checkWarning(phState, 5, 12)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>PH</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.ec} onPress={() => { onClick('EC') }}>
                            <Image source={Images.ec} style={{ width: 50, height: 50, }} />
                            {checkWarning(ecState, 20, 80)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>EC</Text>
                    </View>
                </View>

                <View style={styles.buttonWrapper}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.nitro} onPress={() => { onClick('Nitro') }}>
                            <FontAwesomeIcon icon={faN} size={50} color='#F5C116' />
                            {checkWarning(nitroState, 20, 80)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Nitro</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.phospho} onPress={() => { onClick('Phospho') }}>
                            <FontAwesomeIcon icon={faP} size={50} color='#D580FF' />
                            {checkWarning(phosphorusState, 20, 80)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Phosphorus</Text>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.kali} onPress={() => { onClick('Kali') }}>
                            <FontAwesomeIcon icon={faK} size={50} color='#AAC3F4' />
                            {checkWarning(kaliumState, 20, 80)}
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Potalium</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SoilStack;
