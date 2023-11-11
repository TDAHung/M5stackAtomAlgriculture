import { View, Text, Dimensions, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ProgressChart, LineChart } from 'react-native-chart-kit';
import Loader from '../../../components/loader';

const maxDataPoints = 6
const minEC = 0;
const maxEC = 1500;
const screenWidth = Dimensions.get("window").width;
const enumDangerState = {
    high: "high",
    quite_high: "quite high",
    normal: "normal",
    quite_low: "quite low",
    low: "low",
};
const EC = () => {
    const [ec, setEC] = useState<any>([]);
    const [ecState, setECState] = useState<Array<number>>([]);
    const [createdAtData, setCreatedAtData] = useState<any>([]);

    useEffect(() => {
        const firebaseConnection = () => {
            firestore().collection('env_ec_state').onSnapshot(data => {
                data.forEach((item) => {
                    const ratio = (item.data().value - minEC) / (maxEC - minEC);
                    setECState([
                        ratio
                    ]);
                });
            })

            firestore().collection('env_ec').onSnapshot(data => {
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
                setEC(tempValues);
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
        color: (opacity = 1) => getColor(ecState, opacity),
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
                yAxisSuffix="mS/m"
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

    if (ec.length == 0) {
        return <Loader />
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                {
                    renderLineChart(ec, createdAtData)
                }
                <View>
                    <View style={styles.chartWrapper} >
                        {
                            renderProgressChart(ecState, ["Humidity"])
                        }
                        <View style={{ position: 'absolute', left: '36%', top: '43%', width: '30%' }}>
                            <Text style={{ fontSize: 25, color: getColor(ecState, 1), textAlign: 'center' }}>
                                {(ec[ec.length - 1] == undefined ? null
                                    : ec[ec.length - 1].toFixed(2))
                                }mS/m
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center", color: getColor(ecState, 1), fontSize: 20 }}>
                            {`Your Electronic Conductivity is ${getDangerState(ecState)}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default EC;
