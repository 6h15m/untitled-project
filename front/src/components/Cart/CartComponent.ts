import { map } from '@fxts/core';
import { join, sumAll } from '../../common';
import {
  getCartByUserId,
  getDetailedProductOptionPropertyId,
  getOptionPropertyById,
  getProductIDByDetailedProductId,
  getProductNameByDetailedProductId,
  getProductPriceByDetailedProductId,
} from '../../common-db';
import styl from './styl';

export class CartComponent extends HTMLElement {
  static get componentName() {
    return 'cart-component';
  }

  constructor(user_id: string) {
    super();
    let total_price = 0; // TODO: 변수를 없애고 싶다
    let product_total_price: number[] = [];
    const cartContent = `
      <div class="wrap">
        <h2>${user_id}'s Cart</h2>
        <div class="cart-product-container">
          ${join(
            map((c) => {
              let price = getProductPriceByDetailedProductId(c.detailed_product_id); // TODO: 변수를 없애고 싶다
              return `
                <div class="cart-product">
                  <input type="checkbox" class="product-check" value=${c.detailed_product_id}/>
                  <div class="product-container">
                    <div class="product">
                      <div class="product-left">
                        <a href="../detail?product_id=${getProductIDByDetailedProductId(
                          c.detailed_product_id,
                        )}" class="product-name">
                          ${getProductNameByDetailedProductId(c.detailed_product_id)}
                        </a>
                        <div class="product-option-property">
                          ${join(
                            map((pp_id) => {
                              price += getOptionPropertyById(pp_id).option_property_additional_price;
                              return `${getOptionPropertyById(pp_id).option_property_name}(+${
                                getOptionPropertyById(pp_id).option_property_additional_price
                              })`;
                            }, getDetailedProductOptionPropertyId(c.detailed_product_id)),
                            ', ',
                          )}
                        </div>
                      </div>
                      <div class="product-right">
                        <button value="delete">Delete</button>
                        <div class="price">${price}</div>
                      </div>
                    </div>
                    <div class="cart-product">
                      <div class="product-amount-container">
                        <input type="button" value="-" class="amount-control"/>
                        <div class="product-amount">${c.cart_product_amount}</div>
                        <input type="button" value="+" class="amount-control"/>
                      </div>
                      <div class="product-total-price">
                        <!--TODO: 조금 더 아름다운 방법을 고민해보자-->
                        <div class="none">${product_total_price.push(price * c.cart_product_amount)}</div> 
                        ${price * c.cart_product_amount}
                      </div>
                    </div>
                  </div>
                </div>`;
            }, getCartByUserId(user_id)),
          )}
            </div>
            <div class="total-price-container">
              <!--TODO: 조금 더 아름다운 방법을 고민해보자-->
              <div class="none">${total_price = sumAll(product_total_price)}</div>
                Total Price <div class="total-price">${total_price.toLocaleString('ko-KR')}</div>
            </div>
        </div>`;
    const cartStyle = document.createElement('style');
    cartStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
  }
}
