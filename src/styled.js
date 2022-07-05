import { uniq } from 'help-es/uniq.mjs';
import { Intent, Size } from './constants.js';

const { from, isArray } = Array;

const { assign, keys, values } = Object;

const colors = {
  bg: ['background'],
  shadow: ['box-shadow'],
  elevation: ['box-shadow'],
};

const flex = {
  align: ['align-items'],
  justify: ['justify-content'],
  'flex-dir': ['flex-direction'],
};

const layout = {
  d: ['display'],
  w: ['width'],
  h: ['height'],
  dir: ['direction'],
  size: ['width', 'height'],
  radius: ['border-radius'],
  'min-w': ['min-width'],
  'max-w': ['max-width'],
  'min-h': ['min-height'],
  'max-h': ['max-height'],
};

const position = {
  pos: ['position'],
  t: ['top'],
  l: ['left'],
  r: ['right'],
  b: ['bottom'],
  z: ['z-index'],
};

const spaces = {
  m: ['margin'],
  mt: ['margin-top'],
  ml: ['margin-left'],
  mr: ['margin-right'],
  mb: ['margin-bottom'],
  mx: ['margin-left', 'margin-right'],
  my: ['margin-bottom', 'margin-top'],
  p: ['padding'],
  pt: ['padding-top'],
  pl: ['padding-left'],
  pr: ['padding-right'],
  pb: ['padding-bottom'],
  px: ['padding-left', 'padding-right'],
  py: ['padding-bottom', 'padding-top'],
  'margin-x': ['margin-left', 'margin-right'],
  'margin-y': ['margin-bottom', 'margin-top'],
  'padding-x': ['padding-left', 'padding-right'],
  'padding-y': ['padding-bottom', 'padding-top'],
};

const pseudos = {
  first: 'first-of-type',
  last: 'last-of-type',
};

const options = { attributes: true, attributeOldValue: true };

const aliases = assign({}, colors, flex, layout, position, spaces);

const sheet = new CSSStyleSheet();

const split = (attr) => {
  return attr.split(/-(active|focus|hover|first|last)$/).filter(Boolean);
};

const stringify = (stylesheet) => {
  return Array.from(stylesheet.cssRules)
    .map((rule) => rule.cssText || '')
    .join('\n');
};

/**
 *
 * @param {*} Base
 * @param {*} [config]
 * @returns
 */
export default function (Base, config) {
  const { ghost = true } = config || {};

  return class Styled extends Base {
    static get observedAttributes() {
      const attrs = [
        'as',
        'class',
        'center',
        'column',
        'disabled',
        'hidden',
        'nowrap',
        'reverse',
        'space',
        'style',
        'wrap',
      ];

      return uniq(attrs.concat(Base.observedAttributes || []));
    }

    /**
     * @type {MutationObserver}
     */
    #observer = new MutationObserver(() => this.#update());

    #sheet = this.constructor.styles || sheet;

    /**
     * @return {string}
     */
    get as() {
      return this.getAttribute('as');
    }

    /**
     * @return {string[]}
     */
    get attrs() {
      return this.constructor.observedAttributes || [];
    }

    constructor(...args) {
      super(...args);
      this.addEventListener('updatesheet', () => this.#update());
    }

    connectedCallback() {
      this.#init();
      this.#update();
      this.#observer.observe(this, options);
      super.connectedCallback?.();
    }

    disconnectedCallback() {
      this.#observer.disconnect();
      super.disconnectedCallback?.();
    }

    supports(attr) {
      const [name] = split(attr);

      return keys(aliases).includes(name) || CSS.supports(name, 'var(--a)');
    }

    #init() {
      let parent = this.parentNode;

      while (![Node.DOCUMENT_FRAGMENT_NODE, Node.DOCUMENT_NODE].includes(parent.nodeType)) {
        parent = parent.parentNode || document;
      }

      const sheets = parent.adoptedStyleSheets || [];
      const tag = this.tagName.toLowerCase();
      const prefix = tag.split('-')[0];
      const suffix = ghost ? '> :first-child' : '';
      const display = ghost ? 'flow-root' : 'flex';

      const spaces = (size) => /* css */ `
        ${tag}[space=${size}]:not([column]):not([reverse]):not([flex-dir*='column']):not([flex-direction*='column']) ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}]:not([column]):not([reverse]):not([flex-dir*='column']):not([flex-direction*='column']) > :first-child > *:not([hidden]):not(:first-child) {
          margin-left: calc(var(--${prefix}-spacing-${size}) * calc(1 - 0));
          margin-right: calc(var(--${prefix}-spacing-${size}) * 0);
        }
        ${tag}[space=${size}][reverse]:not([column]) ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[space=${size}][flex-dir='horizontal-reverse'] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[space=${size}][flex-direction='horizontal-reverse'] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][reverse]:not([column]) > :first-child > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][flex-dir='horizontal-reverse'] > :first-child > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][flex-direction='horizontal-reverse'] > :first-child > *:not([hidden]):not(:first-child) {
          margin-left: calc(var(--${prefix}-spacing-${size}) * calc(1 - 1));
          margin-right: calc(var(--${prefix}-spacing-${size}) * 1);
        }
        ${tag}[space=${size}][column]:not([reverse]) ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[space=${size}][flex-dir='column'] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[space=${size}][flex-direction='column'] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][column]:not([reverse]) > :first-child > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][flex-dir='column'] > :first-child > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][flex-direction='column'] > :first-child > *:not([hidden]):not(:first-child) {
          margin-top: calc(var(--${prefix}-spacing-${size}) * calc(1 - 0));
          margin-bottom: calc(var(--${prefix}-spacing-${size}) * 0);
        }
        ${tag}[space=${size}][column][reverse] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[space=${size}][flex-dir='column-reverse'] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[space=${size}][flex-direction='column-reverse'] ${suffix} > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][column][reverse] > :first-child > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][flex-dir='column-reverse'] > :first-child > *:not([hidden]):not(:first-child),
        ${tag}[as][space=${size}][flex-direction='column-reverse'] > :first-child > *:not([hidden]):not(:first-child) {
          margin-top: calc(var(--${prefix}-spacing-${size}) * calc(1 - 1));
          margin-bottom: calc(var(--${prefix}-spacing-${size}) * 1);
        }
      `;

      const common = /* css */ `
        ${tag} { display: ${display}; }
        ${tag} ${suffix} { display: flex; }
        ${tag}[as] > :first-child { display: flex; }
        ${tag}[hidden] { display: none; }
        ${tag}[column]:not([reverse]) ${suffix}, ${tag}[as][column]:not([reverse]) > :first-child { flex-direction: column; }
        ${tag}[column][reverse] ${suffix}, ${tag}[as][column][reverse] > :first-child { flex-direction: column-reverse; }
        ${tag}[reverse]:not([column]) ${suffix}, ${tag}[as][reverse]:not([column]) > :first-child { flex-direction: row-reverse; }
        ${tag}[reverse][wrap] ${suffix}, ${tag}[as][reverse][wrap] > :first-child { flex-wrap: wrap-reverse; }
        ${tag}[center] ${suffix}, ${tag}[as][center] > :first-child { align-items: center; justify-content: center }
        ${tag}[nowrap] ${suffix}, ${tag}[as][nowrap] > :first-child { flex-wrap: nowrap; }
        ${tag}[wrap] ${suffix}, ${tag}[as][wrap] > :first-child { flex-wrap: wrap; }
      `;

      const styles = values(Size).map(spaces).concat(common).join('');

      if (!from(this.#sheet.cssRules).find((r) => r.selectorText === `${tag}[hidden]`)) {
        this.#sheet.replaceSync(stringify(this.#sheet) + styles);
      }

      if (!sheets.includes(this.#sheet)) {
        parent.adoptedStyleSheets = [...sheets, this.#sheet];
      }
    }

    /**
     * @param {string} attr
     * @param {string | null} value
     * @return {string | null}
     */
    #parse(attr, value) {
      const [name] = split(attr);
      const prefix = this.tagName.toLowerCase().split('-')[0];
      const rxSize = new RegExp(`(${values(Size).join('|')})(?!-)`, 'g');
      const rxIntent = new RegExp(`(${values(Intent).join('|')})(?!-)`, 'g');

      if (value && (value.match(rxSize) || !CSS.supports(name, value))) {
        const val = value.replace('.', '-');
        const npx = Number.isNaN(Number(value)) ? '' : `${value}px`;

        if (name.match(/^bg$/) || name.match(/(background|color)/)) {
          return `var(--${prefix}-color-${val})`;
        }

        if (name.match(/shadow/)) {
          return `var(--${prefix}-shadow-${val})`;
        }

        if (name.match(/radius/)) {
          return npx || `var(--${prefix}-radius-${val})`;
        }

        if (name.match(/^border(-(top|left|right|bottom))?$/)) {
          return val
            .replace(rxIntent, `var(--${prefix}-color-$1)`)
            .replace(/(\w+-\d+)/, `var(--${prefix}-color-$1)`);
        }

        if (name.match(/(width|height|margin|padding|top|left|right|bottom)/)) {
          return npx || val.replace(rxSize, `var(--${prefix}-spacing-$1)`);
        }

        if (name.match(/^font-size$/)) {
          return npx || val.replace(rxSize, `var(--${prefix}-font-$1)`);
        }
      }

      return value;
    }

    #update() {
      this.getAttributeNames()
        .filter((key) => this.supports(key) && !this.attrs.includes(key))
        .forEach((attr, _, attrs) => {
          const [name, pseudo] = split(attr);
          const tag = this.tagName.toLowerCase();
          const value = this.getAttribute(attr);
          const state = pseudo ? `:${pseudos[pseudo] || pseudo}` : '';
          const suffix = ghost ? '> :first-child' : '';
          const query = this.as
            ? `${tag}[as][${attr}="${value}"]${state} > :first-child`
            : `${tag}[${attr}="${value}"]${state} ${suffix}`;

          if (!from(this.#sheet.cssRules).find((r) => r.selectorText === query)) {
            const parse = (key) => this.#parse(key, value);
            const toCSS = (key) => `${key}:${parse(key)}`;
            const prop = aliases[name];
            const text = keys(aliases).includes(name)
              ? `${isArray(prop) ? prop.map(toCSS).join(';') : prop(parse(name), attrs)}`
              : toCSS(name);

            this.#sheet.insertRule(`${query} { ${text}; }`.replace(/;+/, ';'));
          }
        });

      this.dispatchEvent(new Event('sheetupdate'));
    }
  };
}
