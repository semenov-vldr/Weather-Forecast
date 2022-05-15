//70e1ed322b02acbc57d443dd91065f3e
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={70e1ed322b02acbc57d443dd91065f3e}

import {showAlert} from './alert-error.js';
import { CITIES_ID } from './array-cities.js';
import { createSmallCard } from './small-card.js';

const API_KEY = '70e1ed322b02acbc57d443dd91065f3e';

const getDataWeather = () => {

// Массив объектов с погодой по запросу с сервера
let requests_cities = CITIES_ID.map(city_id => fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${API_KEY}`)
    .then( (responce) => responce.json() ));

Promise.all(requests_cities)
.then(cities => {
        cities.forEach(city => {
            createSmallCard(city);
        })
})
.catch(() => showAlert('Ошибка при запросе данных погоды'));
}

export {getDataWeather};
