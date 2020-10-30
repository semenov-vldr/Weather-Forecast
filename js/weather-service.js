import { SortType, SortTypeMethods, StateActions, STATUS_BIG_CARD, STATUS_SMALL_CARD, URL } from './utils.js';

export class WeatherService {
  constructor () {
    this._favoritesCities = [];
    this._search = '';
    this._sortType = SortType.ASC;
    this._filter = {
      sunny: false,
      cloudy: false,
      snowy: false,
      metorite: false,
      rainy: false,
      blizzard: false,
      stormy: false,
    };
    this._data = { cities: [] };
    this._map = undefined;
    this._markers = [];
  }

  get map () {
    return this._map;
  }

  set map (value) {
    this._map = value;
  }

  get markers () {
    return this._markers;
  }

  set markers (value) {
    this._markers = value;
  }

  async getAllCities () {
    this._data = await fetch(URL)
      .then(res => res.json())
      .catch(() => ([]));
    return this._data.cities
      .sort(SortTypeMethods[this._sortType]);
  }

  getCitiesForSmallCardList () {
    return this._data.cities
      .filter((item) => item.city.toLowerCase().includes(this._search))
      .sort(SortTypeMethods[this._sortType]);
  }

  setSortType (sortType) {
    this._sortType = sortType;
    this._emitEvent(StateActions.SORT_CHANGES, this._sortType);
  }

  setSearch (text) {
    this._search = text.toLowerCase();
    this._emitEvent(StateActions.SEARCH_CHANGES, this._sortType);
  }

  setFilter (filterKey, value) {
    this._filter[filterKey] = value;
    this._emitEvent(StateActions.FILTER_CHANGES, this._sortType);
  }

  getFavoriteCities () {
    const keysForFilter = Object.keys(this._filter).filter(f => this._filter[f]);

    return this._favoritesCities.filter((city) => {
      return keysForFilter.length ? keysForFilter.every(key => city.weather[key]) : true;
    });
  }

  updatePosition (card, prevCardId) {
    if (!this._favoritesCities.length && card.status === STATUS_BIG_CARD) {
      const cardIndex = this._data.cities.findIndex((city) => city.city === card.city);

      this._data.cities.splice(cardIndex, 1);
      this._favoritesCities.push(card);
    } else if (card.status === STATUS_BIG_CARD && !this._favoritesCities.includes(card)) {
      const cardIndex = this._data.cities.findIndex((city) => city.city === card.city);

      this._data.cities.splice(cardIndex, 1);
      this._favoritesCities.push(card);
    } else if (card.status === STATUS_BIG_CARD) {
      const cardIndex = this._favoritesCities.findIndex((city) => city.city === card.city);
      const prevCardIndex = this._favoritesCities.findIndex((city) => city.city === prevCardId);

      this._favoritesCities.splice(cardIndex, 1);
      this._favoritesCities.splice(prevCardIndex + 1, 0, card);
    } else if (card.status === STATUS_SMALL_CARD && !this._data.cities.includes(card)) {
      const cardIndex = this._favoritesCities.findIndex((city) => city.city === card.city);

      this._data.cities.unshift(card);
      this._favoritesCities.splice(cardIndex, 1);
    }

    this._emitEvent(StateActions.CARD_UPDATE_POSITION, card);
  }

  makeCardDraggable (element, city) {
    this._draggedElement = null;
    this._cardStatus = null;
    element.draggable = true;

    element.addEventListener(`dragstart`, () => {
      this._draggedElement = element;
      this._draggedElement.classList.add(`card--dragged`);
    });

    element.addEventListener(`dragend`, () => {
      const prevCardId = element.previousElementSibling
        ? element.previousElementSibling.id
        : undefined;
      this._draggedElement.classList.remove(`card--dragged`);
      this._draggedElement = null;

      if (this._cardStatus) {
        city.status = this._cardStatus;
        this.updatePosition(city, prevCardId);
      }
    });
  }

  makeListDroppable (element) {
    element.addEventListener(`dragover`, (evt) => {
      evt.preventDefault();
      const elementUnder = evt.target;
      if (elementUnder === this._draggedElement) {
        return;
      }

      if (elementUnder.classList.contains(`card`)) {
        const refChild = (elementUnder === this._draggedElement.nextElementSibling) ? elementUnder.nextElementSibling : elementUnder;

        element.insertBefore(this._draggedElement, refChild);

        return;
      }

      if (elementUnder.classList.contains(`small-card`)) {
        this._cardStatus = STATUS_SMALL_CARD;
      } else if (elementUnder.classList.contains(`big-card__content`) || elementUnder.classList.contains(`weather-content__help`)) {
        this._cardStatus = STATUS_BIG_CARD;
      }
    });
  }

  _emitEvent (type, data) {
    window.dispatchEvent(new CustomEvent(type, { data }));
  }
}
