const START_COORDINATE = {
    lat: 59.9386,
    lng: 30.3141,
  };

const MAP_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Create map
const map = L.map('map-weather')
  .on('load', () => {
  })
  .setView(START_COORDINATE, 11);

  L.tileLayer(
    MAP_TILE,
    {
      attribution: MAP_COPYRIGHT
},)
    .addTo(map);

// const marker = L.marker(START_COORDINATE,
//     {
//         draggable: true,
//     },
// );

// marker.addTo(map);

