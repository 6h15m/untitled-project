export class FooterComponent extends HTMLElement {
  static get componentName() {
    return "footer-component";
  }

  constructor() {
    super();
    const footerContent = `
      <footer></footer>
    `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = footerContent;
  }
}
