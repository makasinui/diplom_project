import HttpService from "./HttpService"

export default class ProductsService {
  url = "/backend/api/products";
  httpService = new HttpService();

  getAll() {
    return this.httpService.get(this.url).then(({ data }) => data);
  }

  getPopular() {
    return this.httpService.get(this.url).then(({ data }) => data);
  }
}
