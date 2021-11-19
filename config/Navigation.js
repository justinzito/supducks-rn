import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Canvas } from '../screens/Canvas';
import { Home } from '../screens/Home';

const NavStack = createStackNavigator();

const StackScreens = () => (
    <NavStack.Navigator
        screenOptions={{gestureEnabled: false}}
    >
        <NavStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false, swipeEnabled: false}}
        />
        <NavStack.Screen
            name="Canvas"
            component={Canvas}
            options={{ headerShown: false, swipeEnabled: false}}
        />
    </NavStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <StackScreens />
    </NavigationContainer>
)
