import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Home from '../features/home';
import SoilNavigator from '../features/soil/navigation';

import { faCalendarDays, faDiagramProject, faHome, faWind } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-native';
import { Images } from '../assets';
import Pump from '../features/pump';
import AirNavigator from '../features/air/navigation';

const Tab = createMaterialBottomTabNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
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
