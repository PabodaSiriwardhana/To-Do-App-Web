import axios from 'axios';
import { Task } from '../types';

const API_URL = 'http://localhost:5000/api';

// Configure axios to send the authentication token with each request
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token || ''
    }
  };
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`, getAuthHeader());
  return response.data;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const response = await axios.post(
    `${API_URL}/tasks`, 
    { title, description }, 
    getAuthHeader()
  );
  return response.data;
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await axios.put(
    `${API_URL}/tasks/${id}`, 
    taskData, 
    getAuthHeader()
  );
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeader());
};