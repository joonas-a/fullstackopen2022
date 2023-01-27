import axios from 'axios'


const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addPerson = (newEntry) => {
  const request = axios.post(baseUrl, newEntry)
  return request.then(response => response.data)
}

const deletePerson = (personId) => {
  const request = axios.delete(baseUrl + '/' + personId)  
  return request.then(response => response.data)
}

const personService = { getPersons, addPerson, deletePerson }

export default personService
