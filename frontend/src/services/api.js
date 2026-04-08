// frontend/src/services/api.js
import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Request interceptor - Support both user & admin tokens
api.interceptors.request.use(
    (config) => {
        // Check admin token first, then user token
        const adminToken = localStorage.getItem("adminToken");
        const userToken = localStorage.getItem("token");

        if (adminToken && config.url?.includes('/admin')) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        } else if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }

        return config;
    },
    (err) => Promise.reject(err)
);

// Response interceptor - Handle token expiry
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear admin token if admin route
            if (error.config.url?.includes('/admin')) {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin/login";
            } else {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;