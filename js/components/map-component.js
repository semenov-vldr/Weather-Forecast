import {
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_ZOOM,
  LOCATION_API_URL,
  OPACITY_INACTIVE,
  StateActions,
  toggleActiveClassForPoint,
} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';

export class MapComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
    this._dataChangedHandler = this._dataChangedHandler.bind(this);
  }

  init() {
    this._getLocation()
      .then(([lat = DEFAULT_LAT, long = DEFAULT_LON]) => {

        this.weatherService.map = L.map(`map`).setView([lat, long], DEFAULT_ZOOM);
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(this.weatherService.map);

        window.addEventListener(StateActions.CARD_UPDATE_POSITION, this._dataChangedHandler);
      });
  }

  _getTemplate() {
    return `<div id="map" class="weather-app__map weather-map"></div>`;
  }

  _getLocation() {
    return fetch(LOCATION_API_URL)
      .then((res) => res.json())
      .then((data) => data.loc.split(`,`));
  }

  _dataChangedHandler() {
    const favoritesCities = this.weatherService.getFavoriteCities();
    this.weatherService.map.remove();
    this.weatherService.map = L.map(`map`).setView([DEFAULT_LAT, DEFAULT_LON], DEFAULT_ZOOM);
    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(this.weatherService.map);

    this.weatherService.markers = favoritesCities.map((city) => {
      return L.marker([city.coordinates.latitude, city.coordinates.longitude], {title: city.city})
        .addTo(this.weatherService.map)
        .bindPopup(`Температура: ${city.temperature > 0 ? `+` : ``}${city.temperature}°`)
        .setOpacity(OPACITY_INACTIVE)
        .on(`mouseover`, toggleActiveClassForPoint)
        .on(`mouseout`, toggleActiveClassForPoint);
    });

    if (favoritesCities.length) {
      const group = L.featureGroup(this.weatherService.markers);
      this.weatherService.map.fitBounds(group.getBounds());
    } else {
      this.weatherService.map.setView([DEFAULT_LAT, DEFAULT_LON], DEFAULT_ZOOM);
    }
  }
}
