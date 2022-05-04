import { html } from 'uhtml';
import { Base } from './base.js';
import styles from './space.css' assert { type: 'css' };

export class Space extends Base {
  static tagName = 'm-space';

  static styles = styles;

  render() {
    return html`<slot />`;
  }
}

if (!customElements.get(Space.tagName)) {
  customElements.define(Space.tagName, Space);
}
