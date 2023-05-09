import HttpService from './HttpService'
import OrderService from './OrderService';
import ProductsService from './ProductsService';

export default class AdminService {
    url = '/backend/api';
    httpService = new HttpService();
    productsService = new ProductsService();
    orderService = new OrderService();

    getAllProducts(page, perPage) {
        return this.productsService.getAll(page, perPage);
    }

    getAllUsers(page) {
        return this.httpService.get(`${this.url}/users`).then(({ data }) => data);
    }

    getAllOrders(page, perPage) {
        return this.orderService.getAll(page, perPage);
    }
}