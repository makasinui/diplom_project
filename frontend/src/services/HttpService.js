import axios from 'axios'

export default class HttpService {
    get(url) {
        return axios.get(url);
    }
    
    post(url, data) {
        return axios.post(url, data)
    }

    update(url, data) {
        return axios.put(url, data)
    }

    delete(url) {
        return axios.delete(url)
    }
}