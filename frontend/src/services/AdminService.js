import HttpService from './HttpService'
import ProductsService from './ProductsService';

export default class AdminService {
    url = '/backend/api';
    httpService = new HttpService();
    productsService = new ProductsService();

    getAllProducts(page, perPage) {
        return this.productsService.getAll(page, perPage);
    }

    getAllUsers(page) {
        return this.httpService.get(`${this.url}/users`).then(({ data }) => data);
    }
}