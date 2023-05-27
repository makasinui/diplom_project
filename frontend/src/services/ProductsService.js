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

    async update(data) {
        try {
            const res = await this.httpService.update(`${this.url}/${data.id}`, data)
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }

    async create(data, file = '') {
        try {
            let res;
            data.popular = data.popular ?? 0;
            if (file) {
                const config = { "content-type": "multipart/form-data" };
                const formData = new FormData();
                
                formData.append('img', file);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('vin', data.vin);
                formData.append('popular', data.popular)

                res = await this.httpService.post(`${this.url}`, formData, config)
            } else {
                res = await this.httpService.post(`${this.url}`, data);
            }
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }

    async delete(id) {
        try {
            const res = await this.httpService.delete(`${this.url}/${id}`)
            this.toast.success('Успешно')
            return res;
        } catch(err) {
            this.toast.error('Ошибка')
        }
    }
}
