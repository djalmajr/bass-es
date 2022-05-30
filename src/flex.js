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
const cssProps = [
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

const allowed = cssProps.concat(keys(aliases));

const theme = {
  spaces: keys(spaces).concat(values(spaces).flat()),
};

const addCSS = (css) => {
  if (!document.adoptedStyleSheets.includes(css)) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, css];
  }
};

const generate = (size) => /* css */ `
  m-flex[space=${size}]:not([flex-dir*='column']):not([flex-direction*='column']) > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}]:not([flex-dir*='column']):not([flex-direction*='column']) > :first-child > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-${size}) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-${size}) * 0);
  }
  m-flex[space=${size}][flex-dir='horizontal-reverse'] > *:not([hidden]):not(:first-child),
  m-flex[space=${size}][flex-direction='horizontal-reverse'] > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}][flex-dir='horizontal-reverse'] > :first-child > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}][flex-direction='horizontal-reverse'] > :first-child > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-${size}) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-${size}) * 1);
  }
  m-flex[space=${size}][flex-dir='column'] > *:not([hidden]):not(:first-child),
  m-flex[space=${size}][flex-direction='column'] > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}][flex-dir='column'] > :first-child > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}][flex-direction='column'] > :first-child > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-${size}) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-${size}) * 0);
  }
  m-flex[space=${size}][flex-dir='column-reverse'] > *:not([hidden]):not(:first-child),
  m-flex[space=${size}][flex-direction='column-reverse'] > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}][flex-dir='column-reverse'] > :first-child > *:not([hidden]):not(:first-child),
  m-flex[as][space=${size}][flex-direction='column-reverse'] > :first-child > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-${size}) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-${size}) * 1);
  }
`;

const flexCss = /* css */ `
  m-flex { display: flex; }
  m-flex[as] { display: contents; }
  m-flex[hidden] { display: none; }
  m-flex[as] > :first-child { display: flex; }
`;

const sheet = new CSSStyleSheet();

sheet.replaceSync(values(Size).map(generate).concat(flexCss).join(''));

addCSS(sheet);

export class Flex extends HTMLElement {
  static get observedAttributes() {
    return ['as', 'class', 'disabled', 'hidden', 'space', 'style'];
  }

  /** @type {HTMLElement} */
  #root = this;

  #style = new CSSStyleSheet();

  /** @type {MutationObserver | null} */
  #observer = null;

  /** @type {string | null} */
  get as() {
    return this.getAttribute('as');
  }

  get attrs() {
    return this.constructor.observedAttributes || [];
  }

  constructor() {
    super();
    addCSS(this.#style);
  }

  connectedCallback() {
    this.#observer = new MutationObserver(() => this.#updateStyle());
    this.#observer.observe(this, { attributes: true });
    this.#updateStyle();
  }

  attributeChangedCallback(key, _old, _val) {
    switch (key) {
      case 'as':
        setTimeout(() => this.#updateRoot());
        break;

      case 'class':
      case 'style':
        this.as && this.#moveAttrs(this, this.#root);
        break;
    }
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    this.#observer = null;
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

    return value;
  }

  #moveAttrs(source, target) {
    for (const k of source.style) {
      target.style[k] = source.style[k];
    }

    let iter = source.classList.values();
    let next = iter.next();

    while (!next.done) {
      target.classList.add(next.value);
      next = iter.next();
    }

    source.removeAttribute('class');
    source.removeAttribute('style');

    // Remaining attributes
    source
      .getAttributeNames()
      .filter((key) => !allowed.includes(key) & !this.attrs.includes(key))
      .forEach((key) => {
        target.setAttribute(key, source.getAttribute(key));
        source.removeAttribute(key);
      });
  }

  #updateStyle() {
    const styles = this.getAttributeNames()
      .filter((key) => !this.attrs.includes(key) && allowed.includes(key))
      .map((key) => {
        const attr = this.getAttribute(key);
        const val = this.#parse(key, attr);
        const selector = this.as
          ? `m-flex[as][${key}="${attr}"] > :first-child`
          : `m-flex[${key}="${attr}"]`;

        return keys(aliases).includes(key)
          ? `${selector} { ${aliases[key].reduce((r, k) => r + `${k}:${val};`, '')} }`
          : `${selector} { ${key}:${val}; }`;
      });

    this.#style.replaceSync(styles.join(''));
  }

  #updateRoot() {
    const root = document.createElement(this.as);
    const frag = document.createDocumentFragment();

    Array.from(this.#root.childNodes).forEach((n) => frag.append(n));

    if (this.as) {
      root.append(frag);
      if (this === this.#root) this.appendChild(root);
      else this.#root.parentNode.replaceChild(root, this.#root);
      this.#root = root;
      this.#moveAttrs(this, root);
    } else {
      this.#moveAttrs(this.#root, this);
      this.#root.parentNode.replaceChild(frag, this.#root);
      this.#root = this;
    }

    this.#updateStyle();
  }
}

customElements.define('m-flex', Flex);
