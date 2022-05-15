const DIR_OF_THE_WILD = [
     {
        dir: 'C',
        min: 348.75,
        max: 33.75,
    },

    {
        dir: 'СВ',
        min: 33.75,
        max: 87.75,
    },

    {
        dir: 'В',
        min: 87.75,
        max: 123.75,
    },

    {
        dir: 'ЮВ',
        min: 123.75,
        max: 168.75,
    },

    {
        dir: 'Ю',
        min: 168.75,
        max: 213.75,
    },

    {
        dir: 'ЮЗ',
        min: 213.75,
        max: 258.75,
    },

    {
        dir: 'З',
        min: 258.75,
        max: 303.75,
    },

    {
        dir: 'CЗ',
        min: 303.75,
        max: 348.75,
    }
];

// Определение направления ветра
const getDirWind = (deg) => {
    DIR_OF_THE_WILD.forEach((item_dir, index, array) => {
        if (deg >= array[index].min && deg <= array[index].max) {
            return item_dir.dir;
        };
    })
};

// Проверка знака температуры
const checkPolarity = (value) => value < 0 ? '' + value: '+' + value;


export {DIR_OF_THE_WILD, getDirWind, checkPolarity};