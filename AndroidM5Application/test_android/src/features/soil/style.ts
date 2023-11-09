import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FF3333',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    humidity: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#99CCFF',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    ph: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#99EDC3',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    ec: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    nitro: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#F4A460',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    phospho: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#D580FF',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    kali: {
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#AAC3F4',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    warning: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    buttonWrapper: {
        flexDirection: 'row',
        marginTop: 20,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
});
