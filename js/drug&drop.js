const smallCardsBlock = document.querySelector('.weather-content__small-cards');
const bigCardsBlock = document.querySelector('.weather-content__big-cards');


const dragAndDrop = () => {
    
    let smallCardList = document.querySelector('.small-card');
    console.log(smallCardList);

    smallCardList.classList.add('hidden', 'color');
    // smallCardList.style.display = 'none';
    console.log('Класс добавлен');

};


export default dragAndDrop;

