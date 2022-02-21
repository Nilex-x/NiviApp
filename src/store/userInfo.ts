import { action, makeObservable, observable } from "mobx";
import RootStore from "./rootStore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTranslation } from "react-i18next";

const getAuth = async () => {
    const isCan = await LocalAuthentication.isEnrolledAsync();
    if (isCan) {
        const { success } = await LocalAuthentication.authenticateAsync({ promptMessage: "Give Me Access" });
        // console.log("value Auth => ", success);
        if (!success) {
            return false;
        }
    }
    return true;
}

export default class userInfo {
    isLoggedIn: Boolean = false;
    token: string = "";
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            isLoggedIn: observable,
            token: observable,

            getToken: action,
            login: action,
            logout: action
        })
        this.rootStore = rootStore
    }

    getToken = () => {
        return this.token;
    }

    getStatusLogin = () => {
        return this.isLoggedIn
    }

    login = async (newToken: string, firstConnect: boolean) => {
        if (!firstConnect) {
            if (!await getAuth()) {
                this.logout();
                return;
            }
        }
        AsyncStorage.setItem("LoginToken", newToken);
        this.isLoggedIn = true;
        this.token = newToken;
    }

    logout = () => {
        AsyncStorage.removeItem("LoginToken")
        this.isLoggedIn = false;
        this.token = "";
    }
}