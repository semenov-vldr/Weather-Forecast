import './map.js';
import {getDataWeather} from './api.js';
import './live-search.js';
import './sort.js';
import './drug&drop.js';
import dragAndDrop from "./drug&drop.js";


await getDataWeather();
dragAndDrop()

