export const URL = `https://geo-weather-json.herokuapp.com/db`;
export const STATUS_BIG_CARD = `status-big-card`;
export const STATUS_SMALL_CARD = `status-small-card`;
export const HIDE_BLOCK_CLASS = `hidden-block`;

export const InsertPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const SortType = {
  ASC: `asc`,
  DESC: `desc`,
};

export const StateActions = {
  SORT_CHANGES: `sort-changes`,
  SEARCH_CHANGES: `search-changes`,
  FILTER_CHANGES: `filter-changes`,
  CARD_UPDATE_POSITION: `card-update-position`,
};

export const FilterState = {
  SUNNY: `sunny`,
  CLOUDY: `cloudy`,
  SNOWY: `snowy`,
  METORITE: `metorite`,
  RAINY: `rainy`,
  BLIZZARD: `blizzard`,
  STORMY: `stormy`,
};

export function createElement(template) {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
}

export function renderElement(container, element, insertPosition = InsertPosition.AFTERBEGIN) {
  switch (insertPosition) {
    case InsertPosition.BEFOREEND:
      container.append(element);
      break;
    case InsertPosition.AFTERBEGIN:
      container.prepend(element);
      break;
  }
}

export function setElementVisibility(element, visibility) {
  element.classList.toggle(HIDE_BLOCK_CLASS, !visibility);
}

export const DEFAULT_LAT = 55.751244;
export const DEFAULT_LON = 37.618423;
export const DEFAULT_ZOOM = 10;
export const OPACITY_DEFAULT = 1.0;
export const OPACITY_INACTIVE = 0.7;

export const SortTypeMethods = {
  asc: (a, b) => a.city.localeCompare(b.city),
  desc: (a, b) => -a.city.localeCompare(b.city),
};

export function toggleActiveClassForPoint(evt) {
  const element = document.querySelector(`#${evt.target.options.title.split(` `).join(``)}`);
  element.classList.toggle(`active`);
  if (element.classList.contains(`active`)) {
    this.setOpacity(OPACITY_DEFAULT);
  } else {
    this.setOpacity(OPACITY_INACTIVE);
  }
}

export const LOCATION_API_URL = `https://ipinfo.io/json?token=c53e5677671c54`;
