import styl from './styl';
import { OptionPropertyComponent } from '../OptionProperty/OptionPropertyComponent';
import { map, pipe, toArray } from '@fxts/core';

export class OptionComponent extends HTMLElement {
  private readonly shadow_root: ShadowRoot;

  static get componentName() {
    return 'option-component';
  }

  constructor() {
    super();
    const optionContent = `
      <div class="wrap">
        <h3>Options</h3>
        <div class="options-container" id='options-container'>
          <div class="option">
            <div class="option-name-container">
              <h4>Option Name</h4>
              <input type="text" class='bg-white' name='option-name'/>
            </div>
            <div class='option-properties-outer-container' id="option-properties-outer-container"></div>
          </div>
          <input type="button" value="+" class="add-btn" id="add-option-btn"/>
        </div>
      </div>
    `;

    const optionStyle = document.createElement('style');
    optionStyle.textContent = styl;
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = optionContent;
    shadowRoot.appendChild(optionStyle);
    customElements.define(OptionPropertyComponent.componentName, OptionPropertyComponent);
    this.shadow_root
      .getElementById('option-properties-outer-container')
      ?.appendChild(new OptionPropertyComponent());
  }

  connectedCallback() {
    const add_option_btn_el = this.shadow_root.getElementById('add-option-btn');
    const options_container_el = this.shadow_root.getElementById('options-container');
    add_option_btn_el?.addEventListener('click', () => {
      OptionComponent.addOption(options_container_el as HTMLElement, add_option_btn_el as HTMLElement);
      this.getOptionData();
    });
  }

  private static addOption(options_container_el: HTMLElement, add_option_btn_el: HTMLElement) {
    const createOption = document.createElement('div');
    const createOptionProperties = document.createElement('div');
    createOptionProperties.id = 'option-properties-outer-container';
    createOptionProperties.className = 'option-properties-outer-container';
    createOptionProperties.appendChild(new OptionPropertyComponent());
    createOption.className = 'option';
    createOption.innerHTML = `
      <div class="option-name-container">
        <h4>Option Name</h4>
        <input type="text" class='bg-white'/>
      </div>
    `;
    createOption.appendChild(createOptionProperties);
    options_container_el.insertBefore(createOption, add_option_btn_el);
  }

  getOptionData() {
    const option_els = this.shadow_root.querySelectorAll('div.option');
    return pipe(
      option_els,
      map((el) => ({
        name: el.querySelector('div.option-name-container')?.querySelector('input')?.value ?? '',
        option_properties: (
          el
            .querySelector('div.option-properties-outer-container')
            ?.querySelector('option-property-component') as OptionPropertyComponent
        ).getOptionPropertyData(),
      })),
      toArray
    );
  }
}
