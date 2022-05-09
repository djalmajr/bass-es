import { Base, define, html } from './base.js';
import styles from './button.css' assert { type: 'css' };

export class Button extends Base {
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
    const { disabled, loading, size } = this;

    return html`
      <button .disabled=${disabled}>
        <m-spinner .hidden=${!loading} ?size=${size} />
        <div .hidden=${loading}><slot /></div>
      </button>
    `;
  }
}

define('m-button', Button);
