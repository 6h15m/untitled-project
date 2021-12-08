import { each, filter, map, pipe, toArray, join } from '@fxts/core';
import styl from './styl';
import { OptionComponent } from '../Option/OptionComponent';
import { GetCreateType } from '../../../../models/data.interface';
import postCreateData from '../../data/post/create';

export class CreateComponent extends HTMLElement {
  private readonly shadow_root: ShadowRoot;
  private readonly create_data: GetCreateType;
  private last_tag_id: number;
  private readonly option_component_el: OptionComponent;

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
            <input type="text" id="product-name-field"/>
          </div>
          <div class="product-price-container">
            <h3>Product Price</h3>
            <input type="number" placeholder='0' id='product-price-field'/>
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
                        <input type='checkbox' id="tag-${t.id}" name='tag' value=${t.id}>
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
          <input type='button' value='Create' class='create-btn' id='create-btn'/>
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
    this.option_component_el = new OptionComponent();
    this.shadow_root.getElementById('product-options-container')?.appendChild(this.option_component_el);
  }

  connectedCallback() {
    const big_category_selector_el = this.shadow_root.getElementById('big-category-selector');
    const add_tag_btn_el = this.shadow_root.getElementById('add-tag-btn');
    const create_btn_el = this.shadow_root.getElementById('create-btn');
    big_category_selector_el?.addEventListener('change', () => {
      this.changeSmallCategoryOptions(this.getSelectedValue(big_category_selector_el as HTMLSelectElement));
    });
    add_tag_btn_el?.addEventListener('click', () => {
      this.addTag(add_tag_btn_el);
    });
    create_btn_el?.addEventListener('click', () => {
      try {
        this.checkNullValue();
        this.sendProductData();
      } catch (e) {
        alert('Please fill all value! 😔');
      }
    });
  }

  private checkNullValue = () => {
    const input_els = this.shadow_root.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    pipe(
      input_els,
      filter((el) => el.name !== 'tag'),
      each((el) => {
        if (!el.value) {
          throw 'Unfilled field';
        }
      }),
    );
    return this.option_component_el.checkNullValue();
  };

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
        <input type='checkbox' id="tag-${this.last_tag_id + 1}" value=${this.last_tag_id + 1} name='tag'>
        <label for="tag-${this.last_tag_id + 1}" is='new'>${tag_name}</label>
      </div>
    `;
    tags_container_el!.appendChild(createTag.firstChild!);
    tags_container_el!.insertBefore(createTag.firstChild!, add_tag_btn_el!);
    this.last_tag_id += 1;
  };

  async sendProductData() {
    const small_category_selector_el = this.shadow_root.getElementById(
      'small-category-selector',
    ) as HTMLSelectElement;
    const product_name_field_el = this.shadow_root.getElementById('product-name-field') as HTMLInputElement;
    const product_price_field_el = this.shadow_root.getElementById('product-price-field') as HTMLInputElement;
    const selected_tag_els = this.shadow_root.querySelectorAll(
      'input[name="tag"]:checked',
    ) as NodeListOf<HTMLInputElement>;

    await postCreateData({
      small_category_id: +small_category_selector_el.options[small_category_selector_el.selectedIndex].id,
      product_name: product_name_field_el.value,
      product_price: +product_price_field_el.value,
      tags: pipe(
        selected_tag_els,
        map((s) => ({ id: +s.value, name: s.labels![0].hasAttribute('is') ? s.labels![0].innerHTML : '' })),
        toArray,
      ),
      options: this.option_component_el.getOptionData(),
    });
    alert('Product created! 😉');
  }
}
