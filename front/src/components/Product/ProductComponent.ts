import axios from 'axios';
import { map } from '@fxts/core';
import styl from './styl';
import { join } from '../../common';
import { ProductsType } from '../../models/product.interface';

export class ProductComponent extends HTMLElement {
  static get componentName() {
    return 'product-component';
  }

  constructor() {
    super();
    axios
      .get<ProductsType>('/@api/productSelectAll')
      .then((res) => {
        const productContent = `
          <div class="wrap">
            ${join(
              map(
                (p) => `
            <a href='./detail?product_id=${p.product_id}' class='product-container'>
              <div class='product'>${p.product_name}</div>
            </a>
            `,
                res.data.rows,
              ),
            )}
          </div>
        `;
        const productStyle = document.createElement('style');
        productStyle.textContent = styl;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = productContent;
        shadowRoot.appendChild(productStyle);
      })
      .catch((err) => console.log(err));
  }
}
