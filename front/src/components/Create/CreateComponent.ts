import { map } from '@fxts/core';
import { BIG_CATEGORIES, SMALL_CATEGORIES, TAGS } from '../../sample-data';
import { join } from '../../common';
import styl from './styl';

export class CreateComponent extends HTMLElement {
  static get componentName() {
    return 'create-component';
  }

  constructor() {
    super();
    const createContent = `
      <div class="wrap">
        <h2>Create New Product</h2>
        <div class="category-container">
          <h3>Categories</h3>
          <div class="category-selector-container">
            <select id="big-category-selector">
              ${join(
                map((b) => `<option id=${b.big_category_id}>${b.big_category_name}</option>`, BIG_CATEGORIES),
              )}
            </select>
            <div class="category-arrow"> > </div>
            <select id="small-category-selector">
              ${join(
                map(
                  (s) => `<option id=${s.small_category_id}>${s.small_category_name}</option>`,
                  SMALL_CATEGORIES,
                ),
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
          <input type="text"/>
        </div>
        <div class="product-tags-container">
          <h3>Tags</h3>
          <div class="tags-container">
            ${join(map((t) => `<div id=${t.tag_id} class="tag">${t.tag_name}</div>`, TAGS))}
            <input type="button" value="+" class="add-tag-btn"/>
          </div>
        </div>
        <div class="product-options-container">
          <h3>Options</h3>
          <div class="options-container">
            <div class="option">
              <div class="option-name-container">
                <h4>Option Name</h4>
                <input type="text" class='bg-white'/>
              </div>
              <div class="option-properties-container">
                <h4>Option Properties</h4>
                <div class="option-property">
                  <div class="property-name-container">
                    <h5>Property Name</h5>
                    <input type="text" class="property-input"/>
                  </div>
                  <div class="additional-price-container">
                    <h5>Additional Price</h5>
                    <input type="text" class="property-input" placeholder='0'/>
                  </div>
                </div>
                <input type="button" value="+" class="add-btn"/>  
              </div>
            </div>
            <input type="button" value="+" class="add-btn"/>
          </div>
        </div>
      </div>
    `;

    const createStyle = document.createElement('style');
    createStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = createContent;
    shadowRoot.appendChild(createStyle);
  }
}
