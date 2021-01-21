const input = document.querySelector('[data-city-cearch]')
const searchBox = new google.maps.places.Autocomplete(input)

searchBox.addListener("place_changed", () => {
  const place = searchBox.getPlace()

  if(place.length == 0) return

 
   requestCity(place.name)
    .then(data => {
      updateWeatherApp(data)
      searchForm.reset()
    })
    .catch(error => {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "We couldn't find the city you searched",
      })
      .then(() => {
        searchForm.reset()
        cityValue.focus()
      })
    })
    
})