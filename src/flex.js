import { kebabCase } from 'help-es/kebabCase.mjs';
import { Base, define } from './base.js';

const alias = {
  // COLORS
  ['bg']: ['background'],
  ['shadow']: ['box-shadow'],
  // LAYOUT
  ['w']: ['width'],
  ['h']: ['height'],
  ['min-w']: ['min-width'],
  ['max-w']: ['max-width'],
  ['min-h']: ['min-height'],
  ['max-h']: ['max-height'],
  ['size']: ['width', 'height'],
  ['radius']: ['border-radius'],
  // POSITION
  ['pos']: ['position'],
  ['t']: ['top'],
  ['l']: ['left'],
  ['r']: ['right'],
  ['b']: ['bottom'],
  ['z']: ['z-index'],
  // SPACE
  ['mt']: ['margin-top'],
  ['ml']: ['margin-left'],
  ['mr']: ['margin-right'],
  ['mb']: ['margin-bottom'],
  ['mx']: ['margin-left', 'margin-right'],
  ['my']: ['margin-bottom', 'margin-top'],
  ['m']: ['margin-left', 'margin-right', 'margin-bottom', 'margin-top'],
  ['pt']: ['padding-top'],
  ['pl']: ['padding-left'],
  ['pr']: ['padding-right'],
  ['pb']: ['padding-bottom'],
  ['px']: ['padding-left', 'padding-right'],
  ['py']: ['padding-bottom', 'padding-top'],
  ['p']: ['padding-left', 'padding-right', 'padding-bottom', 'padding-top'],
};

const { keys } = Object;
const styles = getComputedStyle(document.createElement('div'));
const whitelist = keys(styles).map(kebabCase).concat(keys(alias));

export class Flex extends Base {
  static get observedAttributes() {
    return ['hidden'];
  }

  /**
   * @type {MutationObserver}
   */
  #observer = null;

  connectedCallback() {
    this.style.display = 'flex';
    this.#update(this.getAttributeNames());
    this.#observer = new MutationObserver((a) => {
      this.#update(a.map((m) => m.attributeName));
    });
    this.#observer.observe(this, { attributes: true });
  }

  attributeChangedCallback(key, _old, val) {
    switch (key) {
      case 'hidden':
        this.style.display = val === null ? 'flex' : 'none';
        break;
    }
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }

  /**
   *
   * @param {string[]} attrs
   */
  #update(attrs) {
    const { observedAttributes = [] } = this.constructor;
    const blacklist = ['style'].concat(observedAttributes);

    Object.assign(
      this.style,
      attrs.reduce((style, name) => {
        const value = this.getAttribute(name)?.trim();
        const valid = !blacklist.includes(name) && whitelist.includes(name);

        return (
          (!(value && valid) && style) ||
          (!keys(alias).includes(name) && { ...style, [name]: value }) ||
          alias[name].reduce((r, k) => ({ ...r, [k]: value }), style)
        );
      }, {}),
    );
  }
}

define('m-flex', Flex);
