import {MapComponent} from './components/map-component.js';
import {WeatherComponent} from './components/weather-component.js';
import {InsertPosition, renderElement} from './utils.js';
import {WeatherService} from './weather-service.js';

export class App {
  constructor() {
    this.weatherService = new WeatherService();
  }

  init(weatherAppElement) {
    const weatherComponent = new WeatherComponent(this.weatherService);
    const weatherElement = weatherComponent.getElement();
    renderElement(weatherAppElement, weatherElement, InsertPosition.BEFOREEND);

    const mapComponent = new MapComponent(this.weatherService);
    const mapElement = mapComponent.getElement();
    renderElement(weatherAppElement, mapElement, InsertPosition.BEFOREEND);

    mapComponent.init();
  }
}
