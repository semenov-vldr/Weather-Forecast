import {AbstractComponent} from './abstract.component.js';

export class BigCardEmptyComponent extends AbstractComponent {
  _getTemplate() {
    return `<li class="card">
              <div class="big-card--empty"></div>
            </li>`;
  }
}
