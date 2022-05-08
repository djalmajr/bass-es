import { Base, html } from './base.js';
import styles from './spinner.css' assert { type: 'css' };

export class Spinner extends Base {
  static tagName = 'm-spinner';

  static styles = styles;

  render() {
    return html`<div class="spinner" />`;
  }
}

if (!customElements.get(Spinner.tagName)) {
  customElements.define(Spinner.tagName, Spinner);
}
