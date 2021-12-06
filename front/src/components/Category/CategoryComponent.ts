import { filter, map, pipe } from '@fxts/core';
import styl from './styl';
import join from '../../join';
import { GetCategoriesType } from '../../../../models/data.interface';

export class CategoryComponent extends HTMLElement {
  static get componentName() {
    return 'category-component';
  }

  constructor(
    categories_data: GetCategoriesType,
    selected_small_category_id: number,
    selected_big_category_id: number,
  ) {
    super();
    const categoryContent = `
      <div class="wrap">
        <div class="big-category-container">
          <a class="big-category" href="http://localhost:8081">All</a>
          ${pipe(
            categories_data.big_categories,
            map(
              (b) => `
              <a class="big-category" href="http://localhost:8081?big_category_id=${b.id}">${b.name}</a>
              `,
            ),
            join(''),
          )}
        </div>
        <div class="small-category-container">
          ${pipe(
            categories_data.small_categories,
            filter((s) => (selected_big_category_id ? s.big_category_id === selected_big_category_id : true)),
            map(
              (s) => `
                <a class="small-category" href="http://localhost:8081?small_category_id=${s.id}">${s.name}</a>
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
