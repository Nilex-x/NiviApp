import { NavigationContainer } from '@react-navigation/native';
import RootStore from '../store/rootStore';
import AppStack from '../screen/AppStack';
import AuthStack from '../screen/AuthStack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StatusBar } from 'expo-status-bar';

const { userInfo } = RootStore.getInstance()

export const Navigation = () => {

    const [isLoading, setLoading] = useState<boolean>(true);

    const isLoggedIn = userInfo.isLoggedIn;

    const userlogin = async () => {
        try {
            const token: string | null = await AsyncStorage.getItem("LoginToken")
            if (token) {
                userInfo.login(token, false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        userlogin();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator color="#D71D9A" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <StatusBar/>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default observer(Navigation);
