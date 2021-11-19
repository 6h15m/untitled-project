import { BIG_CATEGORIES, SMALL_CATEGORIES } from "../../sample-data";
import { pipe, map } from "@fxts/core";
import { join } from "../../common";
import styl from "./styl";

export class CategoryComponent extends HTMLElement {
  static get componentName() {
    return "category-component";
  }

  constructor() {
    super();

    const categoryContent = `<div class="wrap">
<div class="big-category-container">
${join(
  map(
    (b) => `<div class="big-category">${b.big_category_name}</div>`,
    BIG_CATEGORIES
  )
)}
</div>
<div class="small-category-container">
${join(
  pipe(
    SMALL_CATEGORIES,
    map((s) => `<div class="small-category">${s.small_category_name}</div>`)
  )
)}
</div>
                
                </div>
            `;
    const categoryStyle = document.createElement("style");
    categoryStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = categoryContent;
    shadowRoot.appendChild(categoryStyle);
  }
}
