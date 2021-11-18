import { PRODUCTS } from "../../sample-data/products.js";
import { map } from "fxts-test";
import {
  getSmallCategoryNameById,
  getBigCategoryNameBySmallId,
  getTagIdByProductId,
  getTagNameById,
  getOptionNameByOptionId,
  getOptionPropertyByOptionId,
  getOptionIdByProductId,
} from "../../common-db";
import { join } from "../../common";

export class DetailComponent extends HTMLElement {
  static get componentName() {
    return "detail-component";
  }

  constructor(product_id: number) {
    super();
    const p = PRODUCTS[product_id - 1];
    const detailContent = `
        <div class="wrap">
            <div class="product-image"></div>
            <div class="product-info">
                <div class="product-category">
                    ${getBigCategoryNameBySmallId(
                      p.small_category_id
                    )} > ${getSmallCategoryNameById(p.small_category_id)}
                </div>
                <h2 class="product-name">${p.product_name}</h2>
                <div class="product-tags">
                    ${join(
                      map(
                        (t_id) =>
                          `<div class="tag-name"># ${getTagNameById(
                            t_id
                          )}</div>`,
                        getTagIdByProductId(p.product_id)
                      )
                    )}
                </div>
                <div class="product-options">
                ${[
                  ...map(
                    (o) => `
                        <h4 class="option-name">${getOptionNameByOptionId(
                          o.option_id
                        )}</h4>
                        <div class="option-property-name-container">
                            ${join(
                              map(
                                (op) =>
                                  `<input type="radio" value=${op.option_property_id} class="option-property-name"> ${op.option_property_name}</input>`,
                                getOptionPropertyByOptionId(o.option_id)
                              )
                            )}</div>
                        `,
                    getOptionIdByProductId(p.product_id)
                  ),
                ].join(" ")}
                </div>
            </div>
        </div>
        `;
    const detailStyle = document.createElement("style");
    detailStyle.textContent = `
    .wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .product-image {
        flex: 1;
        border: 1px solid black;
        margin-right: 2rem;
    }
    .product-info {
        width: 20rem;
        height: 30rem;
        margin-right: 5rem;
    }
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
