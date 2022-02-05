import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../Components/Home/Home';
import Tabs from './Tabs';

type AuthParams = {
    Tabs: undefined;
}

const Stack = createNativeStackNavigator<AuthParams>();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
    )
}

export default AppStack