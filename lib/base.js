import { camelCase } from 'help-es/lib/camelCase.mjs';
import { isObject } from 'help-es/lib/isObject.mjs';
import { kebabCase } from 'help-es/lib/kebabCase.mjs';
import { parseJSON } from 'help-es/lib/parseJSON.mjs';
import { cache, createCache, Hole, html, unroll } from './html.js';
import createReactive from './reactive.js';

const reactive = createReactive();

const getRoot = (node) => {
  do {
    node = node.parentElement;
  } while (node && !/^m-/i.test(node.tagName));

  return node;
};

export { html };

export class Base extends HTMLElement {
  static shadow = false;

  constructor() {
    super();

    if (this.constructor.shadow) {
      this.attachShadow({ mode: 'open' });
    }
  }

  // #observer = null;

  #state = {};

  connectedCallback() {
    const { styles } = this.constructor;
    const target = this.shadowRoot || document;

    if (styles && !target.adoptedStyleSheets.includes(styles)) {
      target.adoptedStyleSheets = [...target.adoptedStyleSheets, styles];
    }

    // if (!this.shadowRoot) {
    //   this.#observer = new MutationObserver(() => this.#update());
    //   this.#observer.observe(this, { childList: true });
    //   this.#update();
    // }

    if (isObject(this.props)) {
      this.#state = reactive(this.props, this.#render);

      for (const key in this.props) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get: () => this.#state[key],
          set: (val) => {
            this.#state[key] = val;

            setTimeout(() => {
              const name = kebabCase(key);
              // TODO: refatorar com a linha 88
              const attr = this.attr(name) === '' || parseJSON(this.attr(name));
              const { observedAttributes: attrs } = this.constructor;

              if (attrs.includes(name) && val !== attr) {
                this.attr(name, typeof val === 'boolean' ? (val ? '' : null) : val);
              }
            });
          },
        });
      }
    }

    if (this.isConnected) {
      this.#render();
    }
  }

  disconnectedCallback() {
    // this.#observer?.disconnect();
  }

  attributeChangedCallback(key, _old, val) {
    const prop = camelCase(key);

    if (this.props?.[prop] !== undefined) {
      this[prop] = val === '' || parseJSON(val);
    }

    // setTimeout(this.#render);
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
    const root = this.$el;
    const hole = this.render();
    const info = cache.get(root) || cache.set(root, createCache());
    const wire = hole instanceof Hole ? unroll(info, hole) : hole;

    if (wire !== info.wire) {
      info.wire = wire;
      info.slot = {};

      Array.from(root.childNodes).forEach((node) => {
        const name = node.getAttribute?.('slot') || 'default';

        info.slot[name] ||= [];
        info.slot[name].push(node);
      });

      const wrap = document.createElement('div');

      wrap.appendChild(wire.valueOf());
      wrap.querySelectorAll('slot').forEach((slot) => {
        const parent = getRoot(slot);

        if (root === parent || !parent) {
          const frag = document.createDocumentFragment();
          const name = slot.getAttribute('name') || 'default';

          frag.append(...info.slot[name]);
          slot.parentNode.replaceChild(frag, slot);
        }
      });

      root.replaceChildren(...wrap.childNodes);
    }
  };
}
