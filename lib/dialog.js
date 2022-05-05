import { styleMap } from 'help-es/lib/styleMap.mjs';
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

  #handleClose = () => {
    this.emit('close');
  };

  #handleMaskClick = () => {
    if (this.maskClosable) {
      this.#handleClose();
    }
  };

  render() {
    const style = {
      height: this.height || 'auto',
      width: this.width,
    };

    return html`
      <div class="overlay" @click=${this.#handleMaskClick}></div>
      <div class="container" style=${styleMap(style)}>
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
