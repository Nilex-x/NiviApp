import { action, makeObservable, observable } from "mobx";
import RootStore from "./rootStore";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    login = async (newToken: string) => {
        AsyncStorage.setItem("LoginToken", newToken)
        this.isLoggedIn = true;
        this.token = newToken;
    }

    logout = () => {
        AsyncStorage.removeItem("LoginToken")
        this.isLoggedIn = false;
        this.token = "";
    }
}