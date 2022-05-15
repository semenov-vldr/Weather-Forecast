import { getDirWind } from './utils.js'


const bigCardTemplate = document.querySelector('#big-card').content;

const bigCardsBlock = document.querySelector('.weather-content__big-cards'); // Блок бол. карточек (правый)

const addValue = (elem, value) => {elem.textContent = value};
const hideElement = (elem) => {elem.classList.add('hidden-block')};


const createBigCard = (city) => {

    console.log(getDirWind(city.wind.deg) + ' - Проверка');

    const bigCard = bigCardTemplate.cloneNode(true);

    if (city.name) {
        addValue(bigCard.querySelector('.big-card__city'), city.name);
    } else {
        hideElement(bigCard.querySelector('.big-card__city'));
    }

    if (city.main.temp) {
        addValue(bigCard.querySelector('.big-card__temperature'), `${Math.round(city.main.temp - 273)}°`);
    } else {
        hideElement(bigCard.querySelector('.big-card__temperature'));
    }

    if (city.wind.deg && city.wind.speed) {
        addValue(bigCard.querySelector('.big-card__wind-info'), `Ветер ${getDirWind(city.wind.deg)}, ${city.wind.speed} м/c`);
    } else {
        hideElement(bigCard.querySelector('.big-card__wind-info'));
    }

    const bigCardEmpty = document.querySelector('.big-card--empty');
    bigCardEmpty.classList.add('hidden-block');

    let bigCardWrapper = document.createElement('div');
   

    bigCardWrapper.classList.add('big-card');
    bigCardWrapper.append(bigCard);

    bigCardsBlock.append(bigCardWrapper);
};


export {createBigCard};