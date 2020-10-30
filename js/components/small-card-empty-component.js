import {AbstractComponent} from './abstract-component.js';

export class SmallCardEmptyComponent extends AbstractComponent {
  _getTemplate() {
    return `<div class="small-card small-card--empty"></div>`;
  }
}
