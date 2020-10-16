import {
  SortType,
  StateActions,
  STATUS_BIG_CARD,
  STATUS_SMALL_CARD,
  URL
} from './utils.js';

export class WeatherService {
  SortTypeMethods = {
    ASC: (a, b) => a.city.localeCompare(b.city),
    DESC: (a, b) => -a.city.localeCompare(b.city),
  };

  _favoritesCities = [];
  _search = '';
  _sortType = SortType.ASC;
  _filter = {
    sunny: false,
    cloudy: false,
    snowy: false,
    metorite: false,
    rainy: false,
    blizzard: false,
    stormy: false,
  };
  _data = {cities: []};
  map = `global variable for init map component`;
  markers = `global variable for markers for map component`;

  async getAllCities() {
    this._data = await fetch(URL).then(res => res.json());
    return this._data.cities.sort(this.SortTypeMethods[this._sortType]);
  }

  getCitiesForSmallCardList() {
    return this._data.cities
    .filter((city) => city.city.toLowerCase().includes(this._search))
    .sort(this.SortTypeMethods[this._sortType]);
  }

  setSortType(sortType) {
    this._sortType = sortType;
    this._emitEvent(StateActions.SORT_CHANGES, this._sortType);
  }

  setSearch(text) {
    this._search = text.toLowerCase();
    this._emitEvent(StateActions.SEARCH_CHANGES, this._sortType);
  }

  setFilter(filterKey, value) {
    this._filter[filterKey] = value;
    this._emitEvent(StateActions.FILTER_CHANGES, this._sortType);
  }

  getFavoriteCities() {
    if (this._favoritesCities.length === 0) {
      return this._favoritesCities;
    }

    return this._favoritesCities.filter((city) => {
      const keysForFilter = Object.keys(this._filter)
                                  .filter(f => this._filter[f])
      if (!keysForFilter.length) {
        return true;
      }
      return keysForFilter.every(key => city.weather[key])
    });
  }

  updatePosition(card, prevCardId) {
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

  makeCardDraggable(element, city) {
    window.draggedElement = null;
    window.cardStatus = null;
    element.draggable = true;

    element.addEventListener(`dragstart`, () => {
      window.draggedElement = element;
      window.draggedElement.classList.add(`card--dragged`);
    });

    element.addEventListener(`dragend`, () => {
      const prevCardId = element.previousElementSibling
        ? element.previousElementSibling.id
        : undefined;
      window.draggedElement.classList.remove(`card--dragged`);
      window.draggedElement = null;

      if (window.cardStatus) {
        city.status = window.cardStatus;
        this.updatePosition(city, prevCardId);
      }
    });
  }

  makeListDroppable(element) {
    element.addEventListener(`dragover`, (evt) => {
      evt.preventDefault();
      const elementUnder = evt.target;
      if (elementUnder === window.draggedElement) {
        return;
      }

      if (elementUnder.classList.contains(`card`)) {
        if (elementUnder === window.draggedElement.nextElementSibling) {
          element.insertBefore(window.draggedElement, elementUnder.nextElementSibling);
        } else {
          element.insertBefore(window.draggedElement, elementUnder);
        }
        return;
      }

      if (elementUnder.classList.contains(`small-card`)) {
        window.cardStatus = STATUS_SMALL_CARD;
      } else if (
        elementUnder.classList.contains(`big-card__content`) ||
        elementUnder.classList.contains(`weather-content__help`)
      ) {
        window.cardStatus = STATUS_BIG_CARD;
      }
    });
  }


  _emitEvent(type, data) {
    window.dispatchEvent(new CustomEvent(type, { data }));
  }
}
