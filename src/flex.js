import { define } from './base.js';
import styled from './styled.js';

export class Flex extends styled(HTMLElement, { ghost: false }) {
  /**
   * @type {Flex | HTMLElement}
   */
  #root = this;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('sheetupdate', () => this.as && this.#move(this, this.#root));
  }

  attributeChangedCallback(key) {
    switch (key) {
      case 'as':
        queueMicrotask(() => this.#update());
        break;
    }
  }

  #move(source, target) {
    for (const k of source.style) {
      target.style[k] = source.style[k];
    }

    const iter = source.classList.values();

    for (let info; (info = iter.next().value); ) {
      target.classList.add(info[1]);
    }

    source.removeAttribute('class');
    source.removeAttribute('style');

    // Remaining attributes
    source
      .getAttributeNames()
      .filter((key) => !this.supports(key) && !this.attrs.includes(key))
      .forEach((key) => {
        target.setAttribute(key, source.getAttribute(key));
        source.removeAttribute(key);
      });
  }

  #update() {
    const frag = document.createDocumentFragment();

    Array.from(this.#root.childNodes).forEach((n) => frag.append(n));

    if (this.as) {
      const root = document.createElement(this.as);
      root.append(frag);
      if (this === this.#root) this.appendChild(root);
      else this.#root.parentNode.replaceChild(root, this.#root);
      this.#root = root;
      this.#move(this, root);
    } else {
      this.#move(this.#root, this);
      this.#root.parentNode.replaceChild(frag, this.#root);
      this.#root = this;
    }

    queueMicrotask(() => this.dispatchEvent(new Event('updatesheet')));
  }
}

define('m-flex', Flex);
