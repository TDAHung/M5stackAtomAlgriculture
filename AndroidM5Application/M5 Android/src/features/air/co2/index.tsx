import { View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import Loader from '../../../components/loader';

const maxDataPoints = 6
const maxNitro: any = 100;
const minNitro: any = 0;
const screenWidth = Dimensions.get("window").width;
const enumDangerState = {
    high: "high",
    quite_high: "quite high",
    normal: "normal",
    quite_low: "quite low",
    low: "low",
};

const CO2 = () => {
    const [co2, setCO2] = useState<any>([]);
    const [co2State, setCO2State] = useState<Array<number>>([]);
    const [createdAtData, setCreatedAtData] = useState<any>([]);

    const [value, setValue] = useState<any>(0);


    useEffect(() => {
        const firebaseConnection = () => {
            firestore().collection('air_co2_state').onSnapshot(data => {
                data.forEach((item) => {
                    const ratio = (item.data().value - minNitro) / (maxNitro - minNitro);
                    setCO2State([
                        ratio
                    ]);
                });
            })

            firestore().collection('air_co2').onSnapshot(data => {
                const dataFetch: any = [];
                data.forEach((item) => {
                    dataFetch.push(item.data());
                });
                dataFetch.sort((a: any, b: any) => a.created_at - b.created_at);
                let created_at_data: any = [];
                let tempValues: any = [];
                dataFetch.forEach((data: any) => {
                    tempValues.push(Number(data.value));
                    const createdAt = new Date(data.created_at);
                    const options: any = {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    };
                    const vietnameseDateFormat = createdAt.toLocaleTimeString('vi-VN', options);
                    created_at_data.push(vietnameseDateFormat);
                });
                setCO2(tempValues);
                setCreatedAtData(created_at_data);
            });
        };

        firebaseConnection();

    }, []);


    const getDangerState = (value: any) => {
        if (value[0] >= 0.75 && value[0] <= 1) {
            return enumDangerState.high;
        }
        else if (value[0] >= 0.6 && value[0] < 0.75) {
            return enumDangerState.quite_high;
        }
        else if (value[0] >= 0 && value[0] <= 0.25) {
            return enumDangerState.low;
        }
        else if (value[0] > 0.25 && value[0] <= 0.4) {
            return enumDangerState.quite_low;
        }
        else {
            return enumDangerState.normal;
        }
    }

    const getColor = (value: any, opacity: any) => {
        if (value[0] >= 0.75 && value[0] <= 1) {
            return `rgba(222,12,28, ${opacity})`;
        }
        else if (value[0] >= 0.6 && value[0] < 0.75) {
            return `rgba(255,195,2, ${opacity})`;
        }
        else if (value[0] >= 0 && value[0] <= 0.25) {
            return `rgba(222,12,28, ${opacity})`;
        }
        else if (value[0] > 0.25 && value[0] <= 0.4) {
            return `rgba(255,195,2, ${opacity})`;
        }
        else {
            return `rgba(25, 135, 84, ${opacity})`;
        }
    };


    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => getColor(co2State, opacity),
        style: {
            borderRadius: 15,
        },
    };

    const renderLineChart = (data: any, createdData: any) => {
        if (data.length === 0 || createdData.length === 0) {
            return null;
        } else {
            const limitData = (data: any) => {
                const dataLength = data.labels.length;
                if (dataLength <= maxDataPoints) {
                    return data;
                }

                const startIndex = dataLength - maxDataPoints;
                const limitedData = {
                    labels: data.labels.slice(startIndex),
                    datasets: data.datasets.map((dataset: any) => ({
                        ...dataset,
                        data: dataset.data.slice(startIndex),
                    })),
                };

                return limitedData;
            };

            const dataSet = {
                labels: createdData,
                datasets: [
                    { data: data, },
                ],
            };

            return <LineChart
                data={limitData(dataSet)}
                width={screenWidth}
                height={300}
                yAxisSuffix="ppb"
                yAxisInterval={1}
                chartConfig={chartConfig}
                bezier
            />
        }
    }

    const renderProgressChart = (dataState: any, label: any) => {
        if (dataState.length === 0) {
            return null;
        } else {
            // each value represents a goal ring in Progress chart
            const data = {
                labels: label,
                data: dataState
            };
            return <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={10}
                radius={70}
                chartConfig={chartConfig}
                style={{
                    borderRadius: 16,
                }}
                hideLegend={true}
            />
        }
    }

    const styles = StyleSheet.create({
        chartWrapper: {
        }
    });

    console.log("allo", value);

    if (co2.length == 0) {
        return <Loader />;
    } else {
        return (
            <View style={{ flex: 1 }}>
                {
                    renderLineChart(co2, createdAtData)
                }
                <View>
                    <View style={styles.chartWrapper} >
                        {
                            renderProgressChart(co2State, ["Temperature"])
                        }
                        <View style={{ position: 'absolute', left: '36%', top: '43%', width: '30%' }}>
                            <Text style={{ fontSize: 25, color: getColor(co2State, 1), textAlign: 'center' }}>
                                {(co2[co2.length - 1] == undefined ? null
                                    : co2[co2.length - 1].toFixed(2))
                                }ppb
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center", color: getColor(co2State, 1), fontSize: 20 }}>
                            {`Your Co2 Concentration is ${getDangerState(co2State)}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default CO2;
