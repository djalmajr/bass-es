import { Size } from './constants.js';

const { assign, keys, values } = Object;

const colors = {
  bg: ['background'],
  shadow: ['box-shadow'],
};

const flex = {
  align: ['align-items'],
  justify: ['justify-content'],
  'flex-dir': ['flex-direction'],
};

const layout = {
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
};

const aliases = assign(colors, flex, layout, position, spaces);

// https://www.w3.org/Style/CSS/all-properties.en.html
// allowed.filter(s => s in document.body.style)
const allowed = [
  '-webkit-line-clamp',
  'accent-color',
  'align-content',
  'align-items',
  'align-self',
  'alignment-baseline',
  'all',
  'animation',
  'animation-delay',
  'animation-direction',
  'animation-duration',
  'animation-fill-mode',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-timing-function',
  'appearance',
  'aspect-ratio',
  'backface-visibility',
  'background',
  'background-attachment',
  'background-blend-mode',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-repeat',
  'background-repeat-x',
  'background-repeat-y',
  'background-size',
  'baseline-shift',
  'block-size',
  'border',
  'border-block',
  'border-block-color',
  'border-block-end',
  'border-block-end-color',
  'border-block-end-style',
  'border-block-end-width',
  'border-block-start',
  'border-block-start-color',
  'border-block-start-style',
  'border-block-start-width',
  'border-block-style',
  'border-block-width',
  'border-bottom',
  'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-color',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-image',
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-color',
  'border-inline-end',
  'border-inline-end-color',
  'border-inline-end-style',
  'border-inline-end-width',
  'border-inline-start',
  'border-inline-start-color',
  'border-inline-start-style',
  'border-inline-start-width',
  'border-inline-style',
  'border-inline-width',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-spacing',
  'border-start-end-radius',
  'border-start-start-radius',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  'box-shadow',
  'box-sizing',
  'break-after',
  'break-before',
  'break-inside',
  'caption-side',
  'caret-color',
  'clear',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  'color-interpolation-filters',
  'color-scheme',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-width',
  'columns',
  'contain',
  'contain-intrinsic-block-size',
  'contain-intrinsic-height',
  'contain-intrinsic-inline-size',
  'contain-intrinsic-size',
  'contain-intrinsic-width',
  'content',
  'content-visibility',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'cursor',
  'direction',
  'display',
  'dominant-baseline',
  'empty-cells',
  'fallback',
  'fill',
  'fill-opacity',
  'fill-rule',
  'filter',
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',
  'float',
  'flood-color',
  'flood-opacity',
  'font',
  'font-display',
  'font-family',
  'font-feature-settings',
  'font-kerning',
  'font-optical-sizing',
  'font-palette',
  'font-size',
  'font-stretch',
  'font-style',
  'font-synthesis',
  'font-synthesis-small-caps',
  'font-synthesis-style',
  'font-synthesis-weight',
  'font-variant',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variation-settings',
  'font-weight',
  'forced-color-adjust',
  'gap',
  'grid',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-gap',
  'grid-column-start',
  'grid-gap',
  'grid-row',
  'grid-row-end',
  'grid-row-gap',
  'grid-row-start',
  'grid-template',
  'grid-template-areas',
  'grid-template-columns',
  'grid-template-rows',
  'height',
  'hyphens',
  'image-orientation',
  'image-rendering',
  'inherits',
  'initial-value',
  'inline-size',
  'inset',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',
  'isolation',
  'justify-content',
  'justify-items',
  'justify-self',
  'left',
  'letter-spacing',
  'lighting-color',
  'line-break',
  'line-gap-override',
  'line-height',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-bottom',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'margin-left',
  'margin-right',
  'margin-top',
  'marker',
  'marker-end',
  'marker-mid',
  'marker-start',
  'mask',
  'mask-type',
  'max-block-size',
  'max-height',
  'max-inline-size',
  'max-width',
  'min-block-size',
  'min-height',
  'min-inline-size',
  'min-width',
  'mix-blend-mode',
  'object-fit',
  'object-position',
  'offset',
  'offset-distance',
  'offset-path',
  'offset-rotate',
  'opacity',
  'order',
  'orphans',
  'outline',
  'outline-color',
  'outline-offset',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-anchor',
  'overflow-clip-margin',
  'overflow-wrap',
  'overflow-x',
  'overflow-y',
  'overscroll-behavior',
  'overscroll-behavior-block',
  'overscroll-behavior-inline',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'padding',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-bottom',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',
  'padding-left',
  'padding-right',
  'padding-top',
  'page',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'perspective',
  'perspective-origin',
  'place-content',
  'place-items',
  'place-self',
  'position',
  'quotes',
  'resize',
  'right',
  'row-gap',
  'ruby-position',
  'scroll-behavior',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-snap-type',
  'scrollbar-gutter',
  'shape-image-threshold',
  'shape-margin',
  'shape-outside',
  'speak',
  'speak-as',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'tab-size',
  'table-layout',
  'text-align',
  'text-align-last',
  'text-combine-upright',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-skip-ink',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-emphasis',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-emphasis-style',
  'text-indent',
  'text-orientation',
  'text-overflow',
  'text-shadow',
  'text-transform',
  'text-underline-offset',
  'text-underline-position',
  'top',
  'transform',
  'transform-box',
  'transform-origin',
  'transform-style',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'unicode-bidi',
  'user-select',
  'vertical-align',
  'visibility',
  'white-space',
  'widows',
  'width',
  'will-change',
  'word-break',
  'word-spacing',
  'word-wrap',
  'writing-mode',
  'z-index',
];

const whitelist = allowed.concat(keys(aliases));

const theme = {
  spaces: keys(spaces).concat(values(spaces).flat()),
};

const sheet = new CSSStyleSheet();

const generate = (size) => {
  return /* css */ `
    m-flex[space=${size}]:not([flex-dir*='column']):not([flex-direction*='column']) > *:not([hidden]):not(:first-child) {
      margin-left: calc(var(--m-spacing-${size}) * calc(1 - 0));
      margin-right: calc(var(--m-spacing-${size}) * 0);
    }

    m-flex[space=${size}][flex-dir='horizontal-reverse'] > *:not([hidden]):not(:first-child),
    m-flex[space=${size}][flex-direction='horizontal-reverse']
      > *:not([hidden]):not(:first-child) {
      margin-left: calc(var(--m-spacing-${size}) * calc(1 - 1));
      margin-right: calc(var(--m-spacing-${size}) * 1);
    }

    m-flex[space=${size}][flex-dir='column'] > *:not([hidden]):not(:first-child),
    m-flex[space=${size}][flex-direction='column'] > *:not([hidden]):not(:first-child) {
      margin-top: calc(var(--m-spacing-${size}) * calc(1 - 0));
      margin-bottom: calc(var(--m-spacing-${size}) * 0);
    }

    m-flex[space=${size}][flex-dir='column-reverse'] > *:not([hidden]):not(:first-child),
    m-flex[space=${size}][flex-direction='column-reverse']
      > *:not([hidden]):not(:first-child) {
      margin-top: calc(var(--m-spacing-${size}) * calc(1 - 1));
      margin-bottom: calc(var(--m-spacing-${size}) * 1);
    }
  `;
};

sheet.replaceSync(values(Size).map(generate).join(''));

export class Flex extends HTMLElement {
  static get observedAttributes() {
    return ['as', 'class', 'disabled', 'hidden', 'space'];
  }

  #observer = new MutationObserver((a) => {
    this.#updateStyle(a.map((m) => m.attributeName));
  });

  #root = this;

  constructor() {
    super();
    this.#observer.observe(this, { attributes: true });
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }

  connectedCallback() {
    this.#updateStyle(this.getAttributeNames());
  }

  attributeChangedCallback(key, _old, _val) {
    switch (key) {
      case 'as':
        setTimeout(() => this.#updateRoot());
        break;

      case 'hidden':
        this.#updateStyle();
        break;
    }
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }

  /**
   * Generates styles from component's attributes.
   *
   * @param {object} defaults
   * @param {string[]} attrs
   * @returns {object}
   */
  #styles(defaults = {}, attrs = this.getAttributeNames()) {
    const { observedAttributes = [] } = this.constructor;
    const blacklist = ['style'].concat(observedAttributes);

    return attrs.reduce((style, name) => {
      const value = this.#parse(name, this.getAttribute(name));
      const invalid = blacklist.includes(name) || !whitelist.includes(name);

      return (
        (invalid && style) ||
        (!keys(aliases).includes(name) && { ...style, [name]: value }) ||
        aliases[name].reduce((r, k) => ({ ...r, [k]: value }), style)
      );
    }, defaults);
  }

  /**
   * @param {string} name
   * @param {string | null} value
   * @return {string | null}
   */
  #parse(name, value) {
    if (theme.spaces.includes(name) && values(Size).includes(value)) {
      return `var(--m-spacing-${value})`;
    }

    if (value !== null && !Number.isNaN(Number(value))) {
      return `${value}px`;
    }

    return value;
  }

  /**
   * @param {string[]} attrs
   */
  #updateStyle(attrs) {
    Object.assign(
      this.#root.style,
      { display: this.hasAttribute('hidden') ? 'none' : 'flex' },
      this.#styles({}, attrs),
    );
  }

  #updateRoot() {
    const tag = this.getAttribute('as');
    const frag = document.createDocumentFragment();

    if (tag) {
      if (this === this.#root) {
        Array.from(this.childNodes).forEach((n) => frag.append(n));
        this.#root = document.createElement(tag);
        this.#root.append(frag);
        this.appendChild(this.#root);
      } else {
        const root = document.createElement(tag);

        this.#root.parentNode.replaceChild(root, this.#root);
      }

      const styles = this.#styles({ display: 'contents' });

      for (const key in styles) {
        this.style[key] = null;
      }
    } else {
      Array.from(this.#root.childNodes).forEach((n) => frag.append(n));
      this.#root.parentNode.replaceChild(frag, this.#root);
      this.#root = this;
    }

    this.#updateStyle();
  }
}

customElements.define('m-flex', Flex);