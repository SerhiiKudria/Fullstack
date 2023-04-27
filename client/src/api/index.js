import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000' });

export const getUsers = () => httpClient.get('/api/users?limit=100&offset=0');

// if js-object => Content-Type: Application/json
//    data => req.body
// if FormData => Content-Type: multipart/form-data
//    data (text) => (multer) => req.body
//    data (file) => (multer) => req.file
export const createUser = data => httpClient.post('/api/users', data);

export const deleteUser = userId => httpClient.delete(`/api/users/${userId}`);

//TASKS//

export const getTasks = () => httpClient.get('/api/tasks');

export const getTask = taskId => httpClient.get(`/api/tasks/${taskId}`);

export const createTask = data => httpClient.post('/api/tasks', data);

export const updateTask = (taskId, data) => httpClient.patch(`/api/tasks/${taskId}`, data);

export const deleteTask = taskId => httpClient.delete(`/api/tasks/${taskId}`);
