import styl from './styl';
import { map, pipe, join } from '@fxts/core';
import { CartType } from '../../../../models/data.interface';
import { CounterComponent } from '../Counter/CounterComponent';
import deleteCartData from '../../data/delete/cart';

export class CardComponent extends HTMLElement {
  private cart_data: CartType;
  private product_total_price: number[] = [];
  private readonly shadow_root: ShadowRoot;
  private readonly counter_component_el: CounterComponent;

  static get componentName() {
    return 'card-component';
  }
  get productTotalPrice() {
    return this.product_total_price;
  }
  constructor(cart_data: CartType) {
    super();
    this.cart_data = cart_data;
    this.product_total_price.push(cart_data.detailed_product.price * cart_data.product_amount);
    const cardContent = `
      <div class="wrap" id='wrap'>
        <div class="product-container">
          <div class="product">
            <div class="product-left">
              <a href="../detail?product_id=${cart_data.detailed_product.product_id}" class="product-name">
                ${cart_data.detailed_product.name}
              </a>
              <div class="product-option-property">
                ${pipe(
                  cart_data.detailed_product.option_properties,
                  map((op) => {
                    cart_data.detailed_product.price += op.additional_price;
                    return `${op.name}(+${op.additional_price})`;
                  }),
                  join(', '),
                )}
              </div>
            </div>
            <div class="product-right">
              <button name="${cart_data.detailed_product.id}" class='delete' id='delete-btn'>X</button>
              <div class="price">${cart_data.detailed_product.price.toLocaleString('ko-KR')}</div>
            </div>
          </div>
          <div class="cart-product">
            <div class="amount-container" id=${cart_data.detailed_product.id}>
            ${cart_data.product_amount}
            </div>
            <div class="product-total-price" id='product-total-price'>
              ${(cart_data.detailed_product.price * cart_data.product_amount).toLocaleString('ko-KR')}
            </div>
          </div>
        </div>
      </div>
    `;

    const cardStyle = document.createElement('style');
    cardStyle.textContent = styl;
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = cardContent;
    shadowRoot.appendChild(cardStyle);
    customElements.get(CounterComponent.componentName) ||
      customElements.define(CounterComponent.componentName, CounterComponent);
    this.counter_component_el = new CounterComponent(this.cart_data.product_amount);
    const amount_container_el = shadowRoot.querySelector('div.amount-container');
    amount_container_el?.replaceWith(this.counter_component_el);
  }

  connectedCallback() {
    const delete_btn_el = this.shadowRoot?.getElementById('delete-btn');
    delete_btn_el?.addEventListener('click', () => this.deleteCard());
    this.counter_component_el?.addEventListener('click', () =>
      this.updateProductTotalPrice(this.counter_component_el.getCount),
    );
  }

  private async deleteCard() {
    await deleteCartData({ detailed_product_id: this.cart_data.detailed_product.id });
    alert('Product deleted! 🗑');
    this.parentNode?.removeChild(this);
  }

  private updateProductTotalPrice(count: number) {
    const product_total_price_el = this.shadow_root.getElementById('product-total-price');
    product_total_price_el!.innerHTML = (count * this.cart_data.detailed_product.price).toLocaleString(
      'ko-kr',
    );
  }
}
