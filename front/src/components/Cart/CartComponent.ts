import { CARTS } from "../../sample-data/carts";
import { PRODUCTS } from "../../sample-data/products";
import { OPTION_PROPERTIES } from "../../sample-data/option_properties";
import { DETAILED_PRODUCTS } from "../../sample-data/detailed_products";
import { DETAILED_PRODUCTS_OPTION_PROPERTIES } from "../../sample-data/detailed_products_option_properties";
import { filter, map, pipe } from "fxts-test";

const getCart = (user_id: string) => [
  ...pipe(
    CARTS,
    filter((c) => (c.user_id == user_id ? c : null))
  ),
];

const getDetailedProduct = (detailed_product_id: number) =>
  DETAILED_PRODUCTS[detailed_product_id - 1];

const getProductName = (product_id: number) =>
  PRODUCTS[product_id - 1].product_name;

const getDetailedProductOptionPropertyId = (detailed_product_id: number) => [
  ...pipe(
    DETAILED_PRODUCTS_OPTION_PROPERTIES,
    filter((d) => (d.detailed_product_id == detailed_product_id ? d : null)),
    map((d) => d.option_property_id)
  ),
];

const getOptionProperty = (option_property_id: number) =>
  OPTION_PROPERTIES[option_property_id - 1];

export class CartComponent extends HTMLElement {
  static get componentName() {
    return "cart-component";
  }

  constructor(user_id: string) {
    super();

    const cartContent = `
        <div class="wrap">
            <h2>${user_id}'s Cart</h2>
            <hr class="cart-start"/>
            <div class="cart-product-container">
                ${[
                  ...map(
                    (c) => `
                    <div class="cart-product">
                        <a href="../detail?product_id=${
                          getDetailedProduct(c.detailed_product_id).product_id
                        }" class="product-name">${getProductName(
                      getDetailedProduct(c.detailed_product_id).product_id
                    )}</a>
                        <div class="product-option-property">
                            ${[
                              ...map(
                                (pp_id) => `
                                ${
                                  getOptionProperty(pp_id).option_property_name
                                }(+${
                                  getOptionProperty(pp_id)
                                    .option_property_additional_price
                                })
                              `,
                                getDetailedProductOptionPropertyId(
                                  c.detailed_product_id
                                )
                              ),
                            ].join(", ")}
                        </div>
                        <div class="product-amount">${
                          c.cart_product_amount
                        }</div>
                    </div>
                `,
                    getCart(user_id)
                  ),
                ].join("")}
            </div>
        </div>
            `;
    const cartStyle = document.createElement("style");
    cartStyle.textContent = `
        .cart-start {
            border: 1.4px solid black;
        }
        .cart-product {
          display: flex;
          flex-flow: column;
          flex: 1;
          height: 6rem;
          border: 1px solid black;
          margin-bottom: 1rem;
          padding: 1rem;
        }
        .product-name {
            font-size: 1.6em;
            margin-bottom: 0.6rem;
        }
        .product-option-property {
            opacity: 60%;
        }
        .product-amount {
          display: flex;
          align-self: flex-end;
          justify-self: flex-end;
        }
    `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
  }
}
