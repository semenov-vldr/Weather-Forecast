import {FilterState, SortType} from '../utils.js';
import {AbstractComponent} from './abstract.component.js';

export class HeaderNavComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
  }

  _getTemplate() {
    return `<section class="sort-form weather-content__sort">
    <h2 class="visually-hidden">Форма сортировки</h2>
    <form action="#" method="GET">
      <div class="sort-form__group">
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--radio">
          <input
            checked
            id="alphabet-sort"
            name="alphabet-sort"
            type="radio"
            value="${SortType.ASC}"
          />
          <label aria-label="Сортировка по алфавиту" for="alphabet-sort">
            <span class="icon icon--arrow-down"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--radio">
          <input
            id="alphabet-sort-reverse"
            name="alphabet-sort"
            type="radio"
            value="${SortType.DESC}"
          />
          <label
            aria-label="Сортировка по алфавиту в обратном направлении"
            for="alphabet-sort-reverse"
          >
            <span class="icon icon--arrow-up"></span>
          </label>
        </div>
      </div>
      <div class="sort-form__group">
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--search">
          <input
            id="search"
            name="city-search"
            placeholder="Название города"
            type="search"
          />
          <label aria-label="Поиск городов" for="search"></label>
        </div>
      </div>
      <div class="sort-form__group">
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="rainy"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.RAINY}"
          />
          <label aria-label="Дождливо" for="rainy">
            <span class="icon icon--rainy"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="sunny"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.SUNNY}" />
          <label aria-label="Солнечно" for="sunny">
            <span class="icon icon--sunny"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="cloudy"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.CLOUDY}" />
          <label aria-label="Облачно" for="cloudy">
            <span class="icon icon--cloudy"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="snowy"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.SNOWY}" />
          <label aria-label="Снежно" for="snowy">
            <span class="icon icon--snowy"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="tornado"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.STORMY}" />
          <label aria-label="Торнадо" for="tornado">
            <span class="icon icon--tornado"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="blizzard"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.BLIZZARD}"
          />
          <label aria-label="Гроза" for="blizzard">
            <span class="icon icon--blizzard"></span>
          </label>
        </div>
        <div class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox">
          <input
            id="meteor-shower"
            name="weather-conditions"
            type="checkbox"
            value="${FilterState.METORITE}"
          />
          <label aria-label="Метеоритный дождь" for="meteor-shower">
            <span class="icon icon--meteor-shower"></span>
          </label>
        </div>
      </div>
    </form>
  </section>`;
  }

  _afterCreateElement() {
    this._addEventListeners();
  }

  _addEventListeners() {
    this.getElement()
      .querySelector(`#alphabet-sort`)
      .addEventListener(`change`, this._changeSortHandler.bind(this));

    this.getElement()
      .querySelector(`#alphabet-sort-reverse`)
      .addEventListener(`change`, this._changeSortHandler.bind(this));

    this.getElement()
      .querySelector(`#search`)
      .addEventListener(`input`, this._filterByTextHandler.bind(this));

    this.getElement()
      .querySelector(`#rainy`)
      .addEventListener(`change`, this._filterSort.bind(this));

    this.getElement()
      .querySelector(`#sunny`)
      .addEventListener(`change`, this._filterSort.bind(this));

    this.getElement()
      .querySelector(`#cloudy`)
      .addEventListener(`change`, this._filterSort.bind(this));

    this.getElement()
      .querySelector(`#snowy`)
      .addEventListener(`change`, this._filterSort.bind(this));

    this.getElement()
      .querySelector(`#tornado`)
      .addEventListener(`change`, this._filterSort.bind(this));

    this.getElement()
      .querySelector(`#blizzard`)
      .addEventListener(`change`, this._filterSort.bind(this));

    this.getElement()
      .querySelector(`#meteor-shower`)
      .addEventListener(`change`, this._filterSort.bind(this));
  }

  _changeSortHandler(evt) {
    this.weatherService.setSortType(evt.target.value);
  }

  _filterByTextHandler(evt) {
    evt.preventDefault();
    this.weatherService.setSearch(evt.target.value);
  }

  _filterSort(evt) {
    this.weatherService.setFilter(evt.target.value, evt.target.checked);
  }
}
