import React, {useEffect, useRef, useState, createRef } from 'react';
import { 
    Animated,
    useWindowDimensions,
    SafeAreaView,
    Platform,
    Image,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DragRotateScaleImage } from '../components/dragRotateScaleImage';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export function Canvas({navigation, route}) {

    const [image,setImage] = useState(require('../assets/image_default_bg.png'));


    const [itemState, setItemState] = useState(
        {
            selectedIndex: -1,
            items: [
                {
                    image: require('../assets/pyramid.png'),
                    transform: {
                        offset: { x: 0, y: 0 },
                        scale: 1,
                        rotate: 0,
                        scaleX: 1
                    }
                }
            ]
        }
    );

    const frameRef = createRef();

    var scratchState = itemState.items.length-1 >= 0 ? 
    itemState.items[itemState.items.length-1].transform : 
    {
        offset: {x: 0, y: 0},
        scale: 1,
        rotate: 0,
        scaleX: 1
    };

    useEffect(() => {
       //console.log("selected index: " + JSON.stringify(itemState))
       if (itemState.selectedIndex > -1) {
        scratchState = itemState.items[itemState.selectedIndex].transform;
       }
    },[itemState.selectedIndex]);

    
    useEffect(() => {
        //console.log("image loading: " + JSON.stringify(route.params.image));
        //setImage(require('../assets/image_default_bg.png'));
        setImage(route.params.image)
        
     },[]);

   
    const ImageItemView = ({itemIndex}) => {

        var itemAttrs = itemState.items[itemIndex];

        if (itemIndex == itemState.selectedIndex) {

            return (
                <DragRotateScaleImage
                    attributes={itemAttrs}
                    onEnd={(itemAttributes) => gestureEnded(itemAttributes)}
                />
            )
        } 

        //console.log("drawing state: " + JSON.stringify(itemAttrs));
        
        return (

            
            <Pressable
                style={androidContainerStyle(
                    itemAttrs.transform.offset.x,
                    itemAttrs.transform.offset.y,
                    itemAttrs.transform.scale,
                    itemAttrs.transform.scaleX
                    )}
                onPress={() => itemSelected(itemIndex)}
            >
                <Image 
                    source={itemAttrs.image}
                    style={[{
                        width: 150,
                        height: 150,
                        alignSelf: 'center',
                        position: "absolute"
                      },
                        {
                            transform: iosTranslateRotate(
                                itemAttrs.transform.offset.x,
                                itemAttrs.transform.offset.y,
                                itemAttrs.transform.rotate,
                                itemAttrs.transform.scale,
                                itemAttrs.transform.scaleX
                            )
                        }
                    ]}
                />
            </Pressable>

        )

    }

    const androidContainerStyle = (x, y,s) => {

        if ( Platform.OS === 'android' ) {
            return {
                backgroundColor: "#00000000",
                width: 150,
                height: 150,
                position: "absolute",
                alignSelf: 'center',
                transform: [
                    {translateX: x},
                    {translateY: y}
                ]
            }
        }
    }

    const iosTranslateRotate = (x,y,r,s,sx) => {

        var angle = r + "rad"

        if (Platform.OS === 'ios') {
            return [
                {translateX: x},
                {translateY: y},
                {rotate: angle},
                {scale: s},
                {scaleX: sx}
            ]
        } else {
            if (sx == -1) {
                angle = (r * sx) + "rad"
            }
            
            return [
                {scale: s},
                {scaleX: sx},
                {rotate: angle}
            ]
        }
    }

    const Toolbar = () => {

        if (itemState.selectedIndex > -1) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 0,
                        height: insets.bottom + window.width/3,
                        width: window.width-20,
                        marginHorizontal: 10
                    }}
                >
                    <TouchableOpacity
                        style={{flex: 1, alignItems: "center", marginHorizontal: 10}}
                        onPress={() => deletePressed()}
                        activeOpacity={0.5}
                    >
                        <Image
                            source={require('../assets/delete_button.png')}
                            style={{resizeMode: "contain", height: window.width/3-20, width: window.width/3-20}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: "center", marginHorizontal: 10}}
                        onPress={() => flipPressed()}
                        activeOpacity={0.5}
                    >
                        <Image
                            source={require('../assets/flip_button.png')}
                            style={{resizeMode: "contain", height: window.width/3-20, width: window.width/3-20}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: "center", marginHorizontal: 10}}
                        onPress={() => okPressed()}
                        activeOpacity={0.5}
                    >
                        <Image
                            source={require('../assets/ok_button.png')}
                            style={{resizeMode: "contain", height: window.width/3-20, width: window.width/3-20}} />
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View
                style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 0,
                    height: insets.bottom + window.width/3,
                    width: window.width-20,
                    marginHorizontal: 10
                }}
            >
                    <TouchableOpacity
                        style={{flex: 1, alignItems: "center", marginHorizontal: 10}}
                        onPress={() => backPressed()}
                        activeOpacity={0.5}
                    >
                        <Image
                            source={require('../assets/back_button.png')}
                            style={{resizeMode: "contain", height: window.width/3-20, width: window.width/3-20}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: "center", marginHorizontal: 0}}
                        onPress={() => navigation.navigate('ImagePicker',{})} //addPressed()
                        activeOpacity={0.5}
                    >
                        <Image
                            source={require('../assets/duck1.png')}
                            style={{resizeMode: "contain", height: insets.bottom + window.width/2-20, width: window.width/3-20,position: "absolute", bottom: -10}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: "center", marginHorizontal: 10}}
                        onPress={() => snapImage()}
                        activeOpacity={0.5}
                    >
                        <Image
                            source={require('../assets/save_button.png')}
                            style={{resizeMode: "contain", height: window.width/3-20, width: window.width/3-20}} />
                    </TouchableOpacity>
            </View>
        );
    }


    const itemSelected = (index) => {

        var item = itemState.items[index];
        var items = itemState.items;
        items.splice(index,1);
        items.push(item);

        setItemState({...itemState,selectedIndex: items.length-1, items: items});
    }

    const gestureEnded = (itemAttributes) => {
        
        scratchState = {...scratchState,...itemAttributes};

    }

    const backPressed = () => {
        navigation.goBack()
    }

    const okPressed = () => {

        if (itemState.selectedIndex == -1) {
            return;
        }

        const newItem = {
            image: require('../assets/pyramid.png'),
            transform: scratchState
        }

        var items = itemState.items
        items.splice(itemState.selectedIndex,1,newItem);
        setItemState({...itemState,selectedIndex: -1, items: items})
        
    }

    const addPressed = () => {

        if (itemState.selectedIndex > -1) {
            return
        }


        const newItem = {
            image: require('../assets/pyramid.png'),
            transform: {
                offset: {x: 0, y: 0},
                scale: 1,
                rotate: 0,
                scaleX: 1
            }
        };

        setItemState({...itemState,selectedIndex: itemState.items.length, items: [...itemState.items,newItem]})
    }

    const deletePressed = () => {

        if (itemState.selectedIndex == -1) {
            return;
        }

        var items = itemState.items;
        items.splice(itemState.selectedIndex,1);
      
        setItemState({...itemState,selectedIndex: -1, items: items});
    }

    const flipPressed = () => {

        if (itemState.selectedIndex == -1) {
            return;
        }

        var newItem = {
            image: require('../assets/pyramid.png'),
            transform: {...scratchState,scaleX: scratchState.scaleX * -1}
        }

        var items = itemState.items
        items.splice(itemState.selectedIndex,1,newItem);
        setItemState({...itemState,selectedIndex: itemState.items.length-1, items: items})
        
    }

    const snapImage = async () => {

        const snapshot = await captureRef(frameRef,{
            result: 'tmpfile',
            quality: 1,
            format: 'png'
        });

        console.log(snapshot);

        if (Platform.OS === 'android') {
            const response = await Sharing.shareAsync(snapshot,{
                dialogTitle: "Sup",
                mimeType: "image/png"
            });
        } else {
            try {
                const result = await Share.share({
                  title: 'Sup Sup Sup',
                  url: snapshot,
                  message: snapshot
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
        }
    }

    const insets = useSafeAreaInsets();
    const window = useWindowDimensions();

    
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: "#ffffff"}}
        >
            <Image
                source={require('../assets/booth_bg.png')}
                style={{flex: 1, position: "absolute", width: "100%", height: window.height, top: 0}}
                resizeMode="cover"
            />
            <View 
                style={{
                    alignSelf: "center",
                    marginHorizontal: 20,
                    marginVertical: Platform.OS ==='android' ? 60 : 20, width: window.width - 40,
                    height: window.height*0.6,
                    backgroundColor: "#ffffff",
                    overflow: "hidden"
                }}
                ref={frameRef}
            >
                <Image
                    source={image}
                    resizeMode="cover"
                    style={{position: "absolute", height: "100%", width: "100%"}}
                />
            {itemState.items.map((item,index) =>
                <ImageItemView key={index} itemIndex={index} />
            )}
            </View>
            <View
                pointerEvents="none"
                style={{
                    alignSelf: "center",
                    marginHorizontal: 20,
                    marginVertical: Platform.OS ==='android' ? 60 : 20, width: window.width - 20,
                    height: Platform.OS ==='android' ? window.height*0.6+insets.top : window.height*0.6+insets.top-15,
                    position: "absolute",
                    top: Platform.OS ==='android' ? -10 : insets.top - 10}}
            >
            <Image
                source={require('../assets/image_frame.png')}
                style={{flex: 1, position: "absolute", width: "100%", height: "100%"}}
                resizeMode="stretch"
                />
            </View>
            <Toolbar />
        </SafeAreaView>
    )
}