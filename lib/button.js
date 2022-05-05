import { html } from 'uhtml';
import { Base } from './base.js';
import styles from './button.css' assert { type: 'css' };

export class Button extends Base {
  static tagName = 'm-button';

  static styles = styles;

  static get observedAttributes() {
    return ['disabled', 'loading', 'intent', 'size', 'variant'];
  }

  props = {
    disabled: false,
    loading: false,
    intent: null,
    size: null,
    variant: null,
  };

  #button;

  get spinnerColor() {
    if (this.variant) {
      return this.intent
        ? getComputedStyle(this).getPropertyValue('--color-' + this.intent)
        : getComputedStyle(this).getPropertyValue('--color-gray');
    }

    return 'white';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this);
    this.#button = this.$('button');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this);
  }

  /**
   * @param {MouseEvent} evt
   */
  handleEvent(evt) {
    evt.stopPropagation();
    this.#button.focus();

    if (this.disabled || this.loading) {
      evt.stopImmediatePropagation();
    }
  }

  render() {
    return html`
      <button .disabled=${this.disabled}>
        <m-spinner
          .hidden=${!this.loading}
          color=${this.spinnerColor}
          ?size=${this.size}
        />
        <div .hidden=${this.loading}><slot /></div>
      </button>
    `;
  }
}

if (!customElements.get(Button.tagName)) {
  customElements.define(Button.tagName, Button);
}
