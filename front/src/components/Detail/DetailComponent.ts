import { each, filter, map, pipe, reduce } from '@fxts/core';
import join from '../../join';
import styl from './styl';
import { GetDetailType, PostDetailType } from '../../../../models/data.interface';
import { CounterComponent } from '../Counter/CounterComponent';
import postDetailData from '../../data/post/detail';

export class DetailComponent extends HTMLElement {
  private readonly shadow_root: ShadowRoot;
  private total_additional_price: Array<number> = [];
  private original_price: number = 0;
  private product_amount: number = 1;
  private data: PostDetailType = {
    user_id: 'test_c',
    product_id: 0,
    product_amount: this.product_amount,
    option_property_ids: [],
  };

  static get componentName() {
    return 'detail-component';
  }

  constructor(detail_data: GetDetailType) {
    super();
    this.data.product_id = detail_data.product.id;
    this.original_price = detail_data.product.price;
    each((o) => {
      pipe(
        o.option_properties,
        filter((op) => op.base),
        each((op) => {
          this.data.option_property_ids[o.id - 1] = op.id;
          console.log(op.id);
        }),
      );
    }, detail_data.options);

    const detailContent = `
      <div class="wrap">
        <div class="product-image"></div>
        <div class="product-info">
          <div class="product-category">
            <a class='product-big-category' href='http://localhost:8081?big_category_id=${detail_data.big_category.id}'>
              ${detail_data.big_category.name}
            </a>
            <div class='category-arrow'>></div> 
            <a class='product-small-category' href='http://localhost:8081?small_category_id=${detail_data.small_category.id}'>
            ${detail_data.small_category.name}
            </a>
          </div>
          <h2 class="product-name">${detail_data.product.name}</h2>
          <div class="product-tags">
            ${
              pipe(
                detail_data.tags,
                map(
                  (t) => `
                  <div class="tag-name">
                    # ${t.name}
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
                <div class="option-name">${o.name}</div>
                <div class="option-property-container">
                  ${pipe(
                    o.option_properties,
                    map(
                      (op) => `
                      <div class="option-property">
                        <input type="radio" value=${op.additional_price} name=${o.id} id=${op.id} ${
                        op.base ? `checked` : ``
                      } class='option-property-radio'>
                        <label for=${op.id}>${op.name}${
                        op.additional_price === 0 ? '' : `(+${op.additional_price.toLocaleString('ko-KR')})`
                      }</label>
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
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = detailContent;
    shadowRoot.appendChild(detailStyle);
    customElements.define(CounterComponent.componentName, CounterComponent);
    const count_component_el = new CounterComponent(1);
    const op_container_el = shadowRoot.getElementById('option-property-container');
    op_container_el?.appendChild(count_component_el);
  }

  connectedCallback() {
    const option_property_radio_el = this.shadow_root.querySelectorAll('input.option-property-radio');
    const count_component_el = this.shadow_root.querySelector('counter-component');
    const cart_btn_el = this.shadowRoot?.getElementById('cart-btn');
    cart_btn_el?.addEventListener('click', () => this.sendData());
    count_component_el?.addEventListener('click', () =>
      this.updateAmount((count_component_el as CounterComponent).getCount),
    );
    pipe(
      option_property_radio_el,
      map((el) => <HTMLInputElement>el),
      each((el) => {
        el.addEventListener('click', () => this.updatePrice(el));
      }),
    );
  }

  async sendData() {
    await postDetailData(this.data);
    alert('Product added to the cart! 🛒');
  }

  private updatePrice = (option_property_radio: HTMLInputElement) => {
    this.total_additional_price[+(option_property_radio.getAttribute('name') ?? 1) - 1] =
      +option_property_radio.value;
    this.data.option_property_ids[+(option_property_radio.getAttribute('name') ?? 1) - 1] =
      +option_property_radio.id;
    this.updateTotalPrice();
  };

  private updateAmount = (count: number) => {
    this.product_amount = count;
    this.data.product_amount = count;
    this.updateTotalPrice();
  };

  private updateTotalPrice = () => {
    const product_price_el = this.shadow_root.getElementById('product-price');
    product_price_el!.innerHTML = (
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
