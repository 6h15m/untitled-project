import styl from './styl';

export class CounterComponent extends HTMLElement {
  static get componentName() {
    return 'counter-component';
  }

  get count() {
    return this._count;
  }

  private _count: number;
  private readonly shadow_root: ShadowRoot;
  private readonly inc_button_el: HTMLInputElement;
  private readonly dec_button_el: HTMLInputElement;
  private readonly amount_el: HTMLDivElement;

  constructor(count: number) {
    super();
    this._count = count;

    this.shadow_root = this.attachShadow({ mode: 'open' });

    this.inc_button_el = document.createElement('input');
    this.inc_button_el.setAttribute('type', 'button');
    this.inc_button_el.setAttribute('id', 'inc');
    this.inc_button_el.setAttribute('value', '+');
    this.inc_button_el.classList.add('amount-control');

    this.dec_button_el = document.createElement('input');
    this.dec_button_el.setAttribute('type', 'button');
    this.dec_button_el.setAttribute('id', 'dec');
    this.dec_button_el.setAttribute('value', '-');
    this.dec_button_el.classList.add('amount-control');

    this.amount_el = document.createElement('div');
    this.amount_el.classList.add('amount');
    this.amount_el.setAttribute('id', 'amount');
    this.amount_el.innerHTML = `${this.count}`;

    const counter_style = document.createElement('style');
    counter_style.textContent = styl;
    this.shadow_root.appendChild(counter_style);

    const container_el = document.createElement('div');
    container_el.classList.add('counter-container');
    container_el.appendChild(this.dec_button_el);
    container_el.appendChild(this.amount_el);
    container_el.appendChild(this.inc_button_el);
    this.shadow_root.appendChild(container_el);

    this.inc_button_el.addEventListener('click', () => this.inc());
    this.dec_button_el.addEventListener('click', () => this.dec());
  }

  private inc() {
    if (this.count === 100) {
      return;
    } else {
      this.changeCount(++this._count);
    }
  }

  private dec() {
    if (this.count === 1) {
      return;
    } else {
      this.changeCount(--this._count);
    }
  }

  private changeCount(changed_count: number) {
    this.amount_el.innerHTML = `${changed_count}`;
    this.dispatchEvent(
      new CustomEvent('@untitled/counter_change', {
        bubbles: true,
        cancelable: true,
        composed: false,
        detail: { changed_count },
      }),
    );
  }
}
