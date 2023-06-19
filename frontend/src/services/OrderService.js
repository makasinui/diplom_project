import HttpService from "./HttpService";

export default class OrderService {
    url = "/backend/api/order";
    httpService = new HttpService();

    getAll(page = 1, perPage = 10) {
        try {
            return this.httpService.get(`${this.url}?page=${page}&per_page=${perPage}`).then(({data}) => data);
        } catch(err) {
            return err;
        }
    }

    makeOrder(id) {
        return this.httpService.post(this.url, id).then(data => data)
    }
    
}
