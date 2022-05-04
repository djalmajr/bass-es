import { html } from 'uhtml';
import { Base } from 'min-ce/lib/base.js';
import styles from './app.css' assert { type: 'css' };

export class App extends Base {
  static tagName = 'v-app';

  static styles = styles;

  props = {
    opened: false,
  };

  #handleToggle = () => {
    this.opened = !this.opened;
  };

  render() {
    return html`
      <m-space direction="vertical">
        <button intent="primary" @click=${this.#handleToggle}>Open</button>
        <m-dialog mask-closable ?opened=${this.opened} @close=${this.#handleToggle}>
          <strong slot="title">Save Info</strong>
          <m-space direction="vertical">
            <form>
              <m-space direction="vertical" size="tiny">
                <span>Name</span>
                <input name="name" />
              </m-space>
            </form>
            <footer>
              <button intent="primary" @click=${this.#handleToggle}>Salvar</button>
            </footer>
          </m-space>
        </m-dialog>
      </m-space>
    `;
  }
}

if (!customElements.get(App.tagName)) {
  customElements.define(App.tagName, App);
}
