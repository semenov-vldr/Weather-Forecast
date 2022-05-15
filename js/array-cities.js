const CITIES = [ 
    {
        "id": 2122311,
        "name": "Оймякон",
        // "name": "Oymyakon",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 142.816666,
            "lat": 63.466671
        }
    },

    {
        "id": 498817,
        // "name": "Saint Petersburg",
        "name": "Санкт-Петербург",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 30.264168,
            "lat": 59.894444
        }
    },

    {
        "id": 524894,
        // "name": "Moscow",
        "name": "Москва",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 37.606667,
            "lat": 55.761665
        }
    },

    {
        "id": 519336,
        // "name": "Velikiy Novgorod",
        "name": "Великий Новгород",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 31.283331,
            "lat": 58.51667
        }
    },

    {
        "id": 520555,
        // "name": "Nizhniy Novgorod",
        "name": "Нижний Новгород",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 44.002048,
            "lat": 56.328674
        }
    },

    {
        "id": 519969,
        // "name": "North Ossetia",
        "name": "Северная Осетия",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 44.25,
            "lat": 43.0
        }
    },

    {
        "id": 479561,
        // "name": "Ufa",
        "name": "Уфа",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 56.037498,
            "lat": 54.775002
        }
    },

    {
        "id": 491422,
        // "name": "Sochi",
        "name": "Сочи",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 39.730278,
            "lat": 43.599998
        }
    },

    {
        "id": 584243,
        // "name": "Adler",
        "name": "Адлер - первый",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 39.919998,
            "lat": 43.43
        }
    },


    {
        "id": 3117735,
        // "name": "Madrid",
        "name": "Мадрид",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": -3.70256,
            "lat": 40.4165
        }
    },

    {
        "id": 5128581,
        // "name": "New York City",
        "name": "Нью-Йорк",
        "state": "NY",
        "country": "US",
        "coord": {
            "lon": -74.005966,
            "lat": 40.714272
        }
    },

    {
        "id": 6356055,
        // "name": "Barcelona",
        "name": "Барселона",
        "state": "",
        "country": "ES",
        "coord": {
            "lon": 2.12804,
            "lat": 41.399422
        }
    },

    {
        "id": 146384,
        // "name": "Limassol",
        "name": "Лимассол",
        "state": "",
        "country": "CY",
        "coord": {
            "lon": 33.033329,
            "lat": 34.674999
        }
    },

    {
        "id": 323784,
        // "name": "Ankara",
        "name": "Анкара",
        "state": "",
        "country": "TR",
        "coord": {
            "lon": 32.833328,
            "lat": 39.916672
        }
    },
];

const sort = document.querySelector('#alphabet-sort'); 
const sortReverse = document.querySelector('#alphabet-sort-reverse'); 

    const sortCities = () => {
        CITIES.sort((prev, next) => {
            if ( prev.name < next.name ) return -1;
            if ( prev.name > next.name ) return 1;
        });
    }

    sortCities();

// Массив id городов
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


export {CITIES_ID, getName}