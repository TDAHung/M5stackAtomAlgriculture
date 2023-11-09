import { View, Text, Dimensions, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ProgressChart, LineChart } from 'react-native-chart-kit';
import Loader from '../../../components/loader';

const maxDataPoints = 6
const minHumidity = 0;
const maxHumidity = 100;
const screenWidth = Dimensions.get("window").width;
const enumDangerState = {
    high: "high",
    quite_high: "quite high",
    normal: "normal",
    quite_low: "quite low",
    low: "low",
};
const Humidity = () => {
    const [humidity, setHumidity] = useState<any>([]);
    const [humidityState, setHumidityState] = useState<Array<number>>([]);
    const [createdAtData, setCreatedAtData] = useState<any>([]);

    useEffect(() => {
        const firebaseConnection = () => {
            firestore().collection('air_humidity_state').onSnapshot(data => {
                data.forEach((item) => {
                    const ratio = (item.data().value - minHumidity) / (maxHumidity - minHumidity);
                    setHumidityState([
                        ratio
                    ]);
                });
            })

            firestore().collection('air_humidity').onSnapshot(data => {
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
                setHumidity(tempValues);
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
        color: (opacity = 1) => getColor(humidityState, opacity),
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
                yAxisSuffix="%"
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

    if (humidity.length == 0) {
        return <Loader />
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                {
                    renderLineChart(humidity, createdAtData)
                }
                <View>
                    <View style={styles.chartWrapper} >
                        {
                            renderProgressChart(humidityState, ["Humidity"])
                        }
                        <View style={{ position: 'absolute', left: '36%', top: '43%', width: '30%' }}>
                            <Text style={{ fontSize: 25, color: getColor(humidityState, 1), textAlign: 'center' }}>
                                {(humidity[humidity.length - 1] == undefined ? null
                                    : humidity[humidity.length - 1].toFixed(2))
                                }%
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center", color: getColor(humidityState, 1), fontSize: 20 }}>
                            {`Your Humidity is ${getDangerState(humidityState)}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Humidity;
