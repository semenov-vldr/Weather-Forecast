export const URL = `https://geo-weather-json.herokuapp.com/db`;
export const STATUS_BIG_CARD = `status-big-card`;
export const STATUS_SMALL_CARD = `status-small-card`;
export const HIDE_BLOCK_CLASS = `hidden-block`;

export const InsertPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const SortType = {
  ASC: `ASC`,
  DESC: `DESC`,
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
