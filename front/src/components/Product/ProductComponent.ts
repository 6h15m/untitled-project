import { PRODUCTS } from "../../sample-data/products.js";
import { map } from "fxts-test";

export class ProductComponent extends HTMLElement {
  static get componentName() {
    return "product-component";
  }

  constructor() {
    super();
    const productContent = `
        <div class="wrap">
${[
  ...map(
    (p) => `<a href="./detail?product_id=${p.product_id}" class="product-container">
<div class="product">${p.product_name}</div>
</a>

`,
    PRODUCTS
  ),
].join(" ")}
                
                </div>`;
    const productStyle = document.createElement("style");
    productStyle.textContent = `
        .wrap {
            display: flex;
            flex-flow: row wrap;
            margin-top: 1rem;
        }
        .product-container {
            margin-right: 2rem;
            margin-bottom: 2rem;
        }
        .product {
            width: 12rem;
            height: 14rem;
            border: 1px solid black;
        }
        `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = productContent;
    shadowRoot.appendChild(productStyle);
  }
}
