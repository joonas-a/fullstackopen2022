//
// https://open-meteo.com/en/docs#latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true

import axios from "axios"

const fetchWeather = (latitude, longitude) => {
  console.log("Weather API called")
  // console.log("called Fetch with params " + latitude + longitude)
  const modifiedUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`

  const request = axios.get(modifiedUrl)
  return request.then((response) => response.data)
}

const weatherService = { fetchWeather }

export default weatherService
