import {InsertPosition, renderElement} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';
import {BigCardListComponent} from './big-card-list-component.js';
import {HeaderNavComponent} from './header-nav-component.js';
import {SmallCardListComponent} from './small-card-list-component.js';

export class WeatherComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
  }

  _getTemplate() {
    return `<div class="weather-app__content weather-content">
              <section class="weather-content__result">
                <h2 class="visually-hidden">Результаты сортировки</h2>
              </section>
            </div>`;
  }

  _afterCreateElement() {
    const headerNavComponent = new HeaderNavComponent(this.weatherService);
    const headerNavElement = headerNavComponent.getElement();
    renderElement(this.getElement(), headerNavElement, InsertPosition.AFTERBEGIN);

    const smallCardListComponent = new SmallCardListComponent(this.weatherService);
    const smallCardListElement = smallCardListComponent.getElement();
    const weatherContentResultElement = this.getElement().querySelector(`.weather-content__result`);
    renderElement(weatherContentResultElement, smallCardListElement, InsertPosition.AFTERBEGIN);

    const bigCardListComponent = new BigCardListComponent(this.weatherService);
    const bigCardListElement = bigCardListComponent.getElement();
    renderElement(weatherContentResultElement, bigCardListElement, InsertPosition.BEFOREEND);
  }
}
