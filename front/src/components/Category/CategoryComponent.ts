import axios from 'axios';
import { map, pipe } from '@fxts/core';
import styl from './styl';
import join from '../../join';
import { CategoryType } from '../../models/category.interface';

export class CategoryComponent extends HTMLElement {
  static get componentName() {
    return 'category-component';
  }

  constructor() {
    super();
    axios
      .get<CategoryType>('/@api/categorySelectAll')
      .then((res) => {
        const categoryContent = `
          <div class="wrap">
            <div class="big-category-container">
              ${pipe(
                res.data.big_categories,
                map(
                  (b) => `
                  <div class="big-category">${b.big_category_name}</div>
                  `,
                ),
                join(''),
              )}
            </div>
            <div class="small-category-container">
              ${pipe(
                res.data.small_categories,
                map(
                  (s) => `
                    <div class="small-category">${s.small_category_name}</div>
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
      })
      .catch((err) => console.log(err));
  }
}
