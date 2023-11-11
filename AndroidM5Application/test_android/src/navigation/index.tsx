import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Home from '../features/home';
import SoilNavigator from '../features/soil/navigation';

import { faCalendarDays, faDiagramProject, faHome, faWind } from '@fortawesome/free-solid-svg-icons';
import { Image, Text } from 'react-native';
import { Images } from '../assets';
import Pump from '../features/pump';
import AirNavigator from '../features/air/navigation';
import AuthStack from './authNavigation';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import Header from '../components/header';

const Tab = createMaterialBottomTabNavigator();

const AppNavigation = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    // Handle user state changes
    const onAuthStateChanged = (user: any) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        );
    }


    return (
        <NavigationContainer>
            <Header />
            <Tab.Navigator
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: () => (
                            <FontAwesomeIcon icon={faHome} size={23} color='#966FD6' />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Soil"
                    component={SoilNavigator}
                    options={{
                        tabBarLabel: 'Soil Metrics',
                        tabBarIcon: () => (
                            <FontAwesomeIcon icon={faDiagramProject} size={23} color='#966FD6' />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Air"
                    component={AirNavigator}
                    options={{
                        tabBarLabel: 'Air Metrics',
                        tabBarIcon: () => (
                            <FontAwesomeIcon icon={faWind} size={23} color='#966FD6' />
                        ),
                    }}
                />
                <Tab.Screen
                    name="PumpDevice"
                    component={Pump}
                    options={{
                        tabBarLabel: 'Carbinet Device',
                        tabBarIcon: () => (
                            <Image source={Images.pump} style={{ width: 23, height: 23, tintColor: '#966FD6' }} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigation;
