// fd04c038b4083dd0d159274298038549
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=fd04c038b4083dd0d159274298038549

import {showAlert} from './alert-error.js';
import {CITIES_ID} from './array-cities.js';
import {createSmallCard} from './small-card.js';
import {createBigCard} from './big-card.js';
import {renderPoint} from "./map.js";


const API_KEY = '&appid=fd04c038b4083dd0d159274298038549';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?id=';

// Рендер списка городов (мал. карточек)
const getDataWeather = async () => {
    let requests_cities = CITIES_ID.map((city_id) => fetch(API_URL + city_id + API_KEY)
        .then((responce) => responce.json()));

return Promise.all(requests_cities)
        .then(cities => {
            cities.forEach((city) => createSmallCard(city))
        })
        .catch(() => showAlert('Ошибка при запросе данных погоды'));
};

// Добавление меток и отрисовка выбранных больших карточек
const renderDataBigCard = (city_id) => {
    fetch(API_URL + city_id + API_KEY)
    .then((responce) => responce.json())
    .then((city) => {
        let marker_id = renderPoint(city.coord);
        const bigCard = createBigCard(city);
        bigCard.setAttribute('data-marker_id', marker_id);
    })
    .catch(() => showAlert('Запрос на город для большой карточки не удался'));
};


// Отрисовка маленьких карточек
const renderSmallCard = (city_id) => {
    fetch(API_URL + city_id + API_KEY)
    .then((responce) => responce.json())
    .then((city) => {
        createSmallCard(city);
        console.log(city.name + ' - Мал. город добавлен');
    })
    .catch(() => showAlert('Запрос на город для маленькой карточки не удался'));
};



export {getDataWeather, renderDataBigCard, renderSmallCard};