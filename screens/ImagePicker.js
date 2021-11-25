import React from 'react';
import {
    useWindowDimensions,
    View,
    Platform,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ImagePicker({navigation}) {


    const insets = useSafeAreaInsets();
    const window = useWindowDimensions();

    const closePressed = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: "#ffffff"}}
        >
            <Image
                source={require('../assets/home_bg.png')}
                style={{flex: 1, position: "absolute", width: "100%", height: window.height, top: 0}}
                resizeMode="cover"
            />
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: 40
                    }} />
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40
                    }}
                    onPress={() => closePressed()}
                >
                    <Text style={{color: "#ff0000"}}>X</Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    )

}