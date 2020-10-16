import {InsertPosition, renderElement, StateActions} from '../utils.js';
import {AbstractComponent} from './abstract.component.js';
import {BigCardComponent} from './big-card.component.js';
import {BigCardEmptyComponent} from './big-card-empty.component.js';
import {setElementVisibility} from '../utils.js';

export class BigCardListComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
    this._favoritesCities = this.weatherService.getFavoriteCities();
  }

  _getTemplate() {
    return `<div class="weather-content__big-cards">
              <ul class="card-list">
              ${this._favoritesCities.length === 0 ? this._getEmptyTemplate() : ``}
              </ul>
            </div>`;
  }

  _getEmptyTemplate() {
    return `<div class="weather-content__help">
              Перетащите сюда города, погода в которых вам интересна
            </div>`;
  }

  _afterCreateElement() {
    this._render();
    this._addEventListeners();
    this.weatherService.makeListDroppable(this.getElement().querySelector(`.card-list`));
  }

  _addEventListeners() {
    window.addEventListener(StateActions.FILTER_CHANGES, this._onDataChanged.bind(this));
    window.addEventListener(StateActions.CARD_UPDATE_POSITION, this._onDataChanged.bind(this));
  }

  _onDataChanged() {
    this._favoritesCities = this.weatherService.getFavoriteCities();
    this._render();
  }

  _renderEmptyComponent() {
    const emptyItemComponent = new BigCardEmptyComponent();
    const emptyItemElement = emptyItemComponent.getElement();

    setElementVisibility(emptyItemElement, this._favoritesCities.length !== 0);
    renderElement(this.getElement().querySelector(`.card-list`), emptyItemElement, InsertPosition.BEFOREEND);
  }

  _render() {
    this.getElement()
      .querySelectorAll(`.card`)
      .forEach((element) => element.remove());

    this._favoritesCities.forEach((favoriteCity) => {
      const bigCardComponent = new BigCardComponent(favoriteCity, this.weatherService);
      const bigCardElement = bigCardComponent.getElement();

      function EventHandler(element) {
        document.querySelectorAll(`.card`)
        .forEach((city) => city.classList.remove(`active`));
        element.classList.add(`active`);

        this.weatherService.map.setView([favoriteCity.coordinates.latitude, favoriteCity.coordinates.longitude], 10);

        this.weatherService.markers.forEach((marker) => {
          if (marker.options.title === favoriteCity.city) {
            if (element.classList.contains(`active`)) {
              marker.setOpacity(1);
            } else {
              marker.setOpacity(0.7);
            }
          }
        });
      }

      bigCardElement.addEventListener(`click`, EventHandler.bind(this, bigCardElement));
      bigCardElement.addEventListener(`mouseenter`, this.mouseEnterHandler.bind(this, favoriteCity));
      bigCardElement.addEventListener(`mouseleave`, this.mouseLeaveHandler.bind(this, favoriteCity, bigCardElement));
      renderElement(this.getElement().querySelector(`.card-list`), bigCardElement, InsertPosition.BEFOREEND);
    });
    // this._renderEmptyComponent();
  }

  mouseEnterHandler(favoriteCity) {
    this.weatherService.markers.forEach((marker) => {
      if (marker.options.title === favoriteCity.city) {
        marker.setOpacity(1);
      }
    });
  }

  mouseLeaveHandler(favoriteCity, bigCardElement) {
    this.weatherService.markers.forEach((marker) => {
      if (
        marker.options.title === favoriteCity.city &&
        !bigCardElement.classList.contains(`active`)
      ) {
        marker.setOpacity(0.7);
      }
    });
  }
}
