import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Animation } from '../../assets';

const Loader = () => {
    return (
        <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "white"
        }}>
            <LottieView source={Animation.loader} autoPlay loop style={{ height: 175, width: 175 }} />
        </View>
    );
}

export default Loader;
