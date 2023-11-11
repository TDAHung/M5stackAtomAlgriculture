import { createStackNavigator } from '@react-navigation/stack';

import Temperature from '../temperature';
import Humidity from '../humidity';
import EC from '../ec';
import PH from '../ph';
import Phospho from '../phospho';
import Kali from '../kali';
import Nitro from '../nitro';
import SoilStack from '..';

const Stack = createStackNavigator();

const SoilNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MetricStack"
                component={SoilStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Temperature" component={Temperature} />
            <Stack.Screen name="Humidity" component={Humidity} />
            <Stack.Screen name="PH" component={PH} />
            <Stack.Screen name="EC" component={EC} />
            <Stack.Screen name="Nitro" component={Nitro} />
            <Stack.Screen name="Phospho" component={Phospho} />
            <Stack.Screen name="Kali" component={Kali} />
        </Stack.Navigator>
    );
}

export default SoilNavigator;
