import { Base, html } from './base.js';
import { Size } from './constants.js';
import styled from './styled.js';

const sizes = Object.values(Size);

const colors = [
  { color: 'text' },
  { color: 'red', intent: 'danger' },
  { color: 'blue', intent: 'info' },
  { color: 'green', intent: 'success' },
  { color: 'orange', intent: 'warning' },
  { color: 'primary', intent: 'primary' },
];

const color = ({ bg, color, intent }) => {
  const bgColor = bg || color;
  const prefix = intent ? `[intent="${intent}"]` : '';

  return /* css */ `
    m-button${prefix} button {
      background: var(--m-color-${bgColor}-400);
      border-color: var(--m-color-${bgColor}-400);
    }
    m-button${prefix}:not([disabled]):not([loading]) button:hover,
    m-button${prefix}:not([disabled]):not([loading]) button:active {
      background: var(--m-color-${bgColor}-500);
      border-color: var(--m-color-${bgColor}-500);
    }
    m-button${prefix}:not([disabled]):not([loading]) button:focus {
      border-color: #fff;
      box-shadow: 0 0 0 1px var(--m-color-${bgColor}-400), inset 0 0 0 1px var(--m-color-${bgColor}-400);
    }
    m-button${prefix}[variant='ghost'] button {
      background: transparent;
      border-color: transparent;
      color: var(--m-color-${color}-500);
    }
    m-button${prefix}[variant='ghost']:not([disabled]):not([loading]) button:active,
    m-button${prefix}[variant='ghost']:not([disabled]):not([loading]) button:hover {
      background: var(--m-color-${bgColor}-50);
      border-color: transparent;
      box-shadow: none;
    }
    m-button${prefix}[variant='ghost']:not([disabled]):not([loading]) button:active:focus,
    m-button${prefix}[variant='ghost']:not([disabled]):not([loading]) button:hover:focus {
      box-shadow: 0 0 0 1px var(--m-color-${bgColor}-400), inset 0 0 0 1px var(--m-color-${bgColor}-400);
    }
    m-button${prefix}[variant='outline'] button {
      background: transparent;
      border-color: var(--m-color-${bgColor}-400);
      color: var(--m-color-${color}-500);
    }
    m-button${prefix}[variant='outline']:not([disabled]):not([loading]) button:hover,
    m-button${prefix}[variant='outline']:not([disabled]):not([loading]) button:active {
      background: var(--m-color-${bgColor}-50);
    }
  `;
};

const size = (size) => /* css */ `
  m-button[size='${size}'] button {
    border-radius: var(--m-radius-small);
    font-size: var(--m-font-${size});
    line-height: var(--m-line-${size});
    height: calc(var(--m-font-${size}) * 2);
    padding: calc(var(--m-spacing-${size}) * 0.5) var(--m-spacing-${size});
  }
`;

const css = /* css */ `
  m-button {
    display: inline-flex;
  }

  m-button m-spinner {
    margin: auto;
  }

  m-button button {
    align-items: center;
    border: 1px solid transparent;
    color: #fff;
    font-family: var(--m-font-family);
    outline: none;
    transition: all var(--m-animation-duration);
    width: 100%;
  }

  m-button button:disabled,
  m-button[loading] button {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const sheet = new CSSStyleSheet();

sheet.replaceSync([css, ...colors.map(color), ...sizes.map(size)].join(' '));

export class Button extends styled(Base) {
  static styles = sheet;

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

  /**
   * @type {HTMLButtonElement | null}
   */
  #button;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this, true);
    this.#button = this.$('button');
    !this.has('size') && this.attr('size', 'medium');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this, true);
  }

  /**
   * @param {MouseEvent} evt
   */
  handleEvent(evt) {
    this.#button.focus();

    if (this.disabled || this.loading) {
      evt.stopImmediatePropagation();
    }
  }

  render() {
    const { disabled, loading } = this;

    return html`
      <button .disabled=${disabled}>
        <m-spinner .hidden=${!loading}></m-spinner>
        <m-flex .hidden=${loading} line-height="inherit"><slot /></m-flex>
      </button>
    `;
  }
}

customElements.define('m-button', Button);
