import styl from './styl';

export class HeaderComponent extends HTMLElement {
  private readonly shadow_root;
  static get componentName() {
    return 'header-component';
  }

  constructor() {
    super();
    const headerContent = `
      <header>
        <div class="left-container">
          <h1>
            <a href="http://localhost:8081/">Untitled.</a>
          </h1>
          <input class="search-container" type="text" placeholder="Search" id='search-field'/>
        </div>
        <div class="right-container">
          <a href="${'/cart'}">Cart</a>
        </div>
      </header>
    `;

    const headerStyle = document.createElement('style');
    headerStyle.textContent = styl;
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = headerContent;
    shadowRoot.appendChild(headerStyle);
  }

  connectedCallback() {
    const search_field_el = this.shadow_root.getElementById('search-field') as HTMLInputElement;
    search_field_el?.addEventListener('keypress', async function (e) {
      if (e.key === 'Enter') {
        location.href = `http://localhost:8081/search?q=${search_field_el.value}`;
      }
    });
  }
}
