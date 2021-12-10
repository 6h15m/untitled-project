import { each, filter, map, pipe, reduce, toArray } from '@fxts/core';
import styl from './styl';
import { GetCartsType } from '../../../../models/data.interface';
import { CardComponent } from '../Card/CardComponent';

export class CartComponent extends HTMLElement {
  static get componentName() {
    return 'cart-component';
  }
  private carts_data: GetCartsType;
  private total_price: number = 0;

  private readonly shadow_root: ShadowRoot;
  private readonly cart_name_el: HTMLHeadingElement;
  private readonly notice_el: HTMLDivElement;
  private readonly cards_container_el: HTMLDivElement;
  private card_component_els: Array<CardComponent>;
  private readonly total_price_container_el: HTMLDivElement;
  private readonly total_price_el: HTMLDivElement;

  constructor(carts_data: GetCartsType) {
    super();
    this.carts_data = carts_data;
    this.card_component_els = [];
    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.cart_name_el = document.createElement('h2');
    this.cart_name_el.innerHTML = `${carts_data.user_id}'s Cart`;

    this.cards_container_el = document.createElement('div');
    customElements.define(CardComponent.componentName, CardComponent);
    pipe(
      carts_data.carts,
      each((cart) => {
        const card_component_el = new CardComponent(cart);
        this.card_component_els.push(card_component_el);
        this.cards_container_el.appendChild(card_component_el);
      }),
    );

    this.notice_el = document.createElement('div');
    this.notice_el.setAttribute('class', 'notice');
    this.notice_el.innerHTML = 'Oops! Your cart is empty! 😞';

    this.total_price_container_el = document.createElement('div');
    this.total_price_container_el.classList.add('total-price-container');
    this.total_price_container_el.innerHTML = 'Total Price';

    this.total_price_el = document.createElement('div');
    this.total_price_el.classList.add('total-price');
    this.total_price_el.innerHTML = this.total_price.toLocaleString('ko-KR');

    this.total_price_container_el.appendChild(this.total_price_el);

    const cart_style = document.createElement('style');
    cart_style.textContent = styl;
    this.shadow_root.appendChild(cart_style);

    const container_el = document.createElement('div');
    container_el.classList.add('cart-container');
    container_el.appendChild(this.cart_name_el);
    container_el.appendChild(this.notice_el);
    container_el.appendChild(this.cards_container_el);
    container_el.appendChild(this.total_price_container_el);
    this.shadow_root.appendChild(container_el);

    this.checkCartEmpty();
    this.updateTotalPrice(this.getProductTotalPrices());

    if (this.card_component_els.length !== 0) {
      each((el) => {
        el.addEventListener('@untitled/product_total_price_change', () => {
          this.updateTotalPrice(this.getProductTotalPrices());
        });
        el.addEventListener('@untitled/delete_card', (e) => {
          this.card_component_els = pipe(
            this.card_component_els,
            filter((card_el) => card_el !== e.detail.card),
            toArray,
          );
          e.detail.card.remove();
          this.checkCartEmpty();
          this.updateTotalPrice(this.getProductTotalPrices());
        });
      }, this.card_component_els);
    }
  }

  private checkCartEmpty() {
    if (this.cards_container_el.hasChildNodes()) {
      this.notice_el.setAttribute('style', 'display: none');
      return;
    } else {
      this.notice_el.setAttribute('style', 'display: flex');
    }
  }

  private getProductTotalPrices = () =>
    pipe(
      this.card_component_els,
      map((el) => el.product_total_price),
      toArray,
    );

  private updateTotalPrice = (product_total_price: number[]) => {
    if (product_total_price.length !== 0) {
      this.total_price = reduce((a, b) => a + b, product_total_price);
    } else {
      this.total_price = 0;
    }
    this.total_price_el.innerHTML = this.total_price.toLocaleString('ko-kr');
  };
}
