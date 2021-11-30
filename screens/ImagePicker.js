import React from 'react';
import {
    useWindowDimensions,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ImagePicker({navigation}) {


    const insets = useSafeAreaInsets();
    const window = useWindowDimensions();

    const closePressed = () => {
        navigation.goBack();
    }

    const ImageObject = ({item, onPress}) => {

        //console.log(item.path)

        return (
            <TouchableOpacity
                style={{
                        margin: 20,
                        alignItems: "center",
                }}
                onPress={onPress}
            >
                <Image
                    source={item.path}
                    resizeMode={'contain'}
                    style={{
                        flex: 1,
                        margin: 5,
                        width: 100,
                        height: 100
                        
                    }}
                />
            </TouchableOpacity>
        )
    }

    const selectedItem = (item) => {
        console.log(item.id + ": pressed");
        navigation.navigate({
            name: 'Canvas',
            params: {picked: item.path},
            merge: true
        });
    }

    const renderItem = ({ item }) => (
        <ImageObject
            item = {item}
            onPress={() => selectedItem(item)}
        />
    );

    var itemList = [
        { id: "1", path: require("../assets/elements/alien.png")},
        { id: "2", path: require("../assets/elements/crown.png")},
        { id: "3", path: require("../assets/elements/halo.png")},
        { id: "4", path: require("../assets/elements/partyhat.png")},
        { id: "5", path: require("../assets/elements/threeeyes.png")},
        { id: "6", path: require("../assets/elements/anxious.png")},
        { id: "7", path: require("../assets/elements/curious.png")},
        { id: "8", path: require("../assets/elements/happy.png")},
        { id: "9", path: require("../assets/elements/pothead.png")},
        { id: "10", path: require("../assets/elements/tiehead.png")},
        { id: "11", path: require("../assets/elements/backward.png")},
        { id: "12", path: require("../assets/elements/cyclops.png")},
        { id: "13", path: require("../assets/elements/hardl.png")},
        { id: "14", path: require("../assets/elements/pyramid.png")},
        { id: "15", path: require("../assets/elements/tinfoil.png")},
        { id: "16", path: require("../assets/elements/beanie.png")},
        { id: "17", path: require("../assets/elements/dazy.png")},
        { id: "18", path: require("../assets/elements/headphones.png")},
        { id: "19", path: require("../assets/elements/sadface.png")},
        { id: "20", path: require("../assets/elements/tiredcat.png")},
        { id: "21", path: require("../assets/elements/bigsmile.png")},
        { id: "22", path: require("../assets/elements/dead.png")},
        { id: "23", path: require("../assets/elements/hippy.png")},
        { id: "24", path: require("../assets/elements/shadorz.png")},
        { id: "25", path: require("../assets/elements/tongueout.png")},
        { id: "26", path: require("../assets/elements/bikerhat.png")},
        { id: "27", path: require("../assets/elements/dickhead.png")},
        { id: "28", path: require("../assets/elements/hipster.png")},
        { id: "29", path: require("../assets/elements/shark.png")},
        { id: "30", path: require("../assets/elements/tproll.png")},
        { id: "31", path: require("../assets/elements/blackeye.png")},
        { id: "32", path: require("../assets/elements/doggydooks.png")},
        { id: "33", path: require("../assets/elements/jimmyhat.png")},
        { id: "34", path: require("../assets/elements/shaunshades.png")},
        { id: "35", path: require("../assets/elements/triangle.png")},
        { id: "36", path: require("../assets/elements/blow.png")},
        { id: "37", path: require("../assets/elements/dogtongue.png")},
        { id: "38", path: require("../assets/elements/juicy.png")},
        { id: "39", path: require("../assets/elements/shroom.png")},
        { id: "40", path: require("../assets/elements/tripped.png")},
        { id: "41", path: require("../assets/elements/bored.png")},
        { id: "42", path: require("../assets/elements/doh.png")},
        { id: "43", path: require("../assets/elements/kitty.png")},
        { id: "44", path: require("../assets/elements/slysmile.png")},
        { id: "45", path: require("../assets/elements/twack.png")},
        { id: "46", path: require("../assets/elements/boredcap.png")},
        { id: "47", path: require("../assets/elements/doodoo.png")},
        { id: "48", path: require("../assets/elements/lipbite.png")},
        { id: "49", path: require("../assets/elements/smile.png")},
        { id: "50", path: require("../assets/elements/umbrella.png")},
        { id: "51", path: require("../assets/elements/braces.png")},
        { id: "52", path: require("../assets/elements/doorag.png")},
        { id: "53", path: require("../assets/elements/lipbite2.png")},
        { id: "54", path: require("../assets/elements/sombrero.png")},
        { id: "55", path: require("../assets/elements/wavey.png")},
        { id: "56", path: require("../assets/elements/buckethat.png")},
        { id: "57", path: require("../assets/elements/fangs.png")},
        { id: "58", path: require("../assets/elements/lollipop.png")},
        { id: "59", path: require("../assets/elements/spinner.png")},
        { id: "60", path: require("../assets/elements/whawha.png")},
        { id: "61", path: require("../assets/elements/buckteeth.png")},
        { id: "62", path: require("../assets/elements/fish.png")},
        { id: "63", path: require("../assets/elements/madlips.png")},
        { id: "64", path: require("../assets/elements/spitting.png")},
        { id: "65", path: require("../assets/elements/whistle.png")},
        { id: "66", path: require("../assets/elements/buggy.png")},
        { id: "67", path: require("../assets/elements/flower.png")},
        { id: "68", path: require("../assets/elements/megaphone.png")},
        { id: "69", path: require("../assets/elements/standard.png")},
        { id: "70", path: require("../assets/elements/wizard.png")},
        { id: "71", path: require("../assets/elements/caveduck.png")},
        { id: "72", path: require("../assets/elements/focus.png")},
        { id: "73", path: require("../assets/elements/minidots.png")},
        { id: "74", path: require("../assets/elements/superhappy.png")},
        { id: "75", path: require("../assets/elements/wonky.png")},
        { id: "76", path: require("../assets/elements/caveduck2.png")},
        { id: "77", path: require("../assets/elements/frown.png")},
        { id: "78", path: require("../assets/elements/mohawk.png")},
        { id: "79", path: require("../assets/elements/sushi.png")},
        { id: "80", path: require("../assets/elements/zapped.png")},
        { id: "81", path: require("../assets/elements/cheeky.png")},
        { id: "82", path: require("../assets/elements/goggles.png")},
        { id: "83", path: require("../assets/elements/namco.png")},
        { id: "84", path: require("../assets/elements/sweatband.png")},
        { id: "85", path: require("../assets/elements/chonies.png")},
        { id: "86", path: require("../assets/elements/gum.png")},
        { id: "87", path: require("../assets/elements/pants.png")},
        { id: "88", path: require("../assets/elements/taco.png")},
        { id: "89", path: require("../assets/elements/combover.png")},
        { id: "90", path: require("../assets/elements/hair.png")},
        { id: "91", path: require("../assets/elements/paperhat.png")},
        { id: "92", path: require("../assets/elements/thinkin.png")}
    ]

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
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: 40,
                        marginLeft: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text
                            style={{fontSize: 20}}
                        >Pick a trait</Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={() => closePressed()}
                >
                
                    <Text style={{color: "#ff0000",fontSize: 20}}>X</Text>
                </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: "90%",
                        height: 1,
                        backgroundColor: "#0000002f",
                        marginHorizontal: "5%"
                    }}
                />
                <FlatList
                    
                    data={itemList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{
                        width: "100%",
                        alignItems: "center"
                    }}
                    
                />
            
              
        </SafeAreaView>
    )

    
}