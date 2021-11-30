import { each, filter, pipe, reduce } from '@fxts/core';
import styl from './styl';
import { CartsType } from '../../models/cart.interface';
import { CardComponent } from '../Card/CardComponent';

export class CartComponent extends HTMLElement {
  private total_price: number = 0;

  static get componentName() {
    return 'cart-component';
  }

  constructor(carts_data: CartsType) {
    super();

    const cartContent = `
      <div class="wrap">
        <h2>${carts_data.user_id}'s Cart</h2>
        <div id="cart-product-container" class="cart-product-container"></div>
        <div class="total-price-container">
            Total Price 
            <div class="total-price" id='total-price'>
              ${this.total_price.toLocaleString('ko-KR')}
            </div>
        </div>
      </div>
    `;
    const cartStyle = document.createElement('style');
    cartStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
    customElements.define(CardComponent.componentName, CardComponent);

    pipe(
      carts_data.cart,
      each((c) => {
        shadowRoot
          .getElementById('cart-product-container')
          ?.appendChild(
            new CardComponent(
              c,
              carts_data.products,
              carts_data.option_properties,
              carts_data.detailed_products_option_properties,
              carts_data.detailed_products,
            ),
          );
      }),
    );
  }

  private updateTotalPrice = (product_total_price: number[]) => {
    const product_price_el = this.shadowRoot?.getElementById('total-price');
    if (product_price_el === undefined || product_price_el === null) {
      return;
    }
    product_price_el.innerHTML = reduce(
      (a, b) => a + b,
      pipe(
        product_total_price,
        filter((a) => !isNaN(a)),
      ),
    ).toLocaleString('ko-kr');
  };
}
