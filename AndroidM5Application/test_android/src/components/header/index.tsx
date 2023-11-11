import { Text, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from "@react-native-firebase/messaging"
const Header = () => {
    const email = auth().currentUser?.email;

    const onSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                messaging().deleteToken();
                const id = auth().currentUser?.uid;
                firestore().collection('fcm_token').doc(id).set({ token: null });
                console.log('User signed out!')
            });
    }

    return (
        <View style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center",
            backgroundColor: "#F4EDF7"
        }}>
            <Text style={{ color: "#9D6DDD" }}>{email}</Text>
            <TouchableOpacity onPress={onSignOut}>
                <Text style={{ color: "#9D6DDD" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Header;
