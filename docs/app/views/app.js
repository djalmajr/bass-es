import { html } from 'uhtml';
import { Base } from 'min-ce/lib/base.js';
import styles from './app.css' assert { type: 'css' };

export class App extends Base {
  static tagName = 'v-app';

  static styles = styles;

  props = {
    opened: false,
  };

  #toggle = () => {
    this.opened = !this.opened;
  };

  render() {
    return html`
      <m-space align="center">
        <m-button intent="primary" @click=${this.#toggle}>Toggle Modal</m-button>
        <m-button intent="primary" disabled>Disabled</m-button>
        <m-button intent="primary" loading>Loading</m-button>
      </m-space>
      <m-dialog mask-closable ?opened=${this.opened} @close=${this.#toggle}>
        <strong slot="title">Save Info</strong>
        <m-space direction="vertical">
          <form>
            <m-space direction="vertical" size="tiny">
              <span>Name</span>
              <input name="name" />
            </m-space>
          </form>
          <footer>
            <m-button intent="primary" @click=${this.#toggle}>Salvar</m-button>
            <m-button variant="outline">Close</m-button>
          </footer>
        </m-space>
      </m-dialog>
    `;
  }
}

if (!customElements.get(App.tagName)) {
  customElements.define(App.tagName, App);
}
