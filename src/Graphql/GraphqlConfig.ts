import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import * as Updates from 'expo-updates';

const getEnvironment = () => {
    if (Updates.releaseChannel.startsWith('prod')) {
        return "https://iss.dev.mysite.fun/" // prod env settings
    } else {
        return "http://192.168.1.19:4000/"; // dev env settings
    }
}

export default class GQLClient {
    protected client: ApolloClient<NormalizedCacheObject>

    static instance = new GQLClient()

    constructor() {

        this.client = new ApolloClient({
            uri: getEnvironment(),
            cache: new InMemoryCache(),
        });
    }

    static getIntance() {
        return this.instance;
    }

    public getClient() {
        return this.client;
    }
}