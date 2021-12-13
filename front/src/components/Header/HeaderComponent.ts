import styl from './styl';

export class HeaderComponent extends HTMLElement {
  static get componentName() {
    return 'header-component';
  }

  private readonly host_location: string;

  private readonly shadow_root: ShadowRoot;
  private readonly header_el: HTMLElement;
  private readonly left_container_el: HTMLDivElement;
  private readonly title_el: HTMLAnchorElement;
  private readonly search_input_el: HTMLInputElement;
  private readonly right_container_el: HTMLDivElement;
  private readonly to_cart: HTMLAnchorElement;

  constructor() {
    super();
    this.host_location = `http://${window.location.host}`;

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.header_el = document.createElement('header');

    this.left_container_el = document.createElement('div');
    this.left_container_el.classList.add('left-container');

    this.title_el = document.createElement('a');
    this.title_el.setAttribute('href', this.host_location);
    this.title_el.classList.add('title');
    this.title_el.innerHTML = 'Untitled.';

    this.search_input_el = document.createElement('input');
    this.search_input_el.setAttribute('type', 'text');
    this.search_input_el.setAttribute('placeholder', 'Search');
    this.search_input_el.classList.add('search-input');

    this.left_container_el.appendChild(this.title_el);
    this.left_container_el.appendChild(this.search_input_el);

    this.right_container_el = document.createElement('div');

    this.to_cart = document.createElement('a');
    this.to_cart.setAttribute('href', '/cart');
    this.to_cart.innerHTML = 'Cart';

    this.right_container_el.appendChild(this.to_cart);

    this.header_el.appendChild(this.left_container_el);
    this.header_el.appendChild(this.right_container_el);

    const header_style = document.createElement('style');
    header_style.textContent = styl;
    this.shadow_root.appendChild(header_style);

    const container_el = document.createElement('div');
    container_el.classList.add('header-container');
    container_el.appendChild(this.header_el);
    this.shadow_root.appendChild(container_el);

    this.search_input_el.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        location.href = `http://${window.location.host}/search?q=${this.value}`;
      }
    });
  }
}
