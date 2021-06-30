import http from "./http-common";
import authHeader from "./auth-header";

class CartsService {
    getAll(userId) {
        return http.get(`/carts/u/${userId}`, { headers: authHeader() });
    }

    // get(userId, id) {
    //     return http.get(`/carts/u/${userId}/${id}`, { headers: authHeader() });
    // }

    put(userId, data) {
        return http.put(`/carts/u/${userId}`, data, { headers: authHeader() });
    }
    
    delete(id) {
        return http.delete(`/carts/${id}`, { headers: authHeader() });
    }
}

export default new CartsService();