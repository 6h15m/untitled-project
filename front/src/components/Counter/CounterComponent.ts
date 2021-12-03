import styl from './styl';

export class CounterComponent extends HTMLElement {
  private count: number;
  private readonly shadow_root: ShadowRoot;
  static get componentName() {
    return 'counter-component';
  }

  get getCount() {
    return this.count;
  }

  constructor(count: number) {
    super();
    this.count = count;

    const counterContent = `
      <div class="amount-container">
        <input type="button" id="dec" value="-" class="amount-control"/>
        <div class="amount" id="amount">${this.count}</div>
        <input type="button" id="inc" value="+" class="amount-control" />
      </div>
    `;

    const counterStyle = document.createElement('style');
    counterStyle.textContent = styl;
    this.shadow_root = this.attachShadow({ mode: 'open' });
    const shadowRoot = this.shadow_root;
    shadowRoot.innerHTML = counterContent;
    shadowRoot.appendChild(counterStyle);
  }

  connectedCallback() {
    const inc_el = this.shadow_root.getElementById('inc');
    const dec_el = this.shadow_root.getElementById('dec');
    inc_el!.onclick = () => this.inc();
    dec_el!.onclick = () => this.dec();

    this.update(this.count);
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
    const amount_el = this.shadow_root.getElementById('amount');
    amount_el!.innerHTML = String(count);
  }
}
