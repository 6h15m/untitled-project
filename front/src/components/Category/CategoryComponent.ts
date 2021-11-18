import { BIG_CATEGORIES } from "../../sample-data/big_categories.js";
import { SMALL_CATEGORIES } from "../../sample-data/small_categories.js";
import { pipe, map } from "fxts-test";

export class CategoryComponent extends HTMLElement {
  static get componentName() {
    return "category-component";
  }

  constructor() {
    super();

    const categoryContent = `<div class="wrap">
<div class="big-category-container">
${[
  ...map(
    (b) => `<div class="big-category">${b.big_category_name}</div>`,
    BIG_CATEGORIES
  ),
].join(" ")}
</div>
<div class="small-category-container">
${[
  ...pipe(
    SMALL_CATEGORIES,
    map((s) => `<div class="small-category">${s.small_category_name}</div>`)
  ),
].join(" ")}
</div>
                
                </div>
            `;
    const categoryStyle = document.createElement("style");
    categoryStyle.textContent = `
    .big-category-container {
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
    }
    .big-category {
        margin-right: 0.8rem;
        font-size: 1.4em;
    }
    .small-category-container {
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
        margin-top: 0.8rem;
    }
    .small-category {
        margin-right: 0.4rem;
    }
    `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = categoryContent;
    shadowRoot.appendChild(categoryStyle);
  }
}
