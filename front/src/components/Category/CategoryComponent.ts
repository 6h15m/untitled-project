import { filter, pipe, each } from '@fxts/core';
import styl from './styl';
import { GetCategoriesType } from '../../../../models/data.interface';

export class CategoryComponent extends HTMLElement {
  static get componentName() {
    return 'category-component';
  }

  private readonly host_location: string;

  private readonly shadow_root: ShadowRoot;
  private readonly big_category_container_el: HTMLDivElement;
  private readonly big_category_all_el: HTMLAnchorElement;
  private readonly small_category_container_el: HTMLDivElement;

  constructor(
    categories_data: GetCategoriesType,
    selected_small_category_id: number,
    selected_big_category_id: number,
  ) {
    super();
    this.host_location = `http://${window.location.host}`;

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.big_category_container_el = document.createElement('div');
    this.big_category_container_el.classList.add('big-category-container');

    this.big_category_all_el = document.createElement('a');
    this.big_category_all_el.classList.add('big-category');
    this.big_category_all_el.setAttribute('href', this.host_location);
    this.big_category_all_el.innerHTML = 'All';

    this.big_category_container_el.appendChild(this.big_category_all_el);

    each((big_category) => {
      const big_category_el = document.createElement('a');
      big_category_el.classList.add('big-category');
      big_category_el.setAttribute('href', `?big_category_id=${big_category.id}`);
      big_category_el.innerHTML = big_category.name;
      this.big_category_container_el.appendChild(big_category_el);
    }, categories_data.big_categories);

    this.small_category_container_el = document.createElement('div');
    this.small_category_container_el.classList.add('small-category-container');

    pipe(
      categories_data.small_categories,
      filter((small_category) =>
        selected_big_category_id ? small_category.big_category_id === selected_big_category_id : true,
      ),
      each((small_category) => {
        const small_category_el = document.createElement('a');
        small_category_el.classList.add('small-category');
        small_category_el.setAttribute(
          'href',
          `?small_category_id=${small_category.id}`,
        );
        small_category_el.innerHTML = small_category.name;
        this.small_category_container_el.appendChild(small_category_el);
      }),
    );

    const category_style = document.createElement('style');
    category_style.textContent = styl;
    this.shadow_root.appendChild(category_style);

    const container_el = document.createElement('div');
    container_el.classList.add('category-container');
    container_el.appendChild(this.big_category_container_el);
    container_el.appendChild(this.small_category_container_el);
    this.shadow_root.appendChild(container_el);
  }
}
