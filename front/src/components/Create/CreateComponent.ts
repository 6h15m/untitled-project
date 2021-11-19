import { map } from "@fxts/core";
import { BIG_CATEGORIES, SMALL_CATEGORIES } from "../../sample-data";
import { getSmallCategoryByBigCategoryId } from "../../common-db";
import { join } from "../../common";
import styl from "./styl";

export class CreateComponent extends HTMLElement {
  static get componentName() {
    return "create-component";
  }

  constructor() {
    super();
    const createContent = `
        <div class="wrap">
            <h2>Create New Product</h2>
            <div class="category-container">
            <h3>Categories</h3>
                    <select id="big-category-selector">
                    ${join(
                      map(
                        (b) =>
                          `<option id=${b.big_category_id}>${b.big_category_name}</option>`,
                        BIG_CATEGORIES
                      )
                    )}
                    </select>
                     > 
                    <select id="small-category-selector">
                    ${join(
                      map(
                        (s) =>
                          `<option id=${s.small_category_id}>${s.small_category_name}</option>`,
                        SMALL_CATEGORIES
                      )
                    )}
                    </select>
            </div>
            <div class="product-name-container">
                <h3>Product Name</h3>
                <input type="text"/>
            </div>
            <div class="base-price-container">
                <h3>Base Price</h3>
                <input type="text"/>
            </div>
            <div class="tag-container">
            
            </div>
            <div class="option-container">
            
            </div>
        </div>
    `;
    const createStyle = document.createElement("style");
    createStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = createContent;

    shadowRoot.appendChild(createStyle);
  }
}