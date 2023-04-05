import HttpService from "./HttpService";

export default class ProductsService {
    url = "/backend/api/products";
    httpService = new HttpService();

    getAll() {
        return this.httpService.get(this.url).then(({ data }) => data.data);
    }

    getPopular() {
        return this.httpService.get(this.url).then(({ data }) => data);
    }

    searchProducts(search) {
        return this.httpService
            .get(`${this.url}?${search}`)
            .then(({ data }) => data.data);
    }
}
