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
            <input class="search-container" type="text" placeholder="search"/>
        </div>
        <div class="right-container">
            <a href="${"/cart"}">Cart</a>
        </div>
      </header>
    `
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 {
      margin: 0;
    }
    .left-container {
      display: flex;
      flex-direction: row;
    }
    .search-container {
      width: 14rem;
      height: 2rem;
      border: 1px solid black;
      border-radius: 20px;
      margin-left: 1rem;
      padding: 0.8rem;
    }
    `
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = headerContent;
    shadowRoot.appendChild(headerStyle);
  }
}