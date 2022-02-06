import GQLClient from "../GraphqlConfig";
import { GET_ACTI_DETAIL, GET_ALL_MODULE, GET_BOARD, GET_DAY_EVENT, GET_MODULE_DETAIL, GET_PLANNING, GET_PROJECT_DETAILS, GET_USER_INFO, LOGIN_USER } from "../schema";
import { User, Board, Planning, ModuleDetail, ActiType, Module, Project } from "../types";

export default class Query {
    client = GQLClient.getIntance()?.getClient()

    Login(KeyAuth: string) {
        return this.client
            .query<{ Login: User }>({
                query: LOGIN_USER,
                variables: {
                    KeyAuth
                }
            })
    }

    getUserInfo(KeyAuth: string) {
        return this.client
            .query<{ GetUserInfo: User }>({
                query: GET_USER_INFO,
                variables: {
                    KeyAuth
                }
            })
    }

    getBoard(KeyAuth: string) {
        return this.client
            .query<{ GetBoard: Board }>({
                query: GET_BOARD,
                variables: {
                    KeyAuth
                }
            })
    }

    getPlanning(KeyAuth: string) {
        return this.client
            .query<{ GetPlanning: Planning }>({
                query: GET_PLANNING,
                variables: {
                    KeyAuth,
                }
            })
    }

    getModuleDetails(KeyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string) {
        return this.client
            .query<{ GetModuleDetail: ModuleDetail }>({
                query: GET_MODULE_DETAIL,
                variables: {
                    KeyAuth,
                    scolaryear,
                    codemodule,
                    codeinstance,
                    codeActi
                },
                fetchPolicy: 'no-cache',
            })
    }

    getActiDetail(KeyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string) {
        return this.client
            .query<{ GetActiDetail: ActiType }>({
                query: GET_ACTI_DETAIL,
                variables: {
                    KeyAuth,
                    scolaryear,
                    codemodule,
                    codeinstance,
                    codeActi
                },
                fetchPolicy: 'no-cache',
            })
    }

    getAllModule(KeyAuth: string, start: string, end: string) {
        return this.client
        .query<{ GetAllModule: [Module]}>({
            query: GET_ALL_MODULE,
            variables: {
                KeyAuth,
                start,
                end
            },
            fetchPolicy: 'no-cache',
        })
    }

    getDayEvent(KeyAuth: string, start: string, end: string) {
        return this.client
        .query<{ GetDayEvent: [Planning] }>({
            query: GET_DAY_EVENT,
            variables: {
                KeyAuth,
                start,
                end
            },
            fetchPolicy: 'no-cache',
        })
    }

    getProjectDetail(KeyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string) {
        return this.client
        .query<{ GetProjectDetails: Project }>({
            query: GET_PROJECT_DETAILS,
            variables: {
                KeyAuth,
                scolaryear,
                codemodule,
                codeActi,
                codeinstance
            },
            fetchPolicy: "no-cache"
        })
    }
}