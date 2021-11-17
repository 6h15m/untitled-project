import { PRODUCTS } from "../../sample-data/products.js";
import { pipe, map, filter } from "fxts-test";

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
    map((p) => `<div class="product">${p.product_name}</div>`)
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
