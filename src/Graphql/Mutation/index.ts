import GQLClient from "../GraphqlConfig";
import { REGISTER_ACTI, UNREGISTER_ACTI } from "../schema";
import { MutationRegisterActiArgs, MutationUnregisterActiArgs } from "../types";

export default class Mutate {
    client = GQLClient.getIntance()?.getClient()

    RegisterActi(keyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string, codeEvent: string) {
        return this.client
        .mutate<{ RegisterActi: MutationRegisterActiArgs}>({
            mutation: REGISTER_ACTI,
            variables: {
                keyAuth,
                scolaryear,
                codemodule,
                codeinstance,
                codeActi,
                codeEvent
            }, 
            fetchPolicy: 'no-cache'
        })
    }

    UnregisterActi(keyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string, codeEvent: string) {
        return this.client
        .mutate<{ UnregisterActi: MutationUnregisterActiArgs }>({
            mutation: UNREGISTER_ACTI,
            variables: {
                keyAuth,
                scolaryear,
                codemodule,
                codeinstance,
                codeActi,
                codeEvent
            },
            fetchPolicy: "no-cache"
        })
    }
}