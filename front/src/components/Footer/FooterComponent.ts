export class FooterComponent extends HTMLElement {
  static get componentName() {
    return "footer-component"
  }

  constructor() {
    super();
    const footerContent = `
      <footer>
        <h3>Say hi to our footer!</h3>
      </footer>
    `
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = footerContent;
  }
}