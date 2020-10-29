import {AbstractComponent} from './abstract-component.js';

export class BigCardComponent extends AbstractComponent {
  constructor(favoriteCity, weatherService) {
    super();
    this._favoriteCity = favoriteCity;
    this.weatherService = weatherService;
  }

  _getTemplate() {
    return `<li class="card" id="${this._favoriteCity.city.split(` `).join(``)}">
                <div class="big-card">
                    <div class="big-card__header">
                        <span class="icon icon--strips-big"></span>
                        <span class="big-card__city">${this._favoriteCity.city}</span>
                    </div>
                    <div class="big-card__content">
                        <div class="big-card__content-wrapper">
                            <div class="big-card__weather-conditions">
                                ${this._getConditionsTemplate(this._favoriteCity.weather)}
                            </div>
                            <div class="big-card__wind">
                                <span class="icon icon--wind"></span>
                                <span class="big-card__wind-info">
                                Ветер ${this._favoriteCity.wind.direction},
                                ${this._favoriteCity.wind.speed} м/с</span>
                            </div>
                        </div>
                        <span class="big-card__temperature">
                          ${this._favoriteCity.temperature > 0 ? `+` : ``}
                          ${this._favoriteCity.temperature}°
                        </span>
                    </div>
                </div>
            </li>`;
  }

  _afterCreateElement() {
    this.weatherService.makeCardDraggable(this._element, this._favoriteCity);
  }

  _getConditionsTemplate(weather) {
    return Object.keys(weather)
      .map((condition) => {
        return weather[condition] ? `<span class="icon icon--${condition}"></span>` : ``;
      })
      .join(``);
  }
}
