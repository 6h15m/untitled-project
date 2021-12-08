import { map, pipe, join } from '@fxts/core';
import styl from './styl';
import { GetProductsType } from '../../../../models/data.interface';

export class ProductComponent extends HTMLElement {
  static get componentName() {
    return 'product-component';
  }

  constructor(products_data: GetProductsType) {
    super();
    const productContent = `
      <div class="wrap">
        ${
          pipe(
            products_data.products,
            map(
              (p) => `
            <a href='./detail?product_id=${p.id}' class='product-container'>
              <div class='product'>
                <div class='product-tags-container'>
                  ${pipe(
                    p.tags,
                    map(
                      (tag) => `
                        <div class='tag'># ${tag.name}</div>
                      `,
                    ),
                    join(''),
                  ) ?? ''}
                </div>
                <div class='product-name'>${p.name}</div>
              </div>
            </a>
            `,
            ),
            join(''),
          ) ??
          `
        <div class="no-product">
          No products in here! 😖
        </div>
        `
        } 
      </div>
    `;
    const productStyle = document.createElement('style');
    productStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = productContent;
    shadowRoot.appendChild(productStyle);
  }
}
