import { map, pipe } from '@fxts/core';
import styl from './styl';
import join from '../../join';
import { GetProductsType } from '../../../../models/data.interface';

export class ProductComponent extends HTMLElement {
  static get componentName() {
    return 'product-component';
  }

  constructor(products_data: GetProductsType) {
    super();
    const productContent = `
      <div class="wrap">
        ${pipe(
          products_data.products,
          map(
            (p) => `
            <a href='./detail?product_id=${p.id}' class='product-container'>
              <div class='product'>${p.name}</div>
            </a>
            `,
          ),
          join(''),
        )}
      </div>
    `;
    const productStyle = document.createElement('style');
    productStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = productContent;
    shadowRoot.appendChild(productStyle);
  }
}
