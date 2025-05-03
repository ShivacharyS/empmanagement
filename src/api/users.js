import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};