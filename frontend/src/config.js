// frontend/src/config.js
const API_BASE_URL = import.meta.env.PROD
    ? "https://your-backend-domain.com"
    : "http://localhost:5000/api";

export { API_BASE_URL };

export const GLOBAL_PATH = '';