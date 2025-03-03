import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    username,
    email,
    password
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });
  return response.data;
};