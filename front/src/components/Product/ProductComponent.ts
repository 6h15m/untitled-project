import { PRODUCTS } from "../../sample-data";
import { map } from "@fxts/core";
import styl from './styl';

export class ProductComponent extends HTMLElement {
  static get componentName() {
    return "product-component";
  }

  constructor() {
    super();
    const productContent = `
        <div class="wrap">
        ${[...map(p => 
        `<a href="./detail?product_id=${p.product_id}" class="product-container">
            <div class="product">${p.product_name}</div>
         </a>`, PRODUCTS),].join(" ")}
        </div>`;
    const productStyle = document.createElement("style");
    productStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = productContent;
    shadowRoot.appendChild(productStyle);
  }
}
