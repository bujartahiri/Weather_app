const input = document.querySelector('[data-city-cearch]')
const searchBox = new google.maps.places.Autocomplete(input)

searchBox.addListener('places_changed', () => {
  const place = input.getPlace()
  if (place == null) return
})