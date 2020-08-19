import axios from 'axios'

class axiosServices {

    constructor() {
        const intance = axios.create();
        this.intance = intance; // Đê biến intance sử dụng toàn cục
    }

    handleSuccess(res) {
        return res;
    }

    handleError(err) {
        return Promise.reject(err);
    }

    get(url) {
        return this.intance.get(url);
    }

}

export default new axiosServices();