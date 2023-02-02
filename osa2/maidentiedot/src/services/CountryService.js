import axios from "axios"

const baseUrl = "https://restcountries.com/v3.1/all"

const fetchAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const countryService = { fetchAll }

export default countryService
