import { View, Image, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper";
import { styles } from "./style";
import { Images } from "../../assets";

const Home = ({ navigation }: { navigation: any }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{ fontSize: 25, textAlign: "center" }}>Welcome to M5 Atom Lite Smart Algriculture
                        Mobile Application</Text>
                </View>
                <View style={styles.button_soil}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Soil") }}>
                        <View style={styles.content_wrapper}>
                            <View>
                                <Image source={Images.ph} style={{ width: 50, height: 50, tintColor: "#99EDC3" }} />
                            </View>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontSize: 18 }}>Soil Metrics</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.button_air}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Air") }}>
                        <View style={styles.content_wrapper}>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontSize: 18 }}>Air Metrics</Text>
                            </View>
                            <View>
                                <Image source={Images.ph} style={{ width: 50, height: 50, tintColor: "#99EDC3" }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.button_device}>
                    <TouchableOpacity onPress={() => { navigation.navigate("PumpDevice") }}>
                        <View style={styles.content_wrapper}>
                            <View>
                                <Image source={Images.ph} style={{ width: 50, height: 50, tintColor: "#99EDC3" }} />
                            </View>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontSize: 18 }}>Carbinet Device</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

export default Home;
