import { map } from "fxts-test";
import { join } from "../../common";
import {
  getCartByUserId,
  getDetailedProductById,
  getProductNameById,
  getDetailedProductOptionPropertyId,
  getOptionPropertyById,
} from "../../common-db";

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
    cartStyle.textContent = `
        .wrap {
            display: flex;
            flex-direction: column;
        }
        .cart-start {
            border: 1.4px solid black;
        }
        .cart-product {
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: space-between;
        }
        .product-check {
            margin-right: 1rem;
        }
        .product {
          display: flex;
          flex-flow: row;
          flex: 1;
          height: 6rem;
          border: 1px solid black;
          margin-bottom: 1rem;
          justify-content: space-between;
          padding: 1.4rem;
        }
        .product-name {
            font-size: 1.4em;
            font-weight: 600;
            text-decoration: none;
            margin-bottom: 0.6rem;
        }
        .product-option-property {
            opacity: 60%;
        }
        .product-amount-container {
            display: flex;
            flex-direction: row;
            width: 6rem;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
        }
        .product-amount {
        }
        .amount-control {
            width: 1.4rem;
        }
        .total-price-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 1em;
            align-self: flex-end;
        }
        .total-price {
            margin-left: 0.6rem;
            font-weight: 600;
            font-size: 1.8em;
        }
    `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
  }
}
