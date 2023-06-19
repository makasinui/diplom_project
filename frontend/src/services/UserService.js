import HttpService from "./HttpService"
import AuthService from "./AuthService";
import store from "../store";
import { useToast } from "vue-toast-notification"
import { AxiosService } from "./AxiosService";

export default class UserService {
    url = 'https://api.khizauto.ru/api/user';
    httpService = new HttpService();
    toast = useToast();

    async getUser() {
        const res = await this.httpService.get(`${this.url}`);
        store.commit('setUser', res.data);

        return res.data;
    }

    async update(data) {
        try {
            const res = await this.httpService.update(`${this.url}/${data.id}`, data)
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }

    async adminRoleUpdate(id, value) {
        try {
            const res = await this.httpService.post(`${this.url}/${id}`, { value }).then(({ data }) => data);
            this.toast.success('Успешно!');
            return res;
        } catch(err) {
            return false;
        }
    }

    async delete(id) {
        try {
            const res = await this.httpService.delete(`${this.url}/${id}`)
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }
    
}