const sort = document.querySelector('#alphabet-sort'); 
const sortReverse = document.querySelector('#alphabet-sort-reverse');

const sortingByName = () => {

        const smallCardsBlock = document.querySelector('.weather-content__small-cards');
        let smallCardList = smallCardsBlock.querySelectorAll('.small-card');

        Array.from(smallCardList).sort((prev, next) => {
            prev = prev.querySelector('.small-card__city').innerText.toLowerCase();
            next = next.querySelector('.small-card__city').innerText.toLowerCase();
            return (prev > next) - (prev < next);
        }).forEach((n, i) => n.style.order = i);

        document.querySelector('.weather-content__small-cards > div:first-child').style.marginBottom = '2px';
        document.querySelector('.weather-content__small-cards > div:last-child').style.marginBottom = '80px';
};

const sortingReverseByName = () => {

    const smallCardsBlock = document.querySelector('.weather-content__small-cards');
    let smallCardList = smallCardsBlock.querySelectorAll('.small-card');

    Array.from(smallCardList).sort((prev, next) => {
        prev = prev.querySelector('.small-card__city').innerText.toLowerCase();
        next = next.querySelector('.small-card__city').innerText.toLowerCase();
        return (prev < next) - (prev > next);
    }).forEach((n, i) => n.style.order = i);

    document.querySelector('.weather-content__small-cards > div:first-child').style.marginBottom = '80px';
    document.querySelector('.weather-content__small-cards > div:last-child').style.marginBottom = '2px';
};


sort.addEventListener('change', sortingByName);
sortReverse.addEventListener('change', sortingReverseByName);
