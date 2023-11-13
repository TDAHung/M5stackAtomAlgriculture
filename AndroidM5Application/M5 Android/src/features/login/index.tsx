import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import Loader from '../../components/loader';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [is_loading, setIsLoading] = useState<boolean>();

    const onPressLogin = () => {
        setIsLoading(true);
        Keyboard.dismiss();
        auth()
            .signInWithEmailAndPassword(email, password)
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

                if (error.code === 'auth/invalid-login') {
                    console.log(`That email address haven't been register!`);
                }
                console.error(error);
            });
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 30, justifyContent: "center" }}>
            <TextInput style={{ borderBottomWidth: 1, borderColor: "#BE93D4" }} placeholderTextColor={"#BE93D4"} placeholder='Email' id="email" onChangeText={setEmail} />
            <TextInput style={{ borderBottomWidth: 1, borderColor: "#BE93D4" }} placeholderTextColor={"#BE93D4"} placeholder='Password' secureTextEntry id="password" onChangeText={setPassword} />
            <TouchableOpacity
                style={{ backgroundColor: "#BE93D4", marginTop: 50, paddingVertical: 10 }}
                onPress={onPressLogin}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate("RegisterScreen"); }}
            >
                <Text style={{ textDecorationLine: "underline", color: "#BE93D4", textAlign: "center", marginTop: 20 }}>Register a new account</Text>
            </TouchableOpacity>
            {is_loading && <Loader />}
        </View>
    )
}

export default LoginScreen;
