import { map } from "@fxts/core";
import { join } from "../../common";
import {
  getCartByUserId,
  getDetailedProductById,
  getProductNameById,
  getDetailedProductOptionPropertyId,
  getOptionPropertyById,
} from "../../common-db";
import styl from './styl';

const total_price = 18000;

export class CartComponent extends HTMLElement {
  static get componentName() {
    return "cart-component";
  }

  constructor(user_id: string) {
    super();

    const cartContent = `
        <div class="wrap">
            <h2>${user_id}'s Cart</h2>
            <div class="cart-product-container">
                ${join(
                  map(
                    (c) => `
                    <div class="cart-product">
                    <input type="checkbox" class="product-check" value=${
                      c.detailed_product_id
                    }/>
                    <div class="product">
                    <div class="product-left">
                        <a href="../detail?product_id=${
                          getDetailedProductById(c.detailed_product_id)
                            .product_id
                        }" class="product-name">${getProductNameById(
                      getDetailedProductById(c.detailed_product_id).product_id
                    )}</a>
                        <div class="product-option-property">
                            ${[
                              ...map(
                                (pp_id) => `
                                ${
                                  getOptionPropertyById(pp_id)
                                    .option_property_name
                                }(+${
                                  getOptionPropertyById(pp_id)
                                    .option_property_additional_price
                                })
                              `,
                                getDetailedProductOptionPropertyId(
                                  c.detailed_product_id
                                )
                              ),
                            ].join(", ")}
                        </div>
                        <div class="product-amount-container">
                            <input type="button" value="-" class="amount-control"/>
                            <div class="product-amount">${
                              c.cart_product_amount
                            }</div>
                            <input type="button" value="+" class="amount-control"/>
                        </div>
                    </div>
                    <div class="product-right">
                        <button value="delete">Delete</button>
                    </div>
                    </div>
                    
                    </div>
                        
                `,
                    getCartByUserId(user_id)
                  )
                )}
            </div>
            <div class="total-price-container">
                Total Price <div class="total-price">${total_price.toLocaleString(
                  "ko-KR"
                )}</div>
            </div>
        </div>
            `;
    const cartStyle = document.createElement("style");
    cartStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
  }
}
