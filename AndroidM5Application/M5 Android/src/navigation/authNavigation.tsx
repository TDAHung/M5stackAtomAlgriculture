import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/login';
import RegisterScreen from '../features/register';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='LoginScreen'>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>);
}

export default AuthStack;
