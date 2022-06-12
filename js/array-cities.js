const CITIES = [ 
    {
        "id": 2122311,
        "name": "Оймякон",
        // "name": "Oymyakon",
    },

    {
        "id": 498817,
        // "name": "Saint Petersburg",
        "name": "Санкт-Петербург",
    },

    {
        "id": 524894,
        // "name": "Moscow",
        "name": "Москва",
    },

    {
        "id": 519336,
        // "name": "Velikiy Novgorod",
        "name": "Великий Новгород",
    },

    {
        "id": 520555,
        // "name": "Nizhniy Novgorod",
        "name": "Нижний Новгород",
    },

    {
        "id": 519969,
        // "name": "North Ossetia",
        "name": "Северная Осетия",
    },

    {
        "id": 479561,
        // "name": "Ufa",
        "name": "Уфа",
    },

    {
        "id": 491422,
        // "name": "Sochi",
        "name": "Сочи",
    },

    {
        "id": 584243,
        // "name": "Adler",
        "name": "Адлер",
    },


    {
        "id": 3117735,
        // "name": "Madrid",
        "name": "Мадрид",
    },

    {
        "id": 5128581,
        // "name": "New York City",
        "name": "Нью-Йорк",
    },

    {
        "id": 6356055,
        // "name": "Barcelona",
        "name": "Барселона",
    },

    {
        "id": 146384,
        // "name": "Limassol",
        "name": "Лимассол",
    },

    {
        "id": 323784,
        // "name": "Ankara",
        "name": "Анкара",
    },
];

// Сортировка списка
    CITIES.sort((prev, next) => {
        if ( prev.name < next.name ) return -1;
        if ( prev.name > next.name ) return 1;
    });
    

    // const sortCities = (namesCities) => {
    //     namesCities.sort((prev, next) => {
    //         if ( prev.name < next.name ) return -1;
    //         if ( prev.name > next.name ) return 1;
    //     });
    //     return namesCities;
    // };




// Массив id городов из сортированного списка
const CITIES_ID = CITIES.map(city => city.id);

// Получение города по id
const getName = (id) => {
    let name;
    CITIES.forEach((city) => {
        if (id == city.id) {
            name = city.name;
        }
    });
    return name;
};



export {CITIES, CITIES_ID, getName}