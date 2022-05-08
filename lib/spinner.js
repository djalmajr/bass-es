import { Base, html } from './base.js';
import styles from './spinner.css' assert { type: 'css' };

export class Spinner extends Base {
  static tagName = 'm-spinner';

  static styles = styles;

  static get observedAttributes() {
    return ['color'];
  }

  attributeChangedCallback(name, old, val) {
    super.attributeChangedCallback(name, old, val);

    if (name === 'color' && val?.trim()) {
      const color = getComputedStyle(this).getPropertyValue('--m-color');

      // this.$('div').style.setProperty('--m-color', val.trim() || color);
    }
  }

  render() {
    return html`<div class="spinner" />`;
  }
}

if (!customElements.get(Spinner.tagName)) {
  customElements.define(Spinner.tagName, Spinner);
}
