const search = document.querySelector('#search');

search.addEventListener('keyup', () => {
    const input = search.value.toLowerCase(); // запрос поиска
    const smallCardsBlock = document.querySelector('.weather-content__small-cards');
    const smallCardList = smallCardsBlock.querySelectorAll('.small-card');

    smallCardList.forEach(smallCard => {
        const cityCard = smallCard.querySelector('.small-card__city');
        const cityCardText = cityCard.textContent || cityCard.innerText;

        if (cityCardText.toLowerCase().indexOf(input) > -1) {
            smallCard.style.display = '';
        } else {
            smallCard.style.display = 'none';
        }
    });
});

