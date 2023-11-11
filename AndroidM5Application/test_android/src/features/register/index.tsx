import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import Loader from '../../components/loader';

const RegisterScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm_password, setConfirmPassword] = useState<string>("");
    const [is_loading, setIsLoading] = useState<boolean>();

    const onPressLogin = () => {
        if (password === confirm_password) {
            setIsLoading(true);
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    setIsLoading(false);
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    setIsLoading(false);
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }
                    console.error(error);
                });
        }
        else {
            Alert.alert("Password not match");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput placeholder='Email' id="email" onChangeText={setEmail} />
            <TextInput placeholder='Password' secureTextEntry id="password" onChangeText={setPassword} />
            <TextInput placeholder='Confirm Password' secureTextEntry onChangeText={setConfirmPassword} />
            <TouchableOpacity
                style={{ backgroundColor: "blue" }}
                onPress={onPressLogin}
            >
                <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            {is_loading && <Loader />}
        </View>
    )
}

export default RegisterScreen;
