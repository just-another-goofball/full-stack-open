import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const getAll = () => {
  return axios.get(`${BASE_URL}/persons`)
    .then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post(`${BASE_URL}/persons`, person)
    .then((res) => res.data);
};

const deleteById = (id) => {
  return axios.delete(`${BASE_URL}/persons/${id}`);
}

const updatePersonById = (id, updatedPerson) => {
  return axios.put(`${BASE_URL}/persons/${id}`, updatedPerson)
    .then((res) => res.data);
}

export {
  getAll,
  addPerson,
  deleteById,
  updatePersonById,
};