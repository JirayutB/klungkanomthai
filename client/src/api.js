import axios from "axios";
const url = "/api/dessert";

export default class API {
    static async getAllDessert() {
        const res = await axios.get(url);
        return res.data;
    }

    static async getDessertByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    static async addDessert(dessert) {
        const res = await axios.post(url, dessert);
        return res.data;
    }

    static async updateDessert(id, dessert) {
        const res = await axios.patch(`${url}/${id}`, dessert);
        return res.data;
    }

    static async deleteDessert(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}