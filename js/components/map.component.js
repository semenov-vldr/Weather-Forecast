import {StateActions} from '../utils.js';
import {AbstractComponent} from './abstract.component.js';

const MSCLat = 55.751244;
const MSCLong = 37.618423;

export class MapComponent extends AbstractComponent {
  constructor(weatherService) {
    super();
    this.weatherService = weatherService;
    this._favoritesCities = this.weatherService.getFavoriteCities();
  }

  init() {
    this.getLocation()
      .then((location, lat = MSCLat, long = MSCLong) => {
        if (location) {
          lat = location[0];
          long = location[1];
        }

        this.weatherService.map = L.map(`map`).setView([lat, long], 10);
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
         .addTo(this.weatherService.map);

        window.addEventListener(StateActions.CARD_UPDATE_POSITION, () => {
          this.weatherService.map.remove();
          this.weatherService.map = L.map(`map`).setView([lat, long], 10);
          L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
           .addTo(this.weatherService.map);

          this.weatherService.markers = this._favoritesCities.map((city) => {
            const addRemoveActiveClass = function (evt, el) {
              const element = document.querySelector(`#${evt.target.options.title.split(` `).join(``)}`);
              element.classList.toggle(`active`);
              if (element.classList.contains(`active`)) {
                el.setOpacity(1);
              } else {
                el.setOpacity(0.7);
              }
            };
            return L.marker([city.coordinates.latitude, city.coordinates.longitude], {
              title: city.city,
            })
              .addTo(this.weatherService.map)
              .bindPopup(`temperature in this city: ${city.temperature > 0 ? `+` : ``}${city.temperature}°`)
              .setOpacity(0.7)
              .on(`click`, function (e) {
                addRemoveActiveClass(e, this);
              })
              .on(`mouseover`, function (e) {
                const element = document.querySelector(`#${e.target.options.title.split(` `).join(``)}`);
                if (element.classList.contains(`active`)) {
                  return;
                }
                addRemoveActiveClass(e, this);
              })
              .on(`mouseout`, function (e) {
                addRemoveActiveClass(e, this);
              });
          });

          const group = new L.featureGroup(this.weatherService.markers);
          if (this._favoritesCities.length) {
            this.weatherService.map.fitBounds(group.getBounds());
          } else {
            this.weatherService.map.setView([lat, long], 10);
          }
        });
      });
  }

  _getTemplate() {
    return `<div id="map" class="weather-app__map weather-map"></div>`;
  }

  getLocation() {
    return fetch(`https://ipinfo.io/json?token=c53e5677671c54`)
      .then((res) => res.json())
      .then((data) => data.loc.split(`,`));
  }
}
