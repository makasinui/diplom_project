import HttpService from "./HttpService"
import { useToast } from "vue-toast-notification"

export default class AuthService {
    url = '/backend'
    toast = useToast()
    httpService = new HttpService()

    async getToken() {
        await this.httpService.get(`${this.url}/sanctum/csrf-cookie`)
    }

    async login(data) {
        await this.getToken()
        const { email, password } = data;
        this.httpService.post(`${this.url}/login`, { email, password }).then(r => console.log(r))
        this.toast.success('Успешно!', {duration: 5000})
    }

    async register(data) {
        await this.getToken();
        const { email, name, password,password_confirmation } = data;
        this.httpService.post(`${this.url}/register`, { email, password, name, password_confirmation })
    }
}