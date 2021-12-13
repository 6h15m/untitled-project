import styl from './styl';

export class FooterComponent extends HTMLElement {
  static get componentName() {
    return 'footer-component';
  }

  private readonly shadow_root: ShadowRoot;
  private readonly footer_el: HTMLElement;

  constructor() {
    super();

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.footer_el = document.createElement('footer');

    const footer_style = document.createElement('style');
    footer_style.textContent = styl;
    this.shadow_root.appendChild(footer_style);

    const container_el = document.createElement('div');
    container_el.classList.add('footer-container');
    container_el.appendChild(this.footer_el);
    this.shadow_root.appendChild(container_el);
  }
}
