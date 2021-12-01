import styl from './styl';
import { ProductType } from '../../models/product.interface';
import { filter, map, pipe, take, toArray, head } from '@fxts/core';
import { OptionPropertyType } from '../../models/detail.interface';
import {
  CartType,
  DetailedProductOptionPropertyType,
  DetailedProductType,
} from '../../models/cart.interface';
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
  constructor(
    cart: CartType,
    products: Array<ProductType>,
    option_properties: Array<OptionPropertyType>,
    detailed_products_option_properties: Array<DetailedProductOptionPropertyType>,
    detailed_products: Array<DetailedProductType>,
  ) {
    super();

    const getProductById = (product_id: number) =>
      pipe(
        products,
        filter((p) => p.product_id === product_id),
        head,
      );

    const getProductByDetailedProductId = (detailed_product_id: number) =>
      getProductById(
        pipe(
          detailed_products,
          filter((dp) => dp.detailed_product_id === detailed_product_id),
          head,
        )!.product_id,
      );

    const getOptionPropertyById = (option_property_id: number) =>
      pipe(
        option_properties,
        filter((p) => p.option_property_id === option_property_id),
        take(1),
      );

    const getDetailedProductOptionPropertyId = (detailed_product_id: number) =>
      pipe(
        detailed_products_option_properties,
        filter((d) => (d.detailed_product_id === detailed_product_id ? d : null)),
        map((d) => d.option_property_id),
        toArray,
      );

    const product: ProductType = getProductByDetailedProductId(cart.detailed_product_id)!;
    this.detailed_product_id = cart.detailed_product_id;
    this.product_total_price.push(product.product_price * cart.cart_product_amount);
    const cardContent = `
      <div class="wrap" id='wrap'>
        <div class="product-container">
          <div class="product">
            <div class="product-left">
              <a href="../detail?product_id=${product.product_id}" class="product-name">
                ${product.product_name}
              </a>
              <div class="product-option-property">
                ${pipe(
                  getDetailedProductOptionPropertyId(cart.detailed_product_id),
                  map((pp_id) => {
                    const option_property = getOptionPropertyById(pp_id).next().value;
                    product.product_price += option_property.option_property_additional_price;
                    return `${option_property.option_property_name}(+${option_property.option_property_additional_price})`;
                  }),
                  join(', '),
                )}
              </div>
            </div>
            <div class="product-right">
              <button name="${product.product_id}" class='delete' id='delete-btn'>X</button>
              <div class="price">${product.product_price.toLocaleString('ko-KR')}</div>
            </div>
          </div>
          <div class="cart-product">
            <div class="amount-container" id=${cart.detailed_product_id}>
            ${cart.cart_product_amount}
            </div>
            <div class="product-total-price">
              ${(product.product_price * cart.cart_product_amount).toLocaleString('ko-KR')}
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
    // loader start
    await deleteCartData({ detailed_product_id: this.detailed_product_id });
    // loader end
    this.parentNode?.removeChild(this);
  }
}
