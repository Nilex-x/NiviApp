import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const getEnvironment = () => {
    if (process.env.NODE_ENV === "production") {
        return "http://localhost:4000/"
    } else {
        return "http://localhost:4000"
    }
    return "http://localhost:4000/";
}

export default class GQLClient {
    protected client: ApolloClient<NormalizedCacheObject>

    static instance = new GQLClient()

    constructor() {

        this.client = new ApolloClient({
            uri: "http://192.168.1.21:4000/",
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