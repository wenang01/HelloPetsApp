import http from "./http-common";
import authHeader from './auth-header';

class CategoryService {
    getAllCategories() {
        return http.get("/categories/");
    }

    getAllProductByCategory(id) {
        return http.get(`/categories/${id}`);
    }
 
}

export default new CategoryService();
