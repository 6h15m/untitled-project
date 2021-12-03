import { each, filter, pipe, reduce } from '@fxts/core';
import styl from './styl';
import { CardComponent } from '../Card/CardComponent';
import { GetCartsType } from '../../../../models/data.interface';

export class CartComponent extends HTMLElement {
  private total_price: number = 0;
  private readonly shadow_root: ShadowRoot;

  static get componentName() {
    return 'cart-component';
  }

  constructor(carts_data: GetCartsType) {
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
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
    customElements.define(CardComponent.componentName, CardComponent);

    pipe(
      carts_data.carts,
      each((c) => {
        shadowRoot.getElementById('cart-product-container')?.appendChild(new CardComponent(c));
      }),
    );
  }

  connectedCallback() {
    const cart_product_container_el = this.shadow_root.getElementById('cart-product-container');
    if (cart_product_container_el?.hasChildNodes()) {
      const notice_el = this.shadow_root.getElementById('notice');
      if (notice_el) this.shadow_root.removeChild(notice_el);
      return;
    } else {
      CartComponent.addNoProductNotice(cart_product_container_el!);
    }
  }

  private static addNoProductNotice(cart_product_container_el: HTMLElement) {
    const notice = document.createElement('div');
    notice.setAttribute('id', 'notice');
    notice.setAttribute('class', 'notice');
    const notice_content = document.createTextNode('Oops! Your cart is empty! 😞');
    notice.appendChild(notice_content);
    cart_product_container_el.appendChild(notice);
  }

  private updateTotalPrice = (product_total_price: number[]) => {
    const product_price_el = this.shadow_root.getElementById('total-price');
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
