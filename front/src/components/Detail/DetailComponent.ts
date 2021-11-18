import { PRODUCTS } from "../../sample-data/products.js";
import {SMALL_CATEGORIES} from "../../sample-data/small_categories";
import {BIG_CATEGORIES} from "../../sample-data/big_categories";
import { pipe, map, filter } from "fxts-test";

const getSmallCategoryName = (small_category_id: number) =>
    SMALL_CATEGORIES[small_category_id - 1].small_category_name;

const getBigCategoryName = (small_category_id: number) =>
    BIG_CATEGORIES[SMALL_CATEGORIES[small_category_id - 1].big_category_id - 1].big_category_name;

export class DetailComponent extends HTMLElement {
  static get componentName() {
    return "detail-component";
  }

  constructor(product_id: number) {
    super();
    const detailContent = `
        <div class="wrap">
${
  pipe(
    PRODUCTS,
    filter((p) => {
      if (p.product_id == product_id) return p;
    }),
    map((p) => 
        `<div class="product">
            <div class="product-category">${getBigCategoryName(p.small_category_id)} > ${getSmallCategoryName(p.small_category_id)}</div>
            <h2 class="product-name">${p.product_name}</h2>
        </div>`
    )
  ).next().value
}
</div>
        `;
    const detailStyle = document.createElement("style");
    detailStyle.textContent = ``;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = detailContent;
    shadowRoot.appendChild(detailStyle);
  }
}
