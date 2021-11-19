import styl from './styl';

export class HeaderComponent extends HTMLElement {
  static get componentName() {
    return "header-component"
  }

  constructor() {
    super();
    const headerContent = `
      <header>
        <div class="left-container">
            <h1><a href="http://localhost:8081/">Untitled.</a></h1>
            <input class="search-container" type="text" placeholder="Search"/>
        </div>
        <div class="right-container">
            <a href="${"/cart"}">Cart</a>
        </div>
      </header>
    `
    const headerStyle = document.createElement("style");
    headerStyle.textContent = styl;
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = headerContent;
    shadowRoot.appendChild(headerStyle);
  }
}