import { isEmpty } from "help-es/dist/isEmpty.mjs";
import { isObject } from "help-es/dist/isObject.mjs";
import createReactive from "reactive-props";
import { html, render } from "uhtml";

const rx = /^m-/i;

const reactive = createReactive();

const getRoot = (node) => {
  do {
    node = node.parentElement;
  } while (!rx.test(node.tagName));

  return node;
};

export class Base extends HTMLElement {
  static shadow = false;

  constructor() {
    super();

    if (this.constructor.shadow) {
      this.attachShadow({ mode: "open" });
    } else {
      this.#update();
    }
  }

  /**
   * @type {Record<string, HTMLElement>}
   */
  #cached = {};

  #observer = null;

  #state = {};

  connectedCallback() {
    const { styles } = this.constructor;
    const target = this.shadowRoot || document;

    if (styles && !target.adoptedStyleSheets.includes(styles)) {
      target.adoptedStyleSheets = [...target.adoptedStyleSheets, styles];
    }

    if (!this.shadowRoot) {
      this.#observer = new MutationObserver(() => this.#update());
      this.#observer.observe(this, { childList: true });
      this.#update();
    }

    if (isObject(this.props)) {
      this.#state = reactive(this.props, () => this.#render());

      for (const key in this.props) {
        Object.defineProperty(this, key, {
          enumerable: true,
          get: () => this.#state[key],
          set: (val) => (this.#state[key] = val),
        });
      }
    }

    this.#render();
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }

  attributeChangedCallback() {
    this.#render();
  }

  render() {
    return html``;
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

  #render() {
    render(this.$el, this.render());
  }

  #update() {
    if (isEmpty(this.#cached)) {
      Array.from(this.childNodes).forEach((node) => {
        const name = node.getAttribute?.("slot") || "default";

        this.#cached[name] ||= [];
        this.#cached[name].push(node);
      });
    } else {
      this.$$("slot").forEach((slot) => {
        if (this === getRoot(slot)) {
          const fragment = document.createDocumentFragment();
          const name = slot.getAttribute("name") || "default";

          this.#cached[name].forEach((node) => fragment.append(node));
          slot.parentNode.replaceChild(fragment, slot);
        }
      });
    }
  }
}
