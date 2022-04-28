import { action, makeObservable, observable } from "mobx";
import RootStore from "./rootStore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Updates from 'expo-updates';

const getAuth = async () => {
    const isCan = await LocalAuthentication.isEnrolledAsync();
    if (isCan) {
        const { success } = await LocalAuthentication.authenticateAsync({ promptMessage: "Give Me Access" });
        if (!success)
            return false;
    }
    return true;
}

export default class userInfo {
    isLoggedIn: Boolean = false;
    country: string = "";
    city: string = "";
    token: string = "";
    goToTop: boolean = true;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.initGoToTop()
        makeObservable(this, {
            isLoggedIn: observable,
            token: observable,
            goToTop: observable,
            country: observable,
            city: observable,

            getToken: action,
            login: action,
            logout: action,
            setGoToTop: action,
            initGoToTop: false
        })
        this.rootStore = rootStore
    }

    getToken = () => {
        return this.token;
    }

    getStatusLogin = () => {
        return this.isLoggedIn
    }

    login = async (newToken: string, firstConnect: boolean, country: string, city: string) => {
        if (!firstConnect && Updates.releaseChannel.startsWith('prod')) {
            if (!await getAuth()) {
                this.logout();
                return;
            }
        }
        console.log("login")
        AsyncStorage.setItem("LoginToken", newToken);
        AsyncStorage.setItem("country", country)
        AsyncStorage.setItem("city", city)
        this.isLoggedIn = true;
        this.token = newToken;
        this.country = country;
        this.city = city;
    }

    logout = () => {
        AsyncStorage.removeItem("LoginToken")
        AsyncStorage.removeItem("country")
        AsyncStorage.removeItem("city")
        this.isLoggedIn = false;
        this.token = "";
        this.city = "";
        this.country = "";
    }

    setGoToTop = (status: boolean) => {
        this.goToTop = status;
        if (status) {
            AsyncStorage.setItem("GotToTop", "1")
        } else {
            AsyncStorage.setItem("GotToTop", "0")
        }
    }

    initGoToTop = async () => {
        if ((await AsyncStorage.getItem("GotToTop")) == "1") {
            this.goToTop = true;
        } else {
            this.goToTop = false;
        }
    }
}