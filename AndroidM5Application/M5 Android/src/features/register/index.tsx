import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import Loader from '../../components/loader';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
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
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 30, justifyContent: "center" }}>
            <TextInput style={{ borderBottomWidth: 1, borderColor: "#BE93D4" }} placeholderTextColor={"#BE93D4"} placeholder='Email' id="email" onChangeText={setEmail} />
            <TextInput style={{ borderBottomWidth: 1, borderColor: "#BE93D4" }} placeholderTextColor={"#BE93D4"} placeholder='Password' secureTextEntry id="password" onChangeText={setPassword} />
            <TextInput style={{ borderBottomWidth: 1, borderColor: "#BE93D4" }} placeholderTextColor={"#BE93D4"} placeholder='Confirm Password' secureTextEntry onChangeText={setConfirmPassword} />
            <TouchableOpacity
                style={{ backgroundColor: "#BE93D4", marginTop: 50, paddingVertical: 10 }}
                onPress={onPressLogin}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate("LoginScreen"); }}
            >
                <Text style={{ textDecorationLine: "underline", color: "#BE93D4", textAlign: "center", marginTop: 20 }}>Login</Text>
            </TouchableOpacity>
            {is_loading && <Loader />}
        </View>
    )
}

export default RegisterScreen;
