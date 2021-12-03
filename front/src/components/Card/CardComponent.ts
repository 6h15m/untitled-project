import styl from './styl';
import { map, pipe } from '@fxts/core';
import { CartType } from '../../../../models/data.interface';
import join from '../../join';
import { CounterComponent } from '../Counter/CounterComponent';
import deleteCartData from '../../data/delete/cart';

export class CardComponent extends HTMLElement {
  private product_total_price: number[] = [];
  private readonly detailed_product_id: number;
  private readonly shadow_root: ShadowRoot;

  static get componentName() {
    return 'card-component';
  }
  get productTotalPrice() {
    return this.product_total_price;
  }
  constructor(cart: CartType) {
    super();
    this.detailed_product_id = cart.detailed_product.id;
    this.product_total_price.push(cart.detailed_product.price * cart.product_amount);
    const cardContent = `
      <div class="wrap" id='wrap'>
        <div class="product-container">
          <div class="product">
            <div class="product-left">
              <a href="../detail?product_id=${cart.detailed_product.id}" class="product-name">
                ${cart.detailed_product.name}
              </a>
              <div class="product-option-property">
                ${pipe(
                  cart.detailed_product.option_properties,
                  map((op) => {
                    cart.detailed_product.price += op.additional_price;
                    return `${op.name}(+${op.additional_price})`;
                  }),
                  join(', '),
                )}
              </div>
            </div>
            <div class="product-right">
              <button name="${cart.detailed_product.id}" class='delete' id='delete-btn'>X</button>
              <div class="price">${cart.detailed_product.price.toLocaleString('ko-KR')}</div>
            </div>
          </div>
          <div class="cart-product">
            <div class="amount-container" id=${cart.detailed_product.id}>
            ${cart.product_amount}
            </div>
            <div class="product-total-price">
              ${(cart.detailed_product.price * cart.product_amount).toLocaleString('ko-KR')}
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
    const amount_container_el = shadowRoot.querySelector('div.amount-container');
    amount_container_el?.replaceWith(new CounterComponent(+amount_container_el.innerHTML));
  }

  connectedCallback() {
    const delete_btn_el = this.shadowRoot?.getElementById('delete-btn');
    if (!delete_btn_el) {
      return;
    }
    delete_btn_el.addEventListener('click', () => this.deleteCard());
  }

  public async deleteCard() {
    await deleteCartData({ detailed_product_id: this.detailed_product_id });
    alert('Product deleted! 🗑');
    this.parentNode?.removeChild(this);
  }
}
