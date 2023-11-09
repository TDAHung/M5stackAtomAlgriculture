import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Temperature from '../temperature';
import Humidity from '../humidity';
import CO2 from '../co2';
import Lux from '../lux';
import AirStack from '..';

const Stack = createStackNavigator();

const AirNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MetricStack"
                component={AirStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Temperature" component={Temperature} />
            <Stack.Screen name="Humidity" component={Humidity} />
            <Stack.Screen name="Co2" component={CO2} />
            <Stack.Screen name="Brightness" component={Lux} />
        </Stack.Navigator>
    );
}

export default AirNavigator;
