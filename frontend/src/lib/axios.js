import axios from "axios";

const devURL = "http://localhost:5000/api"; // local backend
const prodURL = "https://mern-stack-chat-app-9dph.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? devURL : prodURL,
  withCredentials: true, // Send cookies for auth/session
});

export default axiosInstance;
