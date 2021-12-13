import { each } from '@fxts/core';
import styl from './styl';
import { GetDetailType } from '../../../../models/data.interface';

export class DetailDefaultInfoComponent extends HTMLElement {
  static get componentName() {
    return 'detail-default-info-component';
  }

  private readonly host_location: string;

  private readonly shadow_root: ShadowRoot;
  private readonly category_container_el: HTMLDivElement;
  private readonly big_category_el: HTMLAnchorElement;
  private readonly category_arrow_el: HTMLDivElement;
  private readonly small_category_el: HTMLAnchorElement;
  private readonly name_el: HTMLDivElement;
  private readonly tags_container_el: HTMLDivElement;

  constructor(detail_data: GetDetailType) {
    super();
    this.host_location = `http://${window.location.host}`;

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.category_container_el = document.createElement('div');
    this.category_container_el.classList.add('category-container');

    this.big_category_el = document.createElement('a');
    this.big_category_el.classList.add('big-category');
    this.big_category_el.setAttribute(
      'href',
      `${this.host_location}?big_category_id=${detail_data.big_category.id}`,
    );
    this.big_category_el.innerHTML = detail_data.big_category.name;

    this.category_arrow_el = document.createElement('div');
    this.category_arrow_el.classList.add('category-arrow');
    this.category_arrow_el.innerHTML = '>';

    this.small_category_el = document.createElement('a');
    this.small_category_el.classList.add('small-category');
    this.small_category_el.setAttribute(
      'href',
      `${this.host_location}?small_category_id=${detail_data.small_category.id}`,
    );
    this.small_category_el.innerHTML = detail_data.small_category.name;

    this.category_container_el.appendChild(this.big_category_el);
    this.category_container_el.appendChild(this.category_arrow_el);
    this.category_container_el.appendChild(this.small_category_el);

    this.name_el = document.createElement('div');
    this.name_el.classList.add('name');
    this.name_el.innerHTML = detail_data.product.name;

    this.tags_container_el = document.createElement('div');
    this.tags_container_el.classList.add('tags-container');

    each((tag) => {
      const tag_el = document.createElement('div');
      tag_el.classList.add('tag');
      tag_el.innerHTML = `# ${tag.name}`;
      this.tags_container_el.appendChild(tag_el);
    }, detail_data.tags);

    const detail_default_info_style = document.createElement('style');
    detail_default_info_style.textContent = styl;
    this.shadow_root.appendChild(detail_default_info_style);

    const container_el = document.createElement('div');
    container_el.classList.add('detail-default-info-container');
    container_el.appendChild(this.category_container_el);
    container_el.appendChild(this.name_el);
    container_el.appendChild(this.tags_container_el);
    this.shadow_root.appendChild(container_el);
  }
}
