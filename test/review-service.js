"use strict";

const axios = require("axios");

class ReviewService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(this.baseUrl + "/api/users", newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getLocations() {
        const response = await axios.get(this.baseUrl + "/api/locations");
        return response.data;
    }

    async getLocation(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/locations/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createLocation(newLocation) {
        const response = await axios.post(this.baseUrl + "/api/locations", newLocation);
        return response.data;
    }

    async deleteAllLocations() {
        const response = await axios.delete(this.baseUrl + "/api/locations");
        return response.data;
    }

    async deleteOneLocation(id) {
        const response = await axios.delete(this.baseUrl + "/api/locations/" + id);
        return response.data;
    }

    async makeReview(id, review) {
        try {
            const response = await axios.post(this.baseUrl + "/api/locations/" + id + "/reviews", review);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getReviews(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/locations/" + id + "/reviews");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllReviews() {
        try {
            const response = await axios.delete(this.baseUrl + "/api/reviews");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async authenticate(user) {
        try {
            const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async clearAuth(user) {
        axios.defaults.headers.common["Authorization"] = "";
    }
}

module.exports = ReviewService;