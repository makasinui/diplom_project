import HttpService from './HttpService'
import ProductsService from './ProductsService';

export default class AdminService {
    httpService = new HttpService();
    productsService = new ProductsService();

    getAllProducts() {
        return this.productsService.getAll();
    }
}