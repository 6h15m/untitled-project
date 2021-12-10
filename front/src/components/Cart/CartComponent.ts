import { each, filter, map, pipe, reduce, toArray } from '@fxts/core';
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
    this.isCartEmpty();
    this.updateTotalPrice(this.getProductTotalPrices());

    const card_component_els = this.shadow_root.querySelectorAll(
      'card-component',
    ) as NodeListOf<CardComponent>;
    each((el) => {
      el.addEventListener('@untitled/product_total_price_change', (e: CustomEvent<number>) => {
        this.updateTotalPrice(this.getProductTotalPrices());
      });
      el.addEventListener('@untitled/delete_card', (e: CustomEvent<HTMLElement>) => {
        this.isCartEmpty();
        this.updateTotalPrice(this.getProductTotalPrices());
      });
    }, card_component_els);
  }

  private static addNoProductNotice(cart_product_container_el: HTMLElement) {
    const notice = document.createElement('div');
    notice.setAttribute('id', 'notice');
    notice.setAttribute('class', 'notice');
    const notice_content = document.createTextNode('Oops! Your cart is empty! 😞');
    notice.appendChild(notice_content);
    cart_product_container_el.appendChild(notice);
  }

  isCartEmpty() {
    const cart_product_container_el = this.shadow_root.getElementById('cart-product-container');
    if (cart_product_container_el?.hasChildNodes()) {
      const notice_el = this.shadow_root.getElementById('notice');
      if (notice_el) this.shadow_root.removeChild(notice_el);
      return;
    } else {
      CartComponent.addNoProductNotice(cart_product_container_el!);
    }
  }

  private getProductTotalPrices = () =>
    pipe(
      this.shadow_root.getElementById('cart-product-container')?.childNodes as NodeListOf<CardComponent>,
      map((a) => a.product_total_price),
      toArray,
    );

  private updateTotalPrice = (product_total_price: number[]) => {
    console.log('update total price');
    if (product_total_price.length !== 0) {
      this.total_price = reduce(
        (a, b) => a + b,
        pipe(
          product_total_price,
          filter((a) => !isNaN(a)),
        ),
      );
    } else {
      this.total_price = 0;
    }
    console.log(this.total_price);
    this.shadow_root.getElementById('total-price')!.innerHTML = this.total_price
      ? this.total_price.toLocaleString('ko-kr')
      : `${0}`;
  };
}
