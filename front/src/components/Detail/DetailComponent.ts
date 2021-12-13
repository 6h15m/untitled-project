import { each, filter, pipe, reduce, toArray } from '@fxts/core';
import styl from './styl';
import { GetDetailType, PostDetailType } from '../../../../models/data.interface';
import { CounterComponent } from '../Counter/CounterComponent';
import postDetailData from '../../data/post/detail';
import { DetailDefaultInfoComponent } from '../DetailDefaultInfo/DetailDefaultInfo';

export class DetailComponent extends HTMLElement {
  static get componentName() {
    return 'detail-component';
  }

  private detail_data: GetDetailType;
  private additional_prices: Array<number> = [];
  private original_price: number = 0;
  private product_amount: number = 1;

  private readonly shadow_root: ShadowRoot;
  private readonly image_el: HTMLDivElement;
  private readonly info_container_el: HTMLDivElement;
  private readonly top_container_el: HTMLDivElement;
  private readonly options_container_el: HTMLDivElement;
  private readonly option_property_radio_els: Array<HTMLInputElement>;
  private readonly ea_container_el: HTMLDivElement;
  private readonly ea_name_el: HTMLDivElement;
  private readonly ea_counter_el: CounterComponent;
  private readonly bottom_container_el: HTMLDivElement;
  private readonly price_el: HTMLDivElement;
  private readonly to_cart_btn_el: HTMLButtonElement;

  private data: PostDetailType = {
    user_id: 'test_c',
    product_id: 0,
    product_amount: this.product_amount,
    option_property_ids: [],
  };

  constructor(detail_data: GetDetailType) {
    super();

    this.detail_data = detail_data;
    this.option_property_radio_els = [];
    this.data.product_id = detail_data.product.id;
    this.original_price = detail_data.product.price;
    each((option) => {
      pipe(
        option.option_properties,
        filter((option_property) => option_property.base),
        each((option_property) => {
          this.data.option_property_ids[option.id - 1] = option_property.id;
        }),
      );
    }, detail_data.options);

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.image_el = document.createElement('div');
    this.image_el.classList.add('image');

    this.info_container_el = document.createElement('div');
    this.info_container_el.classList.add('info-container');

    this.top_container_el = document.createElement('div');
    this.top_container_el.classList.add('top-container');

    this.options_container_el = document.createElement('div');
    this.options_container_el.classList.add('options-container');

    each((option) => {
      const option_el = document.createElement('div');
      option_el.classList.add('option');

      const option_name_el = document.createElement('div');
      option_name_el.classList.add('option-name');
      option_name_el.innerHTML = option.name;

      const option_properties_container_el = document.createElement('div');
      option_properties_container_el.classList.add('option-properties-container');
      each((option_property) => {
        const option_property_el = document.createElement('div');
        option_property_el.classList.add('option-property');

        const option_property_radio_el = document.createElement('input');
        option_property_radio_el.setAttribute('type', 'radio');
        option_property_radio_el.setAttribute('name', `${option.id}`);
        option_property_radio_el.setAttribute('id', `${option_property.id}`);
        option_property_radio_el.setAttribute('value', `${option_property.additional_price}`);
        option_property.base ? option_property_radio_el.setAttribute('checked', '') : '';
        option_property_radio_el.classList.add('option-property-radio');

        const option_property_label_el = document.createElement('label');
        option_property_label_el.setAttribute('for', `${option_property.id}`);
        option_property_label_el.innerHTML = `${option_property.name}${
          option_property.additional_price === 0
            ? ''
            : `(+${option_property.additional_price.toLocaleString('ko-KR')})`
        }`;

        option_property_el.appendChild(option_property_radio_el);
        option_property_el.appendChild(option_property_label_el);

        this.option_property_radio_els.push(option_property_radio_el);

        option_properties_container_el.appendChild(option_property_el);
      }, option.option_properties);

      option_el.appendChild(option_name_el);
      option_el.appendChild(option_properties_container_el);

      this.options_container_el.appendChild(option_el);
    }, detail_data.options);

    this.ea_container_el = document.createElement('div');
    this.ea_container_el.classList.add('option');

    this.ea_name_el = document.createElement('div');
    this.ea_name_el.classList.add('option-name');
    this.ea_name_el.innerHTML = 'EA';

    customElements.get(CounterComponent.componentName) ||
      customElements.define(CounterComponent.componentName, CounterComponent);
    this.ea_counter_el = new CounterComponent(1);
    this.ea_container_el.appendChild(this.ea_name_el);
    this.ea_container_el.appendChild(this.ea_counter_el);

    this.options_container_el.appendChild(this.ea_container_el);

    customElements.get(DetailDefaultInfoComponent.componentName) ||
      customElements.define(DetailDefaultInfoComponent.componentName, DetailDefaultInfoComponent);
    this.top_container_el.appendChild(new DetailDefaultInfoComponent(detail_data));
    this.top_container_el.appendChild(this.options_container_el);

    this.bottom_container_el = document.createElement('div');
    this.bottom_container_el.classList.add('bottom-container');

    this.price_el = document.createElement('div');
    this.price_el.classList.add('price');
    this.price_el.innerHTML = detail_data.product.price.toLocaleString('ko-kr');

    this.to_cart_btn_el = document.createElement('button');
    this.to_cart_btn_el.classList.add('to-cart-btn');
    this.to_cart_btn_el.innerHTML = 'Add to Cart';

    this.bottom_container_el.appendChild(this.price_el);
    this.bottom_container_el.appendChild(this.to_cart_btn_el);

    this.info_container_el.appendChild(this.top_container_el);
    this.info_container_el.appendChild(this.bottom_container_el);

    const detail_style = document.createElement('style');
    detail_style.textContent = styl;
    this.shadow_root.appendChild(detail_style);

    const container_el = document.createElement('div');
    container_el.classList.add('detail-container');
    container_el.appendChild(this.image_el);
    container_el.appendChild(this.info_container_el);
    this.shadow_root.appendChild(container_el);

    this.to_cart_btn_el.addEventListener('click', () => this.sendData());
    this.ea_counter_el.addEventListener('click', () => this.updateAmount(this.ea_counter_el.count));
    each((el) => {
      el.addEventListener('click', () => this.updatePrice(el));
    }, this.option_property_radio_els);
  }

  async sendData() {
    this.data.option_property_ids = pipe(
      this.data.option_property_ids,
      filter((id) => id != null),
      toArray,
    );
    await postDetailData(this.data);
    alert('Product added to the cart! 🛒');
  }

  private updatePrice = (option_property_radio_el: HTMLInputElement) => {
    this.additional_prices[+(option_property_radio_el.getAttribute('name') ?? 1) - 1] =
      +option_property_radio_el.value;
    this.data.option_property_ids[+(option_property_radio_el.getAttribute('name') ?? 1) - 1] =
      +option_property_radio_el.id;
    this.updateTotalPrice();
  };

  private updateAmount = (count: number) => {
    this.product_amount = count;
    this.data.product_amount = count;
    this.updateTotalPrice();
  };

  private updateTotalPrice = () => {
    this.price_el.innerHTML = (
      (this.detail_data.product.price +
        (pipe(
          this.additional_prices,
          filter((a) => !isNaN(a)),
          reduce((a, b) => a + b),
        ) ?? 0)) *
      this.product_amount
    ).toLocaleString('ko-kr');
  };
}
