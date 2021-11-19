import styl from './styl';

export class FooterComponent extends HTMLElement {
  static get componentName() {
    return 'footer-component';
  }

  constructor() {
    super();
    const footerContent = `
      <footer></footer>
    `;

    const footerStyle = document.createElement('style');
    footerStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = footerContent;
    shadowRoot.appendChild(footerStyle);
  }
}
