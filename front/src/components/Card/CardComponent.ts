import { map, pipe, join, reduce } from '@fxts/core';
import styl from './styl';
import { CartType } from '../../../../models/data.interface';
import { CounterComponent } from '../Counter/CounterComponent';
import deleteCartData from '../../data/delete/cart';

export class CardComponent extends HTMLElement {
  static get componentName() {
    return 'card-component';
  }

  get product_total_price() {
    return this._product_total_price;
  }

  private cart_data: CartType;
  private _product_total_price: number = 0;
  private readonly product_price: number = 0;

  private readonly shadow_root: ShadowRoot;
  private readonly product_info_container_el: HTMLDivElement;
  private readonly product_info_left_el: HTMLDivElement;
  private readonly product_name_el: HTMLAnchorElement;
  private readonly product_option_properties_el: HTMLDivElement;
  private readonly product_info_right_el: HTMLDivElement;
  private readonly delete_btn_el: HTMLButtonElement;
  private readonly product_price_el: HTMLDivElement;
  private readonly cart_info_container_el: HTMLDivElement;
  private readonly counter_component_el: CounterComponent;
  private readonly product_total_price_el: HTMLDivElement;

  constructor(cart_data: CartType) {
    super();
    this.cart_data = cart_data;
    this.product_price =
      cart_data.detailed_product.price +
      pipe(
        cart_data.detailed_product.option_properties,
        map((op) => op.additional_price),
        reduce((a, b) => a + b),
      );
    this._product_total_price = this.product_price * cart_data.product_amount;

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.product_info_container_el = document.createElement('div');
    this.product_info_container_el.classList.add('product-info-container');

    this.product_info_left_el = document.createElement('div');
    this.product_info_left_el.classList.add('product-info-left');

    this.product_name_el = document.createElement('a');
    this.product_name_el.classList.add('product-name');
    this.product_name_el.setAttribute(
      'href',
      '../detail?product_id=${cart_data.detailed_product.product_id}',
    );
    this.product_name_el.innerHTML = cart_data.detailed_product.name;

    this.product_option_properties_el = document.createElement('div');
    this.product_option_properties_el.classList.add('product-option-properties');
    this.product_option_properties_el.innerHTML = pipe(
      cart_data.detailed_product.option_properties,
      map((op) => {
        cart_data.detailed_product.price += op.additional_price;
        return `${op.name}(+${op.additional_price})`;
      }),
      join(', '),
    );

    this.product_info_left_el.appendChild(this.product_name_el);
    this.product_info_left_el.appendChild(this.product_option_properties_el);

    this.product_info_right_el = document.createElement('div');
    this.product_info_right_el.classList.add('product-info-right');

    this.delete_btn_el = document.createElement('button');
    this.delete_btn_el.classList.add('delete-btn');
    this.delete_btn_el.setAttribute('id', 'delete-btn');
    this.delete_btn_el.innerHTML = 'X';

    this.product_price_el = document.createElement('div');
    this.product_price_el.classList.add('product-price');
    this.product_price_el.innerHTML = this.product_price.toLocaleString('ko-KR');

    this.product_info_right_el.appendChild(this.delete_btn_el);
    this.product_info_right_el.appendChild(this.product_price_el);

    this.product_info_container_el.appendChild(this.product_info_left_el);
    this.product_info_container_el.appendChild(this.product_info_right_el);

    this.cart_info_container_el = document.createElement('div');
    this.cart_info_container_el.classList.add('cart-info-container');

    customElements.get(CounterComponent.componentName) ||
      customElements.define(CounterComponent.componentName, CounterComponent);
    this.counter_component_el = new CounterComponent(this.cart_data.product_amount);

    this.product_total_price_el = document.createElement('div');
    this.product_total_price_el.classList.add('product-total-price');
    this.product_total_price_el.innerHTML = this.product_total_price.toLocaleString('ko-KR');

    this.cart_info_container_el.appendChild(this.counter_component_el);
    this.cart_info_container_el.appendChild(this.product_total_price_el);

    const card_style = document.createElement('style');
    card_style.textContent = styl;
    this.shadow_root.appendChild(card_style);

    const container_el = document.createElement('div');
    container_el.classList.add('card-container');
    container_el.appendChild(this.product_info_container_el);
    container_el.appendChild(this.cart_info_container_el);
    this.shadow_root.appendChild(container_el);

    this.delete_btn_el.addEventListener('click', () => this.deleteCard(this));
    this.counter_component_el.addEventListener('@untitled/counter_change', (e) => {
      this.updateProductTotalPrice(e.detail.changed_count);
    });
  }

  private async deleteCard(card: HTMLElement) {
    await deleteCartData({ detailed_product_id: this.cart_data.detailed_product.id });
    alert('ProductList deleted! 🗑');
    this.dispatchEvent(
      new CustomEvent('@untitled/delete_card', {
        bubbles: true,
        cancelable: true,
        composed: false,
        detail: { card },
      }),
    );
  }

  private updateProductTotalPrice(updated_count: number) {
    this._product_total_price = updated_count * this.product_price;
    this.product_total_price_el.innerHTML = this.product_total_price.toLocaleString('ko-kr');
    this.changeProductTotalPrice();
  }

  private changeProductTotalPrice() {
    this.dispatchEvent(
      new CustomEvent('@untitled/product_total_price_change', {
        bubbles: true,
        cancelable: true,
        composed: false,
      }),
    );
  }
}
