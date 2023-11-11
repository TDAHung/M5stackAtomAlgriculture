import { TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import { Text } from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { api } from "../../api";
import { styles } from "./styles";
import Loader from "../../components/loader";

const Pump = () => {
    const [isActivePumpIn, setIsActivePumpIn] = useState<boolean>();
    const [isActivePumpOut, setIsActivePumpOut] = useState<boolean>();
    const [isActiveSubdivision1, setIsActiveSubdivision1] = useState<boolean>();
    const [isActiveSubdivision2, setIsActiveSubdivision2] = useState<boolean>();
    const [isActiveSubdivision3, setIsActiveSubdivision3] = useState<boolean>();
    const [isActiveSolution1, setIsActiveSolution1] = useState<boolean>();
    const [isActiveSolution2, setIsActiveSolution2] = useState<boolean>();
    const [isActiveSolution3, setIsActiveSolution3] = useState<boolean>();

    const [activeStylePumpIn, setActiveStylePumpIn] = useState<any>({});
    const [activeStylePumpOut, setActiveStylePumpOut] = useState<any>({});
    const [activeStyleSubdivision1, setActiveStyleSubdivision1] = useState<any>({});
    const [activeStyleSubdivision2, setActiveStyleSubdivision2] = useState<any>({});
    const [activeStyleSubdivision3, setActiveStyleSubdivision3] = useState<any>({});
    const [activeStyleSolution1, setActiveStyleSolution1] = useState<any>({});
    const [activeStyleSolution2, setActiveStyleSolution2] = useState<any>({});
    const [activeStyleSolution3, setActiveStyleSolution3] = useState<any>({});

    useEffect(() => {
        const firebaseConnection = () => {
            firestore().collection('pumpin_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActivePumpIn(false);
                        setActiveStylePumpIn({
                            button: styles.button_green,
                        });
                    } else {
                        setIsActivePumpIn(true);
                        setActiveStylePumpIn({
                            button: styles.button_green_active,
                        });
                    }
                });
            });

            firestore().collection('pumpout_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActivePumpOut(false);
                        setActiveStylePumpOut({
                            button: styles.button_green,
                        });
                    } else {
                        setIsActivePumpOut(true);
                        setActiveStylePumpOut({
                            button: styles.button_green_active,
                        });
                    }
                });
            });

            firestore().collection('solution1_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActiveSolution1(false);
                        setActiveStyleSolution1({
                            button: styles.button_blue,
                        });
                    } else {
                        setIsActiveSolution1(true);
                        setActiveStyleSolution1({
                            button: styles.button_blue_active,
                        });
                    }
                });
            });

            firestore().collection('solution2_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActiveSolution2(false);
                        setActiveStyleSolution2({
                            button: styles.button_blue,
                        });
                    } else {
                        setIsActiveSolution2(true);
                        setActiveStyleSolution2({
                            button: styles.button_blue_active,
                        });
                    }
                });
            });

            firestore().collection('solution3_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActiveSolution3(false);
                        setActiveStyleSolution3({
                            button: styles.button_blue,
                        });
                    } else {
                        setIsActiveSolution3(true);
                        setActiveStyleSolution3({
                            button: styles.button_blue_active,
                        });
                    }
                });
            });

            firestore().collection('subdivision1_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActiveSubdivision1(false);
                        setActiveStyleSubdivision1({
                            button: styles.button_purple,
                        });
                    } else {
                        setIsActiveSubdivision1(true);
                        setActiveStyleSubdivision1({
                            button: styles.button_purple_active,
                        });
                    }
                });
            });

            firestore().collection('subdivision2_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActiveSubdivision2(false);
                        setActiveStyleSubdivision2({
                            button: styles.button_purple,
                        });
                    } else {
                        setIsActiveSubdivision2(true);
                        setActiveStyleSubdivision2({
                            button: styles.button_purple_active,
                        });
                    }
                });
            });

            firestore().collection('subdivision3_state').onSnapshot(data => {
                data.forEach((item) => {
                    if (item.data().value === "0") {
                        setIsActiveSubdivision3(false);
                        setActiveStyleSubdivision3({
                            button: styles.button_purple,
                        });
                    } else {
                        setIsActiveSubdivision3(true);
                        setActiveStyleSubdivision3({
                            button: styles.button_purple_active,
                        });
                    }
                });
            });
        };

        firebaseConnection();
    }, []);

    const handleToActivePumpIn = () => {
        if (isActivePumpIn) {
            setActiveStylePumpIn({
                button: styles.button_green,
            });
        } else {
            setActiveStylePumpIn({
                button: styles.button_green_active,
            });
        }
        setIsActivePumpIn(!isActivePumpIn);
        api.pump_in.createDataToRelayPumpIn({
            "datum": {
                "value": Number(!isActivePumpIn)
            }
        });
    }

    const handleToActivePumpOut = () => {
        if (isActivePumpOut) {
            setActiveStylePumpOut({
                button: styles.button_green,
            });
        } else {
            setActiveStylePumpOut({
                button: styles.button_green_active,
            });
        }
        setIsActivePumpOut(!isActivePumpOut);
        api.pump_out.createDataToRelayPumpOut({
            "datum": {
                "value": Number(!isActivePumpOut)
            }
        });
    }

    const handleToActiveSubdivion1 = () => {
        if (isActiveSubdivision1) {
            setActiveStyleSubdivision1({
                button: styles.button_purple,
            });
        } else {
            setActiveStyleSubdivision1({
                button: styles.button_purple_active,
            });
        }
        setIsActiveSubdivision1(!isActiveSubdivision1);
        api.subdivision_1.createDataToRelaySubdivision1({
            "datum": {
                "value": Number(!isActiveSubdivision1)
            }
        });
    }

    const handleToActiveSubdivion2 = () => {
        if (isActiveSubdivision2) {
            setActiveStyleSubdivision2({
                button: styles.button_purple,
            });
        } else {
            setActiveStyleSubdivision2({
                button: styles.button_purple_active,
            });
        }
        setIsActiveSubdivision2(!isActiveSubdivision2);
        api.subdivision_2.createDataToRelaySubdivision2({
            "datum": {
                "value": Number(!isActiveSubdivision2)
            }
        });
    }



    const handleToActiveSubdivion3 = () => {
        if (isActiveSubdivision3) {
            setActiveStyleSubdivision3({
                button: styles.button_purple,
            });
        } else {
            setActiveStyleSubdivision3({
                button: styles.button_purple_active,
            });
        }
        setIsActiveSubdivision3(!isActiveSubdivision3);
        api.subdivision_3.createDataToRelaySubdivision3({
            "datum": {
                "value": Number(!isActiveSubdivision3)
            }
        });
    }

    const handleToActiveSolution1 = () => {
        if (isActiveSolution1) {
            setActiveStyleSolution1({
                button: styles.button_blue,
            });
        } else {
            setActiveStyleSolution1({
                button: styles.button_blue_active,
            });
        }
        setIsActiveSolution1(!isActiveSolution1);
        api.solution_1.createDataToRelaySolution1({
            "datum": {
                "value": Number(!isActiveSolution1)
            }
        });
    }

    const handleToActiveSolution2 = () => {
        if (isActiveSolution2) {
            setActiveStyleSolution2({
                button: styles.button_blue,
            });
        } else {
            setActiveStyleSolution2({
                button: styles.button_blue_active,
            });
        }
        setIsActiveSolution2(!isActiveSolution2);
        api.solution_2.createDataToRelaySolution2({
            "datum": {
                "value": Number(!isActiveSolution2)
            }
        });
    }



    const handleToActiveSolution3 = () => {
        if (isActiveSolution3) {
            setActiveStyleSolution3({
                button: styles.button_blue,
            });
        } else {
            setActiveStyleSolution3({
                button: styles.button_blue_active,
            });
        }
        setIsActiveSolution3(!isActiveSolution3);
        api.solution_3.createDataToRelaySolution3({
            "datum": {
                "value": Number(!isActiveSolution3)
            }
        });
    }

    if (!activeStylePumpIn) return <Loader />
    else return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={activeStylePumpIn.button} onPress={() => { handleToActivePumpIn() }}>
                <Text>Pump In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStylePumpOut.button} onPress={() => { handleToActivePumpOut() }}>
                <Text>Pump Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStyleSubdivision1.button} onPress={() => { handleToActiveSubdivion1() }}>
                <Text>Subdivision 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStyleSubdivision2.button} onPress={() => { handleToActiveSubdivion2() }}>
                <Text>Subdivision 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStyleSubdivision3.button} onPress={() => { handleToActiveSubdivion3() }}>
                <Text>Subdivision 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStyleSolution1.button} onPress={() => { handleToActiveSolution1() }}>
                <Text>Solution 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStyleSolution2.button} onPress={() => { handleToActiveSolution2() }}>
                <Text>Solution 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeStyleSolution3.button} onPress={() => { handleToActiveSolution3() }}>
                <Text>Soluttion 3</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Pump;
