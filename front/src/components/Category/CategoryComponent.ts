import { map, pipe } from '@fxts/core';
import styl from './styl';
import join from '../../join';
import { GetCategoriesType } from '../../../../models/data.interface';

export class CategoryComponent extends HTMLElement {
  static get componentName() {
    return 'category-component';
  }

  constructor(categories_data: GetCategoriesType) {
    super();
    const categoryContent = `
      <div class="wrap">
        <div class="big-category-container">
          ${pipe(
            categories_data.big_categories,
            map(
              (b) => `
              <div class="big-category">${b.name}</div>
              `,
            ),
            join(''),
          )}
        </div>
        <div class="small-category-container">
          ${pipe(
            categories_data.small_categories,
            map(
              (s) => `
                <div class="small-category">${s.name}</div>
              `,
            ),
            join(''),
          )}
        </div>
      </div>
    `;

    const categoryStyle = document.createElement('style');
    categoryStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = categoryContent;
    shadowRoot.appendChild(categoryStyle);
  }
}
