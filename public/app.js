
async function getCoords() {
    const pos =  await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude] 
}

function renderMap(coords){
    let latlngTriangle = [];

    const myMap = L.map("map", {
        center: [coords[0], coords[1]],
        zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
    }).addTo(myMap)

      myMap.on('click', onMapClick)

    function onMapClick(e) {
        latlngTriangle.push(e.latlng)
        console.log(latlngTriangle)
        const redPin = L.icon({
            iconUrl: './assets/red-pin.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        })
        const redMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: redPin}).bindPopup(e.latlng.toString()).addTo(myMap)
       
        triangleDraw(latlngTriangle)
    }

    function triangleDraw(latlng) {
        if(latlng.length === 3) {
            L.polygon(latlng, {color: 'red'}).addTo(myMap)
            latlng.length = 0

        }else {
            return false
        }
    }
}



window.onload = async () => {
    const coords = await getCoords()
    renderMap(coords)
}

