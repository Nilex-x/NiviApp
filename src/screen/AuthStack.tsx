import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../Components/Login/Login';

type AuthParams = {
    Login: undefined;
}

const Stack = createNativeStackNavigator<AuthParams>();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: "#1C9FF0" }, headerTintColor: "white" }}>
            <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
    )
}

export default AuthStack