import userInfo from "./userInfo";

export default class RootStore {
    private static instance = new RootStore()

    public userInfo: userInfo;

    constructor() {
        this.userInfo = new userInfo(this);
    } 

    static getInstance() {
        return this.instance
    }
}