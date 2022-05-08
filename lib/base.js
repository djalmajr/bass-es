import { camelCase } from 'help-es/lib/camelCase.mjs';
import { firstUpper } from 'help-es/lib/firstUpper.mjs';
import { isObject } from 'help-es/lib/isObject.mjs';
import { kebabCase } from 'help-es/lib/kebabCase.mjs';
import { parseJSON } from 'help-es/lib/parseJSON.mjs';
import { cache, createCache, Hole, html, unroll } from './html.js';
import createReactive from './reactive.js';

const reactive = createReactive();

const parse = {
  attr: (val) => val === '' || parseJSON(val),
  prop: (val) => (typeof val === 'boolean' ? (val ? '' : null) : val),
  number: Number,
  string: String,
  boolean: Boolean,
};

const parseAttr = (val) => val === '' || parseJSON(val);

const parseProp = (val) => (typeof val === 'boolean' ? (val ? '' : null) : val);

const getRoot = (node) => {
  do {
    node = node.parentElement;
  } while (node && !/^m-/i.test(node.tagName));

  return node;
};

export { html };

export class Base extends HTMLElement {
  static shadow = false;

  // #observer = null;

  #state = {};

  constructor() {
    super();

    if (this.constructor.shadow) {
      this.attachShadow({ mode: 'open' });
    }
  }

  connectedCallback() {
    const { styles } = this.constructor;
    const target = this.shadowRoot || document;

    if (styles && !target.adoptedStyleSheets.includes(styles)) {
      target.adoptedStyleSheets = [...target.adoptedStyleSheets, styles];
    }

    this.#render();

    if (isObject(this.props)) {
      this.#state = reactive(this.props, this.#render);

      for (const key in this.props) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get: () => this.#state[key],
          set: (val) => {
            this.#state[key] = val;

            const name = kebabCase(key);
            const attr = parseAttr(this.attr(name));
            const { observedAttributes } = this.constructor;

            if (observedAttributes?.includes(name) && val !== attr) {
              this.attr(name, parseProp(val));
            }
          },
        });
      }
    }
  }

  disconnectedCallback() {
    // this.#observer?.disconnect();
  }

  attributeChangedCallback(key, old, val) {
    const prop = camelCase(key);

    if (this.props?.[prop] !== undefined) {
      this[prop] = parseAttr(val);
    }

    this.#render();
  }

  // DOM

  get $el() {
    return this.shadowRoot || this;
  }

  /**
   *
   * @param {string} selector
   */
  $(selector) {
    return this.$el.querySelector(selector);
  }

  /**
   *
   * @param {string} selector
   */
  $$(selector) {
    return this.$el.querySelectorAll(selector);
  }

  /**
   *
   * @param {string} name
   * @param {string} [value]
   */
  attr(name, value) {
    if (value !== void 0) {
      value === null ? this.removeAttribute(name) : this.setAttribute(name, value);
    }

    return this.getAttribute(name);
  }

  /**
   *
   * @param {string} attr
   * @param {string} [val]
   */
  prop(attr, val) {
    this[camelCase(attr)] = val === '' || (val === null ? false : parseJSON(val));
  }

  /**
   *
   * @param {string} name
   */
  has(name) {
    return this.hasAttribute(name);
  }

  // Events

  /**
   *
   * @param {string} name
   * @param {unknown} detail
   */
  emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { detail }));
  }

  /**
   *
   * @param {string} name
   * @param {(this: HTMLElement, evt: any) => any} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  on(name, listener, options) {
    this.addEventListener(name, listener, options);
  }

  /**
   *
   * @param {string} name
   * @param {(this: HTMLElement, evt: any) => any} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  off(name, listener, options) {
    this.removeEventListener(name, listener, options);
  }

  // Private

  #render = () => {
    if (!this.isConnected) return;

    const root = this.$el;
    const hole = this.render();
    const info = cache.get(root) || cache.set(root, createCache());
    const wire = hole instanceof Hole ? unroll(info, hole) : hole;

    if (wire !== info.wire) {
      info.wire = wire;

      const slot = {};

      Array.from(root.childNodes).forEach((node) => {
        const name = node.getAttribute?.('slot') || 'default';

        slot[name] ||= [];
        slot[name].push(node);
      });

      const wrap = document.createElement('div');

      wrap.appendChild(wire.valueOf());

      wrap.querySelectorAll('slot').forEach((node) => {
        const parent = getRoot(node);

        if (root === parent || !parent) {
          const frag = document.createDocumentFragment();
          const name = node.getAttribute('name') || 'default';

          frag.append(...slot[name]);
          node.parentNode.replaceChild(frag, node);
        }
      });

      root.replaceChildren(...wrap.childNodes);
    }
  };
}
