import { each } from '@fxts/core';
import styl from './styl';
import { GetProductsType } from '../../../../models/data.interface';
import { ProductComponent } from '../Product/ProductComponent';

export class ProductListComponent extends HTMLElement {
  static get componentName() {
    return 'product-list-component';
  }

  private readonly shadow_root: ShadowRoot;
  private readonly no_product_notice_el: HTMLDivElement;

  constructor(products_data: GetProductsType) {
    super();

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.no_product_notice_el = document.createElement('div');
    this.no_product_notice_el.classList.add('no-product-notice');
    this.no_product_notice_el.innerHTML = 'No products in here! 😖';

    const product_list_style = document.createElement('style');
    product_list_style.textContent = styl;
    this.shadow_root.appendChild(product_list_style);

    const container_el = document.createElement('div');
    container_el.classList.add('product-list-container');
    customElements.define(ProductComponent.componentName, ProductComponent);
    if (products_data.products.length === 0) {
      container_el.appendChild(this.no_product_notice_el);
    } else {
      each((product) => {
        const product_component_el = new ProductComponent(product);
        container_el.appendChild(product_component_el);
      }, products_data.products);
    }
    this.shadow_root.appendChild(container_el);
  }
}
