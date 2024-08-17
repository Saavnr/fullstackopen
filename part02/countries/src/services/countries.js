import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const openWeatherApiBaseUrl = import.meta.env.VITE_OPENWEATHER_API_BASEURL

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (capital) => {
    const request = axios.get(`${openWeatherApiBaseUrl}?q=${capital}&appid=${openWeatherApiKey}&units=metric`)
    return request.then(respones => respones.data)
}

export default { getAll, getWeather }