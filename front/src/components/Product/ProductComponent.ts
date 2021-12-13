import { each } from '@fxts/core';
import styl from './styl';
import { GetProductType } from '../../../../models/data.interface';

export class ProductComponent extends HTMLElement {
  static get componentName() {
    return 'product-component';
  }

  private readonly shadow_root: ShadowRoot;
  private readonly tags_container_el: HTMLDivElement;
  private readonly product_name_el: HTMLDivElement;

  constructor(product_data: GetProductType) {
    super();

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.tags_container_el = document.createElement('div');
    this.tags_container_el.classList.add('tags-container');

    each((tag) => {
      const tag_el = document.createElement('div');
      tag_el.classList.add('tag');
      tag_el.innerHTML = `# ${tag.name}`;
      this.tags_container_el.appendChild(tag_el);
    }, product_data.tags);

    this.product_name_el = document.createElement('div');
    this.product_name_el.classList.add('name');
    this.product_name_el.innerHTML = product_data.name;

    const product_style = document.createElement('style');
    product_style.textContent = styl;
    this.shadow_root.appendChild(product_style);

    const container_el = document.createElement('a');
    container_el.classList.add('product-container');
    container_el.setAttribute('href', `/detail?product_id=${product_data.id}`);
    container_el.appendChild(this.tags_container_el);
    container_el.appendChild(this.product_name_el);
    this.shadow_root.appendChild(container_el);
  }
}
