console.log('the secend')
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'


// locService.getLocs()
//     .then(locs => console.log('locs', locs))

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let latitude = +urlParams.get('lat');
    let longitude = +urlParams.get('lng');
    if (!latitude && !longitude) {
        latitude = 32.0749831
        longitude = 34.9120554
    }
    console.log('onload!', latitude, longitude)
    mapService.initMap()
        .then(() => locService.getPosition())
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            mapService.addMarker({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
            locService.currrCoords = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            locService.getCityByCoords(pos.coords.latitude, pos.coords.longitude)
                .then(renderCityName)

            weatherService.getWeather(pos.coords.latitude, pos.coords.longitude)
                .then(renderWeather)
        })


}

// document.querySelector('.btn1').onclick =  () => {
//     console.log('Thanks!');
// }


document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            mapService.addMarker({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
            locService.currrCoords = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            locService.getCityByCoords(pos.coords.latitude, pos.coords.longitude)
                .then(renderCityName)
            weatherService.getWeather(pos.coords.latitude, pos.coords.longitude)
                .then(renderWeather)
        })
})


document.querySelector('.btn-search').onclick = () => {
    var city = document.querySelector('.search').value
    locService.getCoordsByCity(city)
        .then(coords => {
            mapService.panTo(coords.lat, coords.lng)
            mapService.addMarker({
                lat: coords.lat,
                lng: coords.lng
            });
            locService.currrCoords = {
                lat: coords.lat,
                lng: coords.lng
            }
            renderCityName(city)
            weatherService.getWeather(coords.lat, coords.lng)
                .then(renderWeather)
        })
}


function renderCityName(cityName) {
    document.querySelector('.city-name').innerHTML = 'location:' + cityName
}

function renderWeather(weather) {
    var strHtml = `<h2> weather today </h2>
  <img src="img/${weather.icon}.png" alt="">
   <br>
   <span>${weather.name}</span>
   ${weather.description}
   <br>
   ${weather.temp}° temerature from ${weather.tempMin}° to ${weather.tempMax}°
   <br>
   wind ${weather.wind}`

    document.querySelector('.weather').innerHTML = strHtml

}

document.querySelector('.btn-copy').onclick = copyLocation

function copyLocation() {
    var lat = locService.currrCoords.lat
    var lng = locService.currrCoords.lng
    console.log(lat, lng)
    let urltxt = ` https://chenmordechai.github.io/travel-tip-proj/?lat=${lat}&lng=${lng}`
    let elurl = document.querySelector('#url')
    elurl.innerHTML = urltxt
    elurl.select()
    document.execCommand("copy");
    alert("Copied the text: " + urltxt);
}