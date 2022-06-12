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


    let layer = L.layerGroup();

// Отрисовка меток выбранных городов
const renderPoint = (point_big_card) => {
  const {lon, lat} = point_big_card;

      const marker = L.marker({lon, lat});
     
      layer.addLayer(marker).addTo(map);
      let marker_id = layer.getLayerId(marker);
      console.log(marker_id + ' - markerID');
      return marker_id;
};

// Удаление меток выбранных городов
const deletePoint = (marker_id) => {
  layer.removeLayer(marker_id);
  console.log('Маркер удален');
};



export {renderPoint, deletePoint};


