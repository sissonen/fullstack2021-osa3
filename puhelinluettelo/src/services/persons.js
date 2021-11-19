import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getPersons = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const addPerson = newPerson => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
}

const updatePerson = (id, newPerson) => {
  return axios
    .put(baseUrl + '/' + id, newPerson)
    .then(response => response.data)
}

const removePerson = id => {
  return axios
    .delete(baseUrl + '/' + id)
    .then(response => response.data)
}

export default {getPersons, addPerson, updatePerson, removePerson}
