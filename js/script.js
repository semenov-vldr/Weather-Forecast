import './map.js';
import {getDataWeather} from './api.js';
import './live-search.js';
import './sort.js';
import {dragAndDrop_smallCard} from './drag&drop.js';



await getDataWeather();
dragAndDrop_smallCard();
// deleteWatcher();