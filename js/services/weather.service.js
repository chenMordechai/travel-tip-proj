export default {
    getWeather: getWeather,
}

function getWeather(lat,lng){
    const API_KEY = '556218e5e37cd0ef9c432a295f6b115f';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=`
    var prmRes = axios.get(url + API_KEY)
    var prmData= prmRes.then(res =>{
        var name = res.data.name
        var main = res.data.weather[0].main
        var description = res.data.weather[0].description
        var tempMin = Math.floor(res.data.main.temp_min/12.45)+'c'
        var tempMax = Math.floor(res.data.main.temp_max/12.45)+'c'
        var temp = Math.floor(res.data.main.temp/12.45)+'c'
        var icon = res.data.weather[0].icon
        var wind =Math.floor(res.data.wind.speed*3.6) + 'k/h'
        var weather = {name,main ,description,temp ,tempMax,tempMin ,wind, icon}
         return weather
     })
     return prmData
}

