import { renderDataBigCard, renderSmallCard } from "./api.js";
import { deletePoint } from './map.js';

const smallCardsBlock = document.querySelector('.weather-content__small-cards');
const bigCardsBlock = document.querySelector('.weather-content__big-cards');

const contentHelp = document.querySelector('.weather-content__help');
const bigCardEmpty = document.querySelector('.big-card--empty');


//-------Debounce----------------------

function debounce (fn) {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments) };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, 500);
    };
};


// ------------------dragAndDrop_smallCard--------------------------------

const dragAndDrop_smallCard = () => {

    const smallCardList = smallCardsBlock.querySelectorAll('.small-card');

    // Функции для перетаскиваемого объекта

    function dragStart (evt) {
        evt.target.classList.add('selected');
        evt.dataTransfer.setData('id', evt.target.dataset.id);
    };

    function dragEnd (evt) {
        if (evt.target) evt.target.classList.remove('selected');
        contentHelp.classList.add('hidden');
        bigCardEmpty.classList.add('hidden');
    };

    smallCardList.forEach(small_card => {
        small_card.addEventListener('dragstart', dragStart);
        small_card.addEventListener('dragend', dragEnd);
    });

    // Функции для принимающего объекта

    function dragEnter () { bigCardEmpty.classList.remove('hidden') };

    function dragLeave () { bigCardEmpty.classList.add('hidden') };

    function dragOver (evt) { evt.preventDefault() };

    function onDrop (evt) {
        const id = evt.dataTransfer.getData('id');
        if (id) {
            const item = smallCardsBlock.querySelector(`.small-card[data-id="${id}"]`);
            item.classList.add('hidden');
            renderDataBigCard(id);
            console.log('Добавилась большая карточка ' + id);
        }
    };

    bigCardsBlock.addEventListener('dragenter', dragEnter);
    bigCardsBlock.addEventListener('dragleave', dragLeave);
    bigCardsBlock.addEventListener('dragover', dragOver);
    bigCardsBlock.addEventListener('drop', onDrop);
};


// ------------------dragAndDrop_bigCard--------------------------------------


function dragAndDrop_bigCard () {
    const bigCardList = bigCardsBlock.querySelectorAll('.big-card[draggable="true"]');

    // Функции для перетаскиваемого объекта

    bigCardList.forEach(big_card => {
        big_card.addEventListener('dragstart', dragStart);
        big_card.addEventListener('dragend', dragEnd);
    });

    function dragStart (evt) {
        evt.dataTransfer.setData('id', evt.target.dataset.id);
        const id = evt.dataTransfer.getData('id');
        console.log(id + ' - Захват большой карточки');
        evt.dataTransfer.effectAllowed = 'move';
    };

    function dragEnd (evt) {
        evt.preventDefault();
        console.log('Отпустили большую карточку');
    };


    // Функции для принимающего объекта

    function dragEnter () {
        this.classList.add('bordered');
        console.log('Вошел в зону');
    }

    function dragLeave () {
        this.classList.remove('bordered');
        console.log('Покинул зону');
    };

    function dragOver (evt) {
        evt.preventDefault();
        evt.dataTransfer.effectAllowed = 'move';
    };

    function onDrop (evt) {
        const id = evt.dataTransfer.getData('id');
        if (id) {
            console.log(id + ' - Отпустили элемент в мал. зоне');
            const bigCard = bigCardsBlock.querySelector(`.big-card[data-id="${id}"]`);
            bigCard.classList.add('hidden');
            deletePoint(bigCard.dataset.marker_id);

            debounce(renderSmallCard(id));
        } else console.log('Не удалось добавить мал. карточку');
    };

    smallCardsBlock.addEventListener('dragenter', dragEnter);
    smallCardsBlock.addEventListener('dragleave', dragLeave);
    smallCardsBlock.addEventListener('dragover', dragOver);
    smallCardsBlock.addEventListener('drop', onDrop);
};


// function deleteWatcher () {
    const observer = new MutationObserver(dragAndDrop_bigCard);
    
    observer.observe(bigCardsBlock, {
      childList: true, // слежка за добавлением/удалением новых узлов
      subtree: true, // слежка за добавлением дочерних элементов любой вложенности
    });
// };



// Sortable
new Sortable(bigCardsBlock, {
    Animation: 150,
});






export {dragAndDrop_smallCard};