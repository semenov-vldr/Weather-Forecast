import {
  InsertPosition,
  OPACITY_DEFAULT,
  OPACITY_INACTIVE,
  renderElement,
  setElementVisibility,
  StateActions,
} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';
import {BigCardComponent} from './big-card-component.js';
import {BigCardEmptyComponent} from './big-card-empty-component.js';

export class BigCardListComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
    this._favoritesCities = this.weatherService.getFavoriteCities();
    this._dataChangedHandler = this._dataChangedHandler.bind(this);
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
    window.addEventListener(StateActions.FILTER_CHANGES, this._dataChangedHandler);
    window.addEventListener(StateActions.CARD_UPDATE_POSITION, this._dataChangedHandler);
  }

  _dataChangedHandler() {
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

      bigCardElement.addEventListener(`click`, this.bigCardClickHandler.bind(this, favoriteCity, bigCardElement));
      bigCardElement.addEventListener(`mouseenter`, this.mouseEnterHandler.bind(this, favoriteCity));
      bigCardElement.addEventListener(`mouseleave`, this.mouseLeaveHandler.bind(this, favoriteCity, bigCardElement));
      renderElement(this.getElement().querySelector(`.card-list`), bigCardElement, InsertPosition.BEFOREEND);
    });
  }

  mouseEnterHandler(favoriteCity) {
    const selectedMarker = this.weatherService.markers.find((marker) => marker.options.title === favoriteCity.city);

    if (selectedMarker) {
      selectedMarker.setOpacity(OPACITY_DEFAULT);
    }
  }

  mouseLeaveHandler(favoriteCity, bigCardElement) {
    this.weatherService.markers.forEach((marker) => {
      if (marker.options.title === favoriteCity.city && !bigCardElement.classList.contains(`active`)) {
        marker.setOpacity(OPACITY_INACTIVE);
      }
    });
  }

  bigCardClickHandler(favoriteCity, bigCardElement) {
    document.querySelectorAll(`.card-list .card`)
      .forEach((city) => city.classList.remove(`active`));
    bigCardElement.classList.add(`active`);

    this.weatherService.map.setView([favoriteCity.coordinates.latitude, favoriteCity.coordinates.longitude], 10);

    const selectedMarker = this.weatherService.markers.find((marker) => marker.options.title === favoriteCity.city);

    if (selectedMarker) {
      selectedMarker.setOpacity(bigCardElement.classList.contains(`active`) ? OPACITY_DEFAULT : OPACITY_INACTIVE);
    }
  }
}
