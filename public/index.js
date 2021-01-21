const searchForm = document.querySelector('.search-location')
const cityValue = document.querySelector('.search-location input')
const cityName = document.querySelector('.city-name p')
const cardBody = document.querySelector('.card-body')
const timeImage = document.querySelector('.card-top img')
const card = document.querySelector('.back-card')


const convertToCelcius = kelvin => {
  celcius = Math.round(kelvin - 273.15)
  return celcius
}

const isDayTime = icon => {
  if(icon.includes('d')) {
    return true
  } else {
    return false
  }
}

updateWeatherApp = city => {
  const imageName = city.weather[0].icon
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
  cityName.textContent = city.name
  cardBody.innerHTML = `
  <div class="card-body">
  <div class="card-mid row">
    <div class="col-8 text-center temp">
      <span>${convertToCelcius(city.main.temp)}&deg;C</span>
    </div>
    <div class="col-4 condition">
      <p>${city.weather[0].description}</p>
      <p class="high">${convertToCelcius(city.main.temp_max)}&deg;C</p>
      <p class="low">${convertToCelcius(city.main.temp_min)}&deg;C</p>
    </div>
  </div>

  <div class="icon-container card shadow mx-auto">
    <img src="${iconSrc}" alt="Cloud">
  </div>
  <div class="card-bottom px-5 py-4 row">
    <div class="col text-center">
      <p>${convertToCelcius(city.main.feels_like)}&deg;C</p>
      <span>Feels Like</span>
    </div>
    <div class="col text-center">
      <p>${convertToCelcius(city.main.humidity)}%</p>
      <span>Humidity</span>
    </div>
  </div>
</div>
  `
  if (isDayTime(imageName)) {
    timeImage.setAttribute('src', 'img/day_image.svg');
    if (cityName.classList.contains('text-white')) {
        cityName.classList.remove('text-white');
    } else {
        cityName.classList.add('text-black');
    }

} else {
    timeImage.setAttribute('src', 'img/night_image.svg');
    if (cityName.classList.contains('text-black')) {
        cityName.classList.remove('text-black');
    } else {
        cityName.classList.add('text-white');
    }

}

card.classList.remove('d-none')
  
}

searchForm.addEventListener('submit', event => {
  event.preventDefault()
  const citySearched = cityValue.value.trim()
  searchForm.reset()

  requestCity(citySearched)
    .then(data => {
      updateWeatherApp(data)
    })
    .catch(error => {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "We couldn't find the city you searched",
      })
    })
})

