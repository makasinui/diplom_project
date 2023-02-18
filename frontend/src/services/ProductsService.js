import HttpService from "./HttpService";

export default class ProductsService {
  url = "http://localhost:8000/api/products";
  httpService = new HttpService();

  getAll() {
    return this.httpService.get(this.url).then(({ data }) => data);
  }
}
