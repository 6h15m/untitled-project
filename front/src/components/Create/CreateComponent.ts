import { filter, map, pipe } from '@fxts/core';
import join from '../../join';
import styl from './styl';
import { CreateType } from '../../../../models/create.interface';
import { OptionComponent } from '../Option/OptionComponent';

export class CreateComponent extends HTMLElement {
  private readonly shadow_root: ShadowRoot;
  private readonly data: CreateType;

  static get componentName() {
    return 'create-component';
  }

  constructor(create_data: CreateType) {
    super();
    this.data = create_data;
    const createContent = `
      <div class="wrap">
        <h2>Create New Product</h2>
        <form class='create'>
          <div class="category-container">
            <h3>Categories</h3>
            <div class="category-selector-container">
              <select id="big-category-selector">
                ${pipe(
                  create_data.big_categories,
                  map(
                    (b) =>
                      `<option id="big-category-option" value=${b.big_category_id}>${b.big_category_name}</option>`,
                  ),
                  join(''),
                )}
              </select>
              <div class="category-arrow"> > </div>
              <select id="small-category-selector">
                ${pipe(
                  create_data.small_categories,
                  filter((s) => s.big_category_id === create_data.big_categories[0].big_category_id),
                  map((s) => `<option id=${s.small_category_id}>${s.small_category_name}</option>`),
                  join(''),
                )}
              </select>
            </div>
          </div>
          <div class="product-name-container">
            <h3>Product Name</h3>
            <input type="text"/>
          </div>
          <div class="product-price-container">
            <h3>Product Price</h3>
            <input type="number" placeholder='0'/>
          </div>
          <div class="product-tags-container">
            <h3>Tags</h3>
            <div class="tags-creation-container">
              <div class="tags-container" id="tags-container">
                ${pipe(
                  create_data.tags,
                  map((t) => `<div id=${t.tag_id} class="tag">${t.tag_name}</div>`),
                  join(''),
                )}
                <input type="button" value="+" class="add-tag-btn" id="add-tag-btn"/>
              </div>
            </div>
          </div>
          <div class="product-options-container" id="product-options-container"></div>
          <input type='submit' value='Create' class='create-btn'/>
        </form>
      </div>
    `;

    const createStyle = document.createElement('style');
    createStyle.textContent = styl;
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = createContent;
    shadowRoot.appendChild(createStyle);
    customElements.define(OptionComponent.componentName, OptionComponent);
    this.shadow_root.getElementById('product-options-container')?.appendChild(new OptionComponent());
  }

  connectedCallback() {
    const big_category_selector_el = this.shadow_root.getElementById('big-category-selector');
    const add_tag_btn_el = this.shadow_root.getElementById('add-tag-btn');
    big_category_selector_el?.addEventListener('change', () => {
      this.changeSmallCategoryOptions(this.getSelectedValue(big_category_selector_el as HTMLSelectElement));
    });
    add_tag_btn_el?.addEventListener('click', () => {
      this.addTag(add_tag_btn_el);
    });
  }

  private getSelectedValue = (selector_el: HTMLSelectElement) =>
    +selector_el.options[selector_el.selectedIndex].value;

  private changeSmallCategoryOptions = (selected_big_category_id: number) => {
    const small_category_selector_el = this.shadow_root.getElementById('small-category-selector');
    small_category_selector_el!.innerHTML = pipe(
      this.data.small_categories,
      filter((s) => s.big_category_id === selected_big_category_id),
      map((s) => `<option id=${s.small_category_id}>${s.small_category_name}</option>`),
      join(''),
    );
  };

  private addTag = (add_tag_btn_el: HTMLElement) => {
    const tag_name = prompt("What's your new tag name? 😲");
    const tag_id = 1;
    const tags_container_el = this.shadow_root.getElementById('tags-container');
    const createTag = document.createElement('div');
    createTag.innerHTML = `<div id=${tag_id} class="tag">${tag_name}</div>`;
    tags_container_el!.insertBefore(createTag.firstChild!, add_tag_btn_el!);
  };
}
