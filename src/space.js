import { define } from './base.js';
import { Flex } from './flex.js';
import styles from './space.css' assert { type: 'css' };

export class Space extends Flex {
  static styles = styles;

  static get observedAttributes() {
    return super.observedAttributes.concat(['align', 'direction', 'size']);
  }
}

define('m-space', Space);
