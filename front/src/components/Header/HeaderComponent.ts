export class HeaderComponent extends HTMLElement {
  static get componentName() {
    return "header-component"
  }

  constructor() {
    super();
    const headerContent = `
      <header>
        <h1>Untitled.</h1>
      </header>
    `
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = headerContent;
  }
}