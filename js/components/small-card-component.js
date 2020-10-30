import {AbstractComponent} from './abstract-component.js';

export class SmallCardComponent extends AbstractComponent {
  constructor(city, weatherService) {
    super();
    this._city = city;
    this.weatherService = weatherService;
  }

  _getTemplate() {
    return `<li class="card" id="${this._city.city}">
              <div class="small-card">
                  <span class="small-card__city"> ${this._city.city} </span>
                  <span class="small-card__temperature">
                  ${this._city.temperature > 0 ? `+` : ``}
                  ${this._city.temperature}°</span>
                  <span class="icon icon--strips-small"></span>
              </div>
            </li>`;
  }

  _afterCreateElement() {
    this.weatherService.makeCardDraggable(this._element, this._city);
  }
}
