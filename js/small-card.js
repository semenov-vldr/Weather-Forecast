import {getName} from './array-cities.js'
import {checkPolarity} from './utils.js'

const smallCardTemplate = document.querySelector('#small-card').content;
const smallCardsBlock = document.querySelector('.weather-content__small-cards'); // Блок мал. карточек (левый)

const addValue = (elem, value) => {elem.textContent = value};
const hideElement = (elem) => {elem.classList.add('hidden-block')};


const createSmallCard = (city) => {
    const smallCard = smallCardTemplate.cloneNode(true);

    if (city.name) {
        addValue(smallCard.querySelector('.small-card__city'), getName(city.id));
    } else {
        hideElement(smallCard.querySelector('.small-card__city'));
    }

    if (city.main.temp) {
        addValue(smallCard.querySelector('.small-card__temperature'), `${checkPolarity(Math.round(city.main.temp - 273))}°`);
    } else {
        hideElement(smallCard.querySelector('.small-card__temperature'));
    }

    let smallCardWrapper = document.createElement('div');
   
    smallCardWrapper.classList.add('small-card');
    smallCardWrapper.append(smallCard);
    smallCardWrapper.setAttribute('draggable', 'true');

    smallCardsBlock.append(smallCardWrapper);
};


export {createSmallCard};