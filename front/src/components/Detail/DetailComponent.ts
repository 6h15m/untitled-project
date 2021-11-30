import { each, filter, map, pipe, reduce } from '@fxts/core';
import join from '../../join';
import styl from './styl';
import { DetailType, SendDetailType } from '../../models/detail.interface';
import { CounterComponent } from '../Counter/CounterComponent';
import postDetailData from '../../data/post/detail';

export class DetailComponent extends HTMLElement {
  private total_additional_price: Array<number> = [];
  private original_price: number = 0;
  private product_amount: number = 1;
  private data: SendDetailType = {
    user_id: 'test_c',
    product_id: 0,
    product_amount: this.product_amount,
    option_property_ids: [],
  };

  static get componentName() {
    return 'detail-component';
  }

  async sendData() {
    alert('Product added to the cart! 🛒')
    await postDetailData(this.data);
  }

  constructor(detail_data: DetailType) {
    super();
    const getAdditionalPrice = (additional_price: number) =>
      additional_price === 0 ? '' : `(+${additional_price.toLocaleString('ko-KR')})`;

    this.data.product_id = detail_data.product.product_id;
    this.original_price = detail_data.product.product_price;
    each((o) => {
      pipe(
        detail_data.option_properties_all,
        filter((op) => op.option_id === o.option_id && op.option_property_base),
        each((op) => {
          this.data.option_property_ids[o.option_id - 1] = (op.option_property_id);
          console.log(op.option_property_id);
        }),
      );
    }, detail_data.options);
    const detailContent = `
      <div class="wrap">
        <div class="product-image"></div>
        <div class="product-info">
          <div class="product-category">${detail_data.big_category.big_category_name} > ${
      detail_data.small_category.small_category_name
    }
          </div>
          <h2 class="product-name">${detail_data.product.product_name}</h2>
          <div class="product-tags">
            ${
              pipe(
                detail_data.tags,
                map(
                  (t) => `
                  <div class="tag-name">
                    # ${t.tag_name}
                  </div>
                  `,
                ),
                join(''),
              ) ?? ''
            }
          </div>
          <div class="product-options">
            ${pipe(
              detail_data.options,
              map(
                (o) => `
                <div class="option-name">${o.option_name}</div>
                <div class="option-property-container">
                  ${pipe(
                    detail_data.option_properties_all,
                    filter((all) => all.option_id === o.option_id),
                    map(
                      (op) => `
                      <div class="option-property">
                        <input type="radio" value=${op.option_property_additional_price} name=${
                        o.option_id
                      } id=${op.option_property_id} ${
                        op.option_property_base ? `checked` : ``
                      } class='option-property-radio'>
                        <label for=${op.option_property_id}>${op.option_property_name}${getAdditionalPrice(
                        op.option_property_additional_price,
                      )}</label>
                      </div>
                      `,
                    ),
                    join(''),
                  )}
                </div>
              `,
              ),
              join(''),
            )}
            <div class="option-name">EA</div>
            <div class="option-property-container" id="option-property-container">
            </div>
          </div>
          <div class="product-bottom">
            <div class="product-price" id="product-price">
              ${this.original_price.toLocaleString('ko-kr')}
            </div>
            <button class="cart-btn" id="cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    const detailStyle = document.createElement('style');
    detailStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = detailContent;
    shadowRoot.appendChild(detailStyle);
    customElements.define(CounterComponent.componentName, CounterComponent);
    const count_component_el = new CounterComponent(1);
    const op_container_el = shadowRoot.getElementById('option-property-container');
    op_container_el?.appendChild(count_component_el);
  }

  connectedCallback() {
    const option_property_radio_el = this.shadowRoot?.querySelectorAll('input.option-property-radio');
    const count_component_el: CounterComponent | null | undefined =
      this.shadowRoot?.querySelector('counter-component');
    const cart_btn_el = this.shadowRoot?.getElementById('cart-btn');
    if (
      count_component_el === null ||
      count_component_el === undefined ||
      option_property_radio_el === null ||
      option_property_radio_el === undefined ||
      cart_btn_el === null ||
      cart_btn_el === undefined
    ) {
      return;
    }
    cart_btn_el.addEventListener('click', () => this.sendData());
    count_component_el.addEventListener('click', () => this.updateAmount(count_component_el.getCount));
    pipe(
      option_property_radio_el,
      map((el) => <HTMLInputElement>el),
      each((el) => {
        el.addEventListener('click', () => this.updatePrice(el));
      }),
    );
  }

  private updatePrice = (option_property_radio: HTMLInputElement) => {
    this.total_additional_price[+(option_property_radio.getAttribute('name') ?? 1) - 1] =
      +option_property_radio.value;
    this.data.option_property_ids[+(option_property_radio.getAttribute('name') ?? 1) - 1] = +option_property_radio.id;
    this.updateTotalPrice();
  };

  private updateAmount = (count: number) => {
    this.product_amount = count;
    this.data.product_amount = count;
    this.updateTotalPrice();
  };

  private updateTotalPrice = () => {
    const product_price_el = this.shadowRoot?.getElementById('product-price');
    if (product_price_el === null || product_price_el === undefined) {
      return;
    }
    product_price_el.innerHTML = (
      (this.original_price +
        (pipe(
          this.total_additional_price,
          filter((a) => !isNaN(a)),
          reduce((a, b) => a + b),
        ) ?? 0)) *
      this.product_amount
    ).toLocaleString('ko-kr');
  };
}
