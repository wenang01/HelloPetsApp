import http from "./http-common";
import authHeader from "./auth-header";

class ProductService {
    getProducts() {
        return http.get("/products/");
    }

    get(id) {
        return http.get(`/products/${id}`);
    }

    getAllProductByCategory(id) {
        return http.get(`/products/prod/${id}`);
    }

    // addProduct(file, data) {
    //     let formData = new FormData();
    //     formData.append("file", file);
    //     return http.post("/products/add", formData, {
    //         headers: authHeader(), "Content-Type": "multipart/form-data"
    //     }, data);
    // }

    // updateProduct(id, data) {
    //     return http.put(`/products/update/${id}`, data, { headers: authHeader() });
    // }

    // deleteProduct(id) {
    //     return http.get(`/products/delete/${id}`, { headers: authHeader() });
    // }
}

export default new ProductService();