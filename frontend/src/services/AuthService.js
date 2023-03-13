import HttpService from "./HttpService"

export default class AuthService {
    url = '/backend'
    httpService = new HttpService()

    login(data) {
        this.httpService.get(`${this.url}/sanctum/csrf-cookie`).then(res => {
            const { email, password } = data;
            this.httpService.post(`${this.url}/login`, { email, password }).then(r => console.log(r))
        })
    }


}