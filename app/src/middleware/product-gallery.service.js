import http from "./http-common";
import authHeader from "./auth-header";

class ProductGalleryService {
  getAll() {
    return http.get("/productGalleries/");
  }

  get(id) {
    return http.get(`/productGalleries/${id}`);
  }

  getAllGalleryByProduct(id) {
        return http.get(`/productGalleries/gallery/${id}`);
    }

}

export default new ProductGalleryService();