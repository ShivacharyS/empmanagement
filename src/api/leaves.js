import axios from 'axios';

const API_URL = 'http://localhost:8000/api/leaves';

export const fetchLeaveBalance = async () => {
  const response = await axios.get(`${API_URL}/balance/`);
  return response.data;
};

export const fetchLeaveRequests = async () => {
  const response = await axios.get(`${API_URL}/requests/`);
  return response.data;
};

export const applyForLeave = async (leaveData) => {
  const response = await axios.post(`${API_URL}/requests/`, leaveData);
  return response.data;
};

export const updateLeaveRequest = async (id, data) => {
  const response = await axios.patch(`${API_URL}/requests/${id}/`, data);
  return response.data;
};

export const deleteLeaveRequest = async (id) => {
  const response = await axios.delete(`${API_URL}/requests/${id}/`);
  return response.data;
};