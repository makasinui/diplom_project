import HttpService from "./HttpService";

export default class OrderService {
    url = "/backend/api/order";
    httpService = new HttpService();

    getAll() {
        try {
            return this.httpService.get(this.url).then(({data}) => data);
        } catch(err) {
            return err;
        }
    }

    makeOrder(id) {
        return this.httpService.post(this.url, id).then(data => data)
    }
    
}
