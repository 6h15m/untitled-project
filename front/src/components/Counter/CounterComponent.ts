import styl from './styl';

export class CounterComponent extends HTMLElement {
  private count: number;
  static get componentName() {
    return 'counter-component';
  }

  get getCount() {
    return this.count;
  }

  constructor() {
    super();
    this.count = 1;

    const counterContent = `
      <div class="product-amount-container">
        <input type="button" id="dec" value="-" class="amount-control"/>
        <div class="product-amount" id="product-amount">${this.count}</div>
        <input type="button" id="inc" value="+" class="amount-control" />
      </div>
    `;

    const counterStyle = document.createElement('style');
    counterStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = counterContent;
    shadowRoot.appendChild(counterStyle);
  }

  connectedCallback() {
    if (this.shadowRoot) {
      const inc_el = this.shadowRoot.getElementById('inc');
      const dec_el = this.shadowRoot.getElementById('dec');
      if (inc_el === null || dec_el === null) {
        return;
      }
      inc_el.onclick = () => this.inc();
      dec_el.onclick = () => this.dec();

      this.update(this.count);
    }
  }

  private inc() {
    if (this.count === 100) {
      return;
    } else {
      this.update(++this.count);
    }
  }

  private dec() {
    if (this.count === 1) {
      return;
    } else {
      this.update(--this.count);
    }
  }

  private update(count: number) {
    if (this.shadowRoot) {
      const product_amount_el = this.shadowRoot.getElementById('product-amount');
      if (product_amount_el === null) {
        return;
      }
      product_amount_el.innerHTML = String(count);
    }
  }
}
