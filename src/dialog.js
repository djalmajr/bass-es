import { styleMap } from 'help-es/styleMap.mjs';
import { Base, html } from './base.js';
import styles from './dialog.css' assert { type: 'css' };

export class Dialog extends Base {
  static styles = styles;

  static get observedAttributes() {
    return ['height', 'mask-closable', 'opened', 'title-text', 'width'];
  }

  props = {
    height: null,
    maskClosable: false,
    opened: false,
    titleText: 'Dialog',
    width: '350px',
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
      <div class="overlay" @click=${this.#handleMaskClick} />
      <div class="container" style=${styleMap(style)}>
        <header>
          <div class="title">
            <slot name="title">
              <strong class="title" title="Fechar">${this.titleText}</strong>
            </slot>
          </div>
          <span class="close" @click=${this.#handleClose}>&times;</span>
        </header>
        <main><slot /></main>
      </div>
    `;
  }
}

customElements.define('m-dialog', Dialog);
