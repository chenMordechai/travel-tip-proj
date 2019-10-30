
export default {
    initMap,
    addMarker,
    panTo
}
var gmarkers = [];
var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap'); 
    return _connectGoogleApi()
    .then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
    })
}

function addMarker(loc) {
    removeMarkers()
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    gmarkers.push(marker)
    return marker;
}

function removeMarkers(){
    for(var i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
}

function panTo(lat, lng) {
    console.log('in pan to',lat,lng)
    var laLatLng = new google.maps.LatLng(lat,lng);
    console.log('in pan to 2')
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCFjP_SMFTmoUS7GymW7at3QQVtZWUC7mU';
    // const API_KEY = '';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



