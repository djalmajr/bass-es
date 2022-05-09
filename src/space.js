import { Base, define, html } from './base.js';
import styles from './space.css' assert { type: 'css' };

export class Space extends Base {
  static styles = styles;

  render() {
    return html`<slot />`;
  }
}

define('m-space', Space);
