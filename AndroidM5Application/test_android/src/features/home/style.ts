import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    title: {
        height: "17%",
        justifyContent: "center",
        alignItems: "center"
    },
    button_soil: {
        width: "80%",
        borderColor: "#99EDC3",
        borderRadius: 50,
        height: "20%",
        borderWidth: 2,
        paddingHorizontal: 20,
    },
    button_air: {
        width: "80%",
        borderColor: "#99EDC3",
        borderRadius: 50,
        borderWidth: 2,
        height: "20%",
        paddingHorizontal: 20,
        marginVertical: 30
    },
    button_device: {
        width: "80%",
        borderColor: "#99EDC3",
        borderRadius: 50,
        height: "20%",
        borderWidth: 2,
        paddingHorizontal: 20
    },
    content_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center"
    },
});
