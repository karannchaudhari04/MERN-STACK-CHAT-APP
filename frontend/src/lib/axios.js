import axios from "axios";

const devURL = "http://localhost:5001/api"; // local backend
const prodURL = "https://mern-stack-chat-app-2-rw3a.onrender.com/"; // 🔁 replace with your actual Render backend URL

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? devURL : prodURL,
  withCredentials: true, // Send cookies for auth/session
});

export default axiosInstance;
