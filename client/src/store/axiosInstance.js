import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
export const fetchTask = () => {
  return client.get("/tasks");
};

export const createTask = params => {
  return client.post("/tasks", params);
};

export const editTask = (id, params) => {
  return axios.put(`${API_BASE_URL}/tasks/${id}`, params);
};
