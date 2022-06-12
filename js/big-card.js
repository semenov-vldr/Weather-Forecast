import { getDirWind } from './utils.js'
import {getName} from './array-cities.js'
import {checkPolarity} from './utils.js'


const bigCardTemplate = document.querySelector('#big-card').content;
const bigCardsBlock = document.querySelector('.weather-content__big-cards');
const bigCardEmpty = bigCardsBlock.querySelector('.big-card--empty');

const addValue = (elem, value) => elem.textContent = value;
const hideElement = (elem) => elem.classList.add('hidden');


const createBigCard = (city) => {

    const bigCard = bigCardTemplate.cloneNode(true);

    if (city.name) {
        addValue(bigCard.querySelector('.big-card__city'), getName(city.id));
    } else {
        hideElement(bigCard.querySelector('.big-card__city'));
    }

    if (city.main.temp) {
        addValue(bigCard.querySelector('.big-card__temperature'), `${checkPolarity(Math.round(city.main.temp - 273))}°`);
    } else {
        hideElement(bigCard.querySelector('.big-card__temperature'));
    }

    if (city.wind.deg && city.wind.speed) {
        addValue(bigCard.querySelector('.big-card__wind-info'), `Ветер ${getDirWind(city.wind.deg)}, ${city.wind.speed} м/c`);
    } else {
        hideElement(bigCard.querySelector('.big-card__wind-info'));
    }

    const bigCardWrapper = document.createElement('div');
    bigCardWrapper.classList.add('big-card');
    bigCardWrapper.setAttribute('data-id', city.id);
    bigCardWrapper.append(bigCard);
    bigCardEmpty.insertAdjacentElement('beforebegin', bigCardWrapper);
    bigCardWrapper.setAttribute('draggable', 'true');

    return bigCardWrapper;
};



export {createBigCard};