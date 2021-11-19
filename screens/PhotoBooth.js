import React from 'react';
import {
    useWindowDimensions,
    View,
    Platform,
    SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native'


export function PhotoBooth({navigation}) {


    const insets = useSafeAreaInsets();
    const window = useWindowDimensions();

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: "#ffffff"}}
        >
            <Image
                source={require('../assets/home_bg.png')}
                style={{flex: 1, position: "absolute", width: "100%", height: window.height, top: 0}}
                resizeMode="cover"
            />
        </SafeAreaView>
    )

}