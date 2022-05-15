const smallCardsBlock = document.querySelector('.weather-content__small-cards');
const bigCardsBlock = document.querySelector('.weather-content__big-cards');

// let smallCardList = smallCardsBlock.querySelectorAll('.small-card');
//const bigCardEmpty = bigCardsBlock.querySelector('.big-card--empty'); // Пунктирный квадрат


const dragAndDrop = () => {
    
    let smallCardList = document.querySelector('.small-card');
    console.log(smallCardList);

    smallCardList.classList.add('color');
    console.log('Класс добавлен');
};

//setTimeout(dragAndDrop, 1000);

export {dragAndDrop}

