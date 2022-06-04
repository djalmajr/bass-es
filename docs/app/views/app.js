import { Base, html } from 'bass-es/base.js';
import styles from './app.css' assert { type: 'css' };

export class App extends Base {
  static styles = styles;

  props = {
    counter: 0,
    opened: false,
  };

  connectedCallback() {
    super.connectedCallback();
    this.#updateCounter();
  }

  #updateCounter = () => {
    this.counter++;
    setTimeout(this.#updateCounter, 1000);
  };

  #toggle = () => {
    this.opened = !this.opened;
  };

  render() {
    return html`
      <m-flex as="h1" color="red" font-weight="600" mb="large" mt="0">Counter: ${this.counter}</m-flex>
      <m-flex space="medium" align="center">
        <m-button intent="primary" @click=${this.#toggle}>Toggle Modal</m-button>
        <m-button intent="primary" disabled>Disabled</m-button>
        <m-button intent="primary" loading>Loading</m-button>
      </m-flex>
      <m-dialog mask-closable ?opened=${this.opened} @close=${this.#toggle}>
        <strong slot="title">Save Info</strong>
        <m-flex column space="medium">
          <form>
            <m-flex column space="tiny">
              <m-flex column as="label" font-weight="600" mr="auto">
                <span>Name</span>
                <m-flex as="input" name="name"></m-flex>
              </m-flex>
            </m-flex>
          </form>
          <footer>
            <m-button intent="primary" @click=${this.#toggle}>Salvar</m-button>
            <m-button variant="outline" @click=${this.#toggle}>Close</m-button>
          </footer>
        </m-flex>
      </m-dialog>
    `;
  }
}

customElements.define('v-app', App);
