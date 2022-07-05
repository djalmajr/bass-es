import { camelCase } from 'help-es/camelCase.mjs';
import { isObject } from 'help-es/isObject.mjs';
import { kebabCase } from 'help-es/kebabCase.mjs';
import { parseJSON } from 'help-es/parseJSON.mjs';
import { cache, createCache, Hole, html, render, unroll } from './html.js';
import createReactive from './reactive.js';

const reactive = createReactive();

const parse = {
  attr: (val) => val === '' || parseJSON(val),
  prop: (val) => (typeof val === 'boolean' ? (val ? '' : null) : val),
};

export { html, render };

export class Base extends HTMLElement {
  static shadowDOM = false;

  #mounted = false;

  #props = {};

  constructor() {
    super();

    if (this.constructor.shadowDOM) {
      this.attachShadow({ mode: 'open' });
    }

    const { styles } = this.constructor;
    const target = this.shadowRoot || document;

    if (styles && !target.adoptedStyleSheets.includes(styles)) {
      target.adoptedStyleSheets = [...target.adoptedStyleSheets, styles];
    }
  }

  connectedCallback() {
    super.connectedCallback?.();

    if (isObject(this.props)) {
      this.#props = reactive(this.props, this.#render);

      for (const key in this.props) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get: () => this.#props[key],
          set: (value) => {
            this.#props[key] = value;

            const name = kebabCase(key);
            const prop = parse.attr(this.attr(name));
            const { observedAttributes } = this.constructor;

            if (observedAttributes?.includes(name) && value !== prop) {
              this.attr(name, parse.prop(value));
            }
          },
        });
      }
    }

    this.#mounted = true;
    this.#render();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
  }

  attributeChangedCallback(key, old, val) {
    super.attributeChangedCallback?.(key, old, val);

    if (!this.#mounted) {
      queueMicrotask(() => this.attributeChangedCallback(key, old, val));
      return;
    }

    const prop = camelCase(key);

    if (this.hasOwnProperty(prop)) {
      this[prop] = parse.attr(val);
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
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  on(name, listener, options) {
    this.addEventListener(name, listener, options);
  }

  /**
   *
   * @param {string} name
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  off(name, listener, options) {
    this.removeEventListener(name, listener, options);
  }

  // Private

  #render = () => {
    if (!this.isConnected || !this.render) return;

    const root = this.$el;
    const hole = this.render();
    const info = cache.get(root) || cache.set(root, createCache());
    const wire = hole instanceof Hole ? unroll(info, hole) : hole;

    if (wire !== info.wire) {
      info.wire = wire;

      if (this.constructor.shadowDOM) {
        root.replaceChildren(wire.valueOf());
        return;
      }

      const slot = {};

      Array.from(root.childNodes).forEach((node) => {
        const name = node.getAttribute?.('slot') || 'default';

        slot[name] ||= [];
        slot[name].push(node);
      });

      const wrap = document.createElement('div');

      wrap.appendChild(wire.valueOf());

      wrap.querySelectorAll('slot').forEach((node) => {
        const frag = document.createDocumentFragment();
        const name = node.getAttribute('name') || 'default';

        frag.append(...slot[name]);
        node.parentNode.replaceChild(frag, node);
      });

      root.replaceChildren(...wrap.childNodes);
    }
  };
}
