import React, {useEffect, useRef, useState } from 'react';
import { Animated, useWindowDimensions, View, SafeAreaView, Platform, Image, Text, TouchableOpacity, Pressable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DragRotateScaleImage } from '../components/dragRotateScaleImage';
import { PinchableBox } from '../components/rotateAndScale';

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

export function Canvas({navigation}) {

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


    var scratchState = itemState.items.length-1 >= 0 ? 
    itemState.items[itemState.items.length-1].transform : 
    {
        offset: {x: 0, y: 0},
        scale: 1,
        rotate: 0,
        scaleX: 1
    };
/*
    var scratchState = {
        offset: {x: 0, y: 0},
        scale: 1,
        rotate: 0,
        scaleX: 1
    };
    */

    
    useEffect(() => {
       //console.log("selected index: " + JSON.stringify(itemState))
       if (itemState.selectedIndex > -1) {
        scratchState = itemState.items[itemState.selectedIndex].transform;
       }
    },[itemState.selectedIndex]);


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


    const touch = useRef(
        new Animated.ValueXY({x: 0, y: 0})
    ).current;
    
    const dimensions = useWindowDimensions();


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

    const insets = useSafeAreaInsets();
    
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: "#ffffff"}}
        >
            {itemState.items.map((item,index) =>
                <ImageItemView key={index} itemIndex={index} />
            )}

            <SafeAreaView
                style={{flexDirection: "row", position: "absolute", bottom: 0, height: insets.bottom + 100 ,width: "100%", backgroundColor: "#777777"}}>
                    <TouchableOpacity
                        style={{flex: 1, height: 60, margin: 10, backgroundColor: "#f8014a", alignItems: "center", justifyContent: "center"}}
                        onPress={() => deletePressed()}
                    >
                        <Text
                            style={{color: "#ffffff"}}>
                                Delete
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, height: 60, margin: 10, backgroundColor: "#450777", alignItems: "center", justifyContent: "center"}}
                        onPress={() => addPressed()}
                    >
                        <Text
                            style={{color: "#ffffff"}}>
                                Add
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, height: 60, margin: 10, backgroundColor: "#0461f2", alignItems: "center", justifyContent: "center"}}
                        onPress={() => flipPressed()}
                    >
                        <Text
                            style={{color: "#ffffff"}}>
                                FLIP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, height: 60, margin: 10, backgroundColor: "#7700f2", alignItems: "center", justifyContent: "center"}}
                        onPress={() => okPressed()}
                    >
                        <Text
                            style={{color: "#ffffff"}}>
                                OK
                        </Text>
                    </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    )
}