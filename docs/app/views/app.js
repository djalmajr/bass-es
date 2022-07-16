import { Base, html } from 'bass-es/base.js';
import { Size } from 'bass-es/constants.js';
import styles from './app.css' assert { type: 'css' };

export class App extends Base {
  static styles = styles;

  render() {
    const sizes = Object.values(Size);
    const variants = ['default', 'outline', 'ghost'];
    const intents = ['default', 'primary', 'success', 'danger', 'info', 'warning'];

    return html`
      <m-flex column>
        ${sizes.map((size) => {
          return html`
            <m-flex
              font-size="big"
              margin-top="large"
              margin-bottom="medium"
              text-transform="capitalize"
            >
              ${size}
            </m-flex>
            <m-flex wrap space="large">
              ${intents.map((intent) => {
                return html`
                  <m-flex column space="mini" mb="medium">
                    ${variants.map((variant) => {
                      return html`
                        <m-flex space="mini" align="center">
                          <m-button intent=${intent} size=${size} variant=${variant}>
                            Default
                          </m-button>
                          <m-button intent=${intent} size=${size} variant=${variant} disabled>
                            Disabled
                          </m-button>
                          <m-button intent=${intent} size=${size} variant=${variant} loading>
                            Loading
                          </m-button>
                        </m-flex>
                      `;
                    })}
                  </m-flex>
                `;
              })}
            </m-flex>
          `;
        })}
      </m-flex>
    `;
  }
}

customElements.define('v-app', App);
