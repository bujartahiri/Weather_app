const API_KEY = '8852a1f0ef415115afe8c4c8b0cd241a'

const requestCity = async city => {
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
  const query= `?q=${city}&appid=${API_KEY}`
  const response = await fetch(baseURL + query)
  const data = await response.json()
  return data
}
