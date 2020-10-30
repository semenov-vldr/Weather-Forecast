import {InsertPosition, renderElement, StateActions} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';
import {SmallCardComponent} from './small-card-component.js';

export class SmallCardListComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
    this._dataChangedHandler = this._dataChangedHandler.bind(this);
  }

  _getTemplate() {
    return `<div class="weather-content__small-cards">
                <ul class="card-list"></ul>
            </div>`;
  }

  _afterCreateElement() {
    this.weatherService.getAllCities().then((cities) => {
      this._allCities = cities;
      this._render();
    });

    this._addEventListeners();
    this.weatherService
      .makeListDroppable(this.getElement().querySelector(`.card-list`));
  }

  _addEventListeners() {
    window.addEventListener(StateActions.SORT_CHANGES, this._dataChangedHandler);
    window.addEventListener(StateActions.SEARCH_CHANGES, this._dataChangedHandler);
    window.addEventListener(StateActions.CARD_UPDATE_POSITION, this._dataChangedHandler);
  }

  _dataChangedHandler() {
    this._allCities = this.weatherService.getCitiesForSmallCardList();
    this._render();
  }

  _render() {
    this.getElement()
      .querySelectorAll(`.card`)
      .forEach((element) => element.remove());

    this._allCities.forEach((city) => {
      const smallCardComponent = new SmallCardComponent(city, this.weatherService);
      const smallCardElement = smallCardComponent.getElement();

      renderElement(this.getElement().querySelector(`.card-list`), smallCardElement, InsertPosition.BEFOREEND);
    });
  }
}
