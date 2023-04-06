import axios from "axios";
import { AxiosService } from "./AxiosService";

export default class HttpService {
    service = AxiosService();
    get(url) {
        return this.service.get(url);
    }

    post(url, data) {
        return this.service.post(url, data);
    }

    update(url, data) {
        return this.service.put(url, data);
    }

    delete(url) {
        return this.service.delete(url);
    }
}
