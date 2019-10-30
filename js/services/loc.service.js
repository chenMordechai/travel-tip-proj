export default {
    // getLocs :getLocs,
    getPosition: getPosition,
    getCityByCoords:getCityByCoords,
    getCoordsByCity:getCoordsByCity,
    currrCoords:currrCoords
    
}

// var locs = [{lat: 11.22, lng: 22.11}]
var currrCoords;


// function getLocs() {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(locs);
//         }, 2000)
//     });
// }


function getPosition() {
    console.log('Getting Position');
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getCityByCoords(lat, lng ){
    const API_KEY = 'AIzaSyCFjP_SMFTmoUS7GymW7at3QQVtZWUC7mU';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=`
    var prmRes = axios.get(url + API_KEY)
    var prmData= prmRes.then(res =>{
        //  console.log('name',res.data.plus_code.compound_code)
         var cityName = res.data.plus_code.compound_code
         var cleanCityName = cityName.substring(7)
        //  console.log('city name:',cleanCityName)
         return cleanCityName
     })
     return prmData
}

function getCoordsByCity(city){
    const API_KEY = 'AIzaSyCFjP_SMFTmoUS7GymW7at3QQVtZWUC7mU';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+${city}+View,+CA&key=`
    var prmRes = axios.get(url + API_KEY)
    var prmData= prmRes.then(res =>{
        var coords = res.data.results[0].geometry.location
        console.log('cord',res.data.results)
         return coords
     })
     return prmData
}



