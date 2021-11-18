import { PRODUCTS } from "../../sample-data/products.js";
import { SMALL_CATEGORIES } from "../../sample-data/small_categories";
import { BIG_CATEGORIES } from "../../sample-data/big_categories";
import { TAGS } from "../../sample-data/tags";
import { PRODUCTS_TAGS } from "../../sample-data/products_tags";
import { OPTIONS } from "../../sample-data/options";
import { PRODUCTS_OPTIONS } from "../../sample-data/products_options";
import { OPTION_PROPERTIES } from "../../sample-data/option_properties";
import { pipe, map, filter } from "fxts-test";

const getSmallCategoryName = (small_category_id: number) =>
  SMALL_CATEGORIES[small_category_id - 1].small_category_name;

const getBigCategoryName = (small_category_id: number) =>
  BIG_CATEGORIES[SMALL_CATEGORIES[small_category_id - 1].big_category_id - 1]
    .big_category_name;

const getTagId = (product_id: number) => [
    ...pipe(
        PRODUCTS_TAGS,
        filter((p) => (p.product_id == product_id ? p : null)),
        map(p => p.tag_id)
    ),
];

const getTagName = (tag_id: number) => TAGS[tag_id - 1].tag_name;

const getOptionId = (product_id: number) => [
  ...pipe(
    PRODUCTS_OPTIONS,
    filter((p) => (p.product_id == product_id ? p : null))
  ),
];

const getOptionName = (option_id: number) => OPTIONS[option_id - 1].option_name;

const getOptionProperty = (option_id: number) => [
  ...pipe(
    OPTION_PROPERTIES,
    filter((o) => (o.option_id == option_id ? o : null))
  ),
];

export class DetailComponent extends HTMLElement {
  static get componentName() {
    return "detail-component";
  }

  constructor(product_id: number) {
    super();
    const p = PRODUCTS[product_id - 1];
    const detailContent = `
        <div class="wrap">
            <div class="product">
                <div class="product-category">
                    ${getBigCategoryName(
                      p.small_category_id
                    )} > ${getSmallCategoryName(p.small_category_id)}
                </div>
                <h2 class="product-name">${p.product_name}</h2>
                <div class="product-tags">
                    ${[...map(t_id => `<div class="tag-name"># ${getTagName(t_id)}</div>`, getTagId(p.product_id))].join(" ")}
                </div>
                <div class="product-options">
                ${[
                  ...map(
                    (o) => `
                        <h4 class="option-name">${getOptionName(
                          o.option_id
                        )}</h4>
                        <div class="option-property-name-container">
                            ${[
                              ...map(
                                (op) =>
                                  `<input type="radio" value=${op.option_property_id} class="option-property-name"> ${op.option_property_name}</input>`,
                                getOptionProperty(o.option_id)
                              ),
                            ].join(" ")}</div>
                        `,
                    getOptionId(p.product_id)
                  ),
                ].join(" ")}
                </div>
            </div>
        </div>
        `;
    const detailStyle = document.createElement("style");
    detailStyle.textContent = `
    .product-tags {
        display: flex;
        flex-direction: row;
    }
    .tag-name {
        color: blue;
        margin-right: 1rem;
    }`;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = detailContent;
    shadowRoot.appendChild(detailStyle);
  }
}
