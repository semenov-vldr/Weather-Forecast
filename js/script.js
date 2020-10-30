import {App} from './app.js';

const app = new App();
const weatherAppElement = document.querySelector(`.weather-app`);

app.init(weatherAppElement);
