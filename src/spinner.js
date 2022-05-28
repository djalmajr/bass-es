import { Base, html } from './base.js';
import styles from './spinner.css' assert { type: 'css' };

export class Spinner extends Base {
  static styles = styles;

  render() {
    return html`<div class="spinner" />`;
  }
}

customElements.define('m-spinner', Spinner);
