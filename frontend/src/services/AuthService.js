import HttpService from "./HttpService"
import UserService from "./UserService"
import { useToast } from "vue-toast-notification"
import { AxiosService } from "./AxiosService"

export default class AuthService {
    url = '/backend/api'
    toast = useToast()
    httpService = new HttpService()
    userService = new UserService()
    axios = AxiosService()

    async setToken(token) {
        localStorage.setItem('token', token);
        await this.userService.getUser();
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    async login(data) {
        const { email, password } = data;
        try {
            await this.httpService.post(`${this.url}/auth/login`, { email, password })
            .then(async (res) => await this.setToken(res.data.token))
            this.toast.success('Успешно!', {duration: 5000})
            return;
        } catch(err) {
            if(err?.response && err.response.status === 401) {
                this.toast.error('Неправильный логин или пароль', { duration: 5000 })
            }
            return;
        }
    }

    async register(data) {
        const { email, name, password,password_confirmation } = data;
        try {
            await this.httpService.post(`${this.url}/auth/register`, { email, password, name, password_confirmation })
            .then(async(res) => await this.setToken(res.data.token));
            this.toast.success('Успешно!', { duration: 5000 })
            return;
        } catch(err) {
            if(err?.response && err.response.status === 401) {
                this.toast.error('Ошибка!', { duration: 5000 })
            }
            return;
        }
    }

    async logout() {
        this.removeToken();
        this.httpService.post(`${this.url}/logout`)
    }
}