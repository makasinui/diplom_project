import { useToast } from "vue-toast-notification";
import HttpService from "./HttpService";

export default class ProductsService {
    url = "/backend/api/products";
    httpService = new HttpService();
    toast = useToast()

    getAll(page = 1, perPage = 10) {
        return this.httpService
            .get(
                `${this.url}?page=${page}
                 &per_page=${perPage}`
            )
            .then(({ data }) => data);
    }

    getPopular() {
        return this.httpService.get(`${this.url}/popular`).then(({ data }) => data);
    }

    searchProducts(search, page = 1, perPage = 10) {
        return this.httpService
            .get(`${this.url}?${search}&page=${page}&per_page=${perPage}`)
            .then(({ data }) => data);
    }

    update(data) {
        try {
            const res = this.httpService.update(`${this.url}/${data.id}`, data)
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }

    delete(id) {
        try {
            const res = this.httpService.delete(`${this.url}/${id}`)
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }
}
