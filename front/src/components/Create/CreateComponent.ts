import { filter, map, pipe } from '@fxts/core';
import join from '../../join';
import styl from './styl';
import { OptionComponent } from '../Option/OptionComponent';
import { GetCreateType } from '../../../../models/data.interface';

export class CreateComponent extends HTMLElement {
  private readonly shadow_root: ShadowRoot;
  private readonly create_data: GetCreateType;
  private last_tag_id: number;

  static get componentName() {
    return 'create-component';
  }

  constructor(create_data: GetCreateType) {
    super();
    this.create_data = create_data;
    this.last_tag_id = create_data.tags[create_data.tags.length - 1].id;
    const createContent = `
      <div class="wrap">
        <h2>Create New Product</h2>
        <form class='create'>
          <div class="category-container">
            <h3>Categories</h3>
            <div class="category-selector-container">
              <select id="big-category-selector">
                ${pipe(
                  create_data.categories.big_categories,
                  map((b) => `<option id="big-category-option" value=${b.id}>${b.name}</option>`),
                  join(''),
                )}
              </select>
              <div class="category-arrow"> > </div>
              <select id="small-category-selector">
                ${pipe(
                  create_data.categories.small_categories,
                  filter((s) => s.big_category_id === create_data.categories.big_categories[0].id),
                  map((s) => `<option id=${s.id}>${s.name}</option>`),
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
                  map(
                    (t) => `
                      <div class='tag'>
                        <input type='checkbox' id="tag-${t.id}">
                        <label for="tag-${t.id}">${t.name}</label>
                      </div>`,
                  ),
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
      this.create_data.categories.small_categories,
      filter((s) => s.big_category_id === selected_big_category_id),
      map((s) => `<option id=${s.id}>${s.name}</option>`),
      join(''),
    );
  };

  private addTag = (add_tag_btn_el: HTMLElement) => {
    const tag_name = prompt("What's your new tag name? 😲");
    const tags_container_el = this.shadow_root.getElementById('tags-container');
    const createTag = document.createElement('div');
    createTag.innerHTML = `
      <div class="tag">
        <input type='checkbox' id="tag-${this.last_tag_id + 1}">
        <label for="tag-${this.last_tag_id + 1}">${tag_name}</label>
      </div>
    `;
    tags_container_el!.appendChild(createTag.firstChild!);
    tags_container_el!.insertBefore(createTag.firstChild!, add_tag_btn_el!);
    this.last_tag_id += 1;
  };
}
