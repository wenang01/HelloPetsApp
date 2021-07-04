import http from "./http-common";
import authHeader from './auth-header';

class DokterService {
    getAllDokter() {
        return http.get("/doctors/", { headers: authHeader() });
    }

    getDokterById(id) {
        return http.get(`/doctors/${id}`, { headers: authHeader() });
    }

}

export default new DokterService();
