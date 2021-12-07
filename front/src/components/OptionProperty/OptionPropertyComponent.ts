import styl from './styl';
import { each, map, pipe, toArray } from '@fxts/core';

export class OptionPropertyComponent extends HTMLElement {
  private readonly shadow_root: ShadowRoot;

  static get componentName() {
    return 'option-property-component';
  }

  constructor() {
    super();
    const optionPropertyContent = `
      <div class="wrap" id="option-properties-container">
        <h4>Option Properties</h4>
        <div class="option-property">
          <div class='property-base-container'>
            <h5>Base Property</h5>
            <input type='radio' name='base' checked/>
          </div>
          <div class="property-name-container">
            <h5>Property Name</h5>
            <input type="text" class="property-input"/>
          </div>
          <div class="additional-price-container">
            <h5>Additional Price</h5>
            <input type="number" class="property-input" placeholder='0'/>
          </div>
        </div>
        <input type="button" value="+" class="add-btn" id="add-option-property-btn"/>  
      </div>
    `;

    const optionPropertyStyle = document.createElement('style');
    optionPropertyStyle.textContent = styl;
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = optionPropertyContent;
    shadowRoot.appendChild(optionPropertyStyle);
  }

  connectedCallback() {
    const add_option_property_btn_el = this.shadow_root.getElementById('add-option-property-btn');
    const option_properties_container_el = this.shadow_root.getElementById('option-properties-container');
    add_option_property_btn_el?.addEventListener('click', () => {
      OptionPropertyComponent.addOptionProperty(
        option_properties_container_el as HTMLElement,
        add_option_property_btn_el as HTMLElement,
      );
    });
  }

  checkNullValue = () => {
    const input_els = this.shadow_root.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    pipe(
      input_els,
      each((el) => {
        if (!el.value) {
          throw 'Unfilled Field';
        }
      }),
    );
    return true;
  };

  private static addOptionProperty(
    option_properties_container_el: HTMLElement,
    add_option_property_btn_el: HTMLElement,
  ) {
    const createOptionProperty = document.createElement('div');
    createOptionProperty.className = 'option-property';
    createOptionProperty.innerHTML = `
      <div class='property-base-container'>
        <h5>Base Property</h5>
        <input type='radio' name='base'/>
      </div>
      <div class="property-name-container">
        <h5>Property Name</h5>
        <input type="text" class="property-input" name='name'/>
      </div>
      <div class="additional-price-container">
        <h5>Additional Price</h5>
        <input type="number" class="property-input" placeholder='0' name='additional-price'/>
      </div>`;
    option_properties_container_el.insertBefore(createOptionProperty, add_option_property_btn_el);
  }

  getOptionPropertyData() {
    const option_property_els = this.shadow_root.querySelectorAll('div.option-property');
    return pipe(
      option_property_els,
      map((el) => ({
        base:
          (
            el.querySelector('div.property-base-container')?.querySelector('input') as HTMLInputElement
          )?.hasAttribute('checked') ?? false,
        name:
          (el.querySelector('div.property-name-container')?.querySelector('input') as HTMLInputElement)
            ?.value ?? '',
        additional_price:
          +(el.querySelector('div.additional-price-container')?.querySelector('input') as HTMLInputElement)
            ?.value ?? 0,
      })),
      toArray,
    );
  }
}
