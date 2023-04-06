import HttpService from "./HttpService"
import AuthService from "./AuthService";
import store from "../store";
import { useToast } from "vue-toast-notification"
import { AxiosService } from "./AxiosService";

export default class UserService {
    url = '/backend';
    httpService = new HttpService();

    getUser() {
        return this.httpService.get(`${this.url}/api/user`).then(({data}) => {
            store.commit('setUser', data)
            return data
        })
    }
}