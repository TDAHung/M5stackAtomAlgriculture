import { useEffect, useState } from "react";
import { PermissionsAndroid, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

const PlantNavigator = () => {
    const [plant_name, setPlantName] = useState<string>("");
    const [plant_image, setPlantImage] = useState<any>(null);

    const [min_soil_temperature, setMinSoilTemperature] = useState<number>(0);
    const [max_soil_temperature, setMaxSoilTemperature] = useState<number>(0);
    const [min_soil_humidity, setMinSoilHumidity] = useState<number>(0);
    const [max_soil_humidity, setMaxSoilHumidity] = useState<number>(0);
    const [min_soil_ph, setMinSoilPH] = useState<number>(0);
    const [max_soil_ph, setMaxSoilPH] = useState<number>(0);
    const [min_soil_ec, setMinSoilEC] = useState<number>(0);
    const [max_soil_ec, setMaxSoilEC] = useState<number>(0);
    const [min_soil_nitro, setMinSoilNitro] = useState<number>(0);
    const [max_soil_nitro, setMaxSoilNitro] = useState<number>(0);
    const [min_soil_phosphorus, setMinSoilPhosphorus] = useState<number>(0);
    const [max_soil_phosphorus, setMaxSoilPhosphorus] = useState<number>(0);
    const [min_soil_potalium, setMinSoilPotalium] = useState<number>(0);
    const [max_soil_potalium, setMaxSoilPotalium] = useState<number>(0);

    const functionUseStateSoil: Array<any> = [
        {
            label: "Min Soil Temperature",
            state: setMinSoilTemperature
        },
        {
            label: "Max Soil Temperature",
            state: setMaxSoilTemperature
        },
        {
            label: "Min Soil Humidity",
            state: setMinSoilHumidity
        },
        {
            label: "Max Soil Humidity",
            state: setMaxSoilHumidity
        },
        {
            label: "Min Soil PH",
            state: setMinSoilPH
        },
        {
            label: "Max Soil PH",
            state: setMaxSoilPH
        },
        {
            label: "Min Soil EC",
            state: setMinSoilEC
        },
        {
            label: "Max Soil EC",
            state: setMaxSoilEC
        },
        {
            label: "Min Soil Nitro",
            state: setMinSoilNitro
        },
        {
            label: "Max Soil Nitro",
            state: setMaxSoilNitro
        },
        {
            label: "Min Soil Phosphorus",
            state: setMinSoilPhosphorus
        },
        {
            label: "Max Soil Phosphorus",
            state: setMaxSoilPhosphorus
        },
        {
            label: "Min Soil Potalium",
            state: setMinSoilPotalium
        },
        {
            label: "Max Soil Potalium",
            state: setMaxSoilPotalium
        },
    ];

    const RenderTextInput = () => {
        return functionUseStateSoil.map(state => {
            return (
                <View key={state.label} style={{
                    marginBottom: 20,
                    borderColor: "blue",
                    borderRadius: 10,
                    borderWidth: 1
                }}>
                    <Text>{state.label}</Text>
                    <TextInput keyboardType="numeric" style={{

                    }}
                        onChangeText={(value: any) => state.state(value)} />
                </View>
            );
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: "20%" }}>
                <View>
                    <TextInput
                        style={{ backgroundColor: "blue", marginBottom: 20 }}
                        onChangeText={(value: any) => setPlantName(value)}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                        }}
                    >
                        <Text>upload</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
                <ScrollView style={{ flex: 1 }}>
                    {RenderTextInput()}
                </ScrollView>
                <ScrollView style={{ flex: 1 }}>
                    <Text>aasdasd</Text>
                </ScrollView>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    borderBlockColor: "black",
                    borderWidth: 1,
                    borderRadius: 10,
                }}>
                    <Text style={{ textAlign: "center" }}>
                        Set
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PlantNavigator;
