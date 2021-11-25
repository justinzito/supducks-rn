import React, { useState, createRef, useEffect } from 'react';
import {
    useWindowDimensions,
    View,
    Platform,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    BackHandler
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from "react-native-actions-sheet";

const actionSheetRef = createRef();

export function Home({navigation}) {

    const [image, setImage] = useState(null);

    const insets = useSafeAreaInsets();
    const window = useWindowDimensions();
    
    
    useEffect(() => {

        actionSheetRef.current?.hide()
        if (image != null) {
            navigation.navigate('Canvas',{image: image});
        }
     },[image]);


    const showImageChoice = () => {
        actionSheetRef.current?.setModalVisible();
    }

    const snapImage = async () => {


        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          
        });
      
        console.log(result.uri)
        if (!result.cancelled) {
            setImage({uri: result.uri});
            
        }
    }

    const pickImage = async () => {

        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return
        }
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            
        });
          
              
        console.log(result.uri)
        if (!result.cancelled) {
            setImage({uri: result.uri});
            
        }
        
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
                    height: 60,
                    marginHorizontal: 20,
                    marginTop: Platform.OS === 'android' ? 40 : 20,
                    marginBottom: 20,
                    width: window.width-40,
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    shadowColor: "#000000",
                    shadowOffset: {width: 4, height: 4},
                    shadowOpacity: 0.2
                }}
            />
            <View
                style={{
                    height: 60,
                    width: window.width-40,
                    marginHorizontal: 20,
                    marginTop: 0,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Image
                    source={require('../assets/supducks_logo.png')}
                    style={{
                        flex: 1,
                        resizeMode: "contain"
                    }}
                />
                <TouchableOpacity
                    style={{
                        marginLeft: 40
                    }}
                >
                    <Image
                        source={require('../assets/discord_button.png')}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginRight: 0,
                        marginLeft: 20
                    }}
                >
                    <Image
                        source={require('../assets/twitter_button.png')}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain"
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Image
                source={require('../assets/screen.png')}
                style={{
                    flex: 4,
                    resizeMode: "contain",
                    width: window.width-20,
                    marginHorizontal: 10,
                    marginVertical: 20
                }}
            />
            <View
                style={{
                    flex:3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 2,
                        marginLeft: 0,
                    }}
                    onPress={ () => showImageChoice() }
                >
                    <Image
                        source={require('../assets/camera_button.png')}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain"
                        }}
                    />
                </TouchableOpacity>
                <Image
                    source={require('../assets/insert_coin.png')}
                    style={{
                        flex: 1,
                        marginHorizontal: 20,
                        resizeMode: "contain",
                    }}
                />
            </View>
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginHorizontal: 20,
                    marginTop: 20,
                }}
            >
                <Image
                    source={require('../assets/membership_button.png')}
                    style={{
                        width: "100%",
                        height: "120%",
                        resizeMode: "contain",
                        position: "absolute",
                        top: Platform.OS === 'android' ? 0 : 20
                    }}
                />
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef}>
                <View
                    style={{
                        backgroundColor: "#fafafa",
                        height: 180+insets.bottom,
                    }}
                >
                    <TouchableOpacity
                        style={{

                            height: 60,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff"
                        }}
                        onPress={() => snapImage()}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#3478f6"
                            }}
                        >Snap Photo</Text>
                    </TouchableOpacity>
                    <View
                            style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: "#f0f0f0"
                            }}
                    />
                    <TouchableOpacity
                        style={{

                            height: 60,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff"
                        }}
                        onPress={() => pickImage()}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#3478f6"
                            }}
                        >Choose Photo</Text>
                    </TouchableOpacity>
                    <View
                            style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: "#f0f0f0"
                            }}
                    />
                    <TouchableOpacity
                        style={{

                            height: 60,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff"
                        }}
                        onPress={() => {setImage(require('../assets/boardwalk.png'))}}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#3478f6"
                            }}
                        >Boardwalk</Text>
                    </TouchableOpacity>
                    <View
                            style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: "#f0f0f0"
                            }}
                    />
                    
                </View>
            </ActionSheet>
        </SafeAreaView>
    )

}