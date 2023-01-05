import axios from 'axios';

const BASE_URL = '/api/persons';

const getAll = () => {
  return axios.get(`${BASE_URL}`)
    .then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post(`${BASE_URL}`, person)
    .then((res) => res.data);
};

const deleteById = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
}

const updatePersonById = (id, updatedPerson) => {
  return axios.put(`${BASE_URL}/${id}`, updatedPerson)
    .then((res) => res.data);
}

export {
  getAll,
  addPerson,
  deleteById,
  updatePersonById,
};