import http from "../http-common";

class TutorialDataService {
    getAll() {
        return http.get("/employed");
    }

    get(id) {
        return http.get(`/employed/${id}`);
    }

    create(data) {
        return http.post("/employed", data);
    }

    update(id, data) {
        return http.put(`/employed/${id}/edit`, data);
    }

    delete(id) {
        return http.delete(`/employed/${id}/delete`);
    }
}

export default new TutorialDataService();