import { camelCase } from 'help-es/dist/camelCase.mjs';
import { parseJSON } from 'help-es/dist/parseJSON.mjs';
import { html } from 'uhtml';
import { Base } from './base.js';
import styles from './dialog.css' assert { type: 'css' };

export class Dialog extends Base {
  static tagName = 'm-dialog';

  static styles = styles;

  static get observedAttributes() {
    return ['height', 'mask-closable', 'opened', 'title-text', 'width'];
  }

  props = {
    height: null,
    maskClosable: false,
    opened: false,
    titleText: 'Dialog',
    width: '500px',
  };

  attributeChangedCallback(name, old, val) {
    super.attributeChangedCallback(name, old, val);

    if (typeof val !== null) {
      this[camelCase(name)] = val === '' ? true : parseJSON(val);
    }
  }

  #handleClose = () => {
    this.emit('close');
  };

  #handleMaskClick = () => {
    if (this.maskClosable) {
      this.#handleClose();
    }
  };

  render() {
    // prettier-ignore
    const style = [
      `height: ${this.height || 'auto'}`,
      `width: ${this.width}`,
    ].join(";");

    return html`
      <div class="overlay" @click=${this.#handleMaskClick}></div>
      <div class="container" style=${style}>
        <header>
          <div class="title">
            <slot name="title">
              <strong class="title" title="Fechar">${this.titleText}</strong>
            </slot>
          </div>
          <span class="close" @click=${this.#handleClose}>&times;</span>
        </header>
        <main>
          <slot></slot>
        </main>
      </div>
    `;
  }
}

if (!customElements.get(Dialog.tagName)) {
  customElements.define(Dialog.tagName, Dialog);
}
