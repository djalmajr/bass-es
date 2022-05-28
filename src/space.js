import { Flex } from './flex.js';

const sheet = new CSSStyleSheet();

sheet.replaceSync(/* css */ `
  /*** Direction ***/

  m-space,
  m-space[direction='horizontal'] {
    flex-direction: row;
  }

  m-space[direction='horizontal-reverse'] {
    flex-direction: row-reverse;
  }

  m-space[direction='vertical'] {
    flex-direction: column;
  }

  m-space[direction='vertical-reverse'] {
    flex-direction: column-reverse;
  }

  /*** Alignment ***/

  m-space,
  m-space[align='start'] {
    align-items: flex-start;
  }

  m-space[align='center'] {
    align-items: center;
  }

  m-space[align='end'] {
    align-items: flex-end;
  }

  /*** Size ***/

  m-space:not([direction*='vertical'])[size='tiny'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-tiny) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-tiny) * 0);
  }

  m-space:not([direction*='vertical'])[size='mini'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-mini) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-mini) * 0);
  }

  m-space:not([direction*='vertical'])[size='small'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-small) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-small) * 0);
  }

  m-space:not([direction*='vertical']) > *:not([hidden]):not(:first-child),
  m-space:not([direction*='vertical'])[size='medium']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-medium) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-medium) * 0);
  }

  m-space:not([direction*='vertical'])[size='large'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-large) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-large) * 0);
  }

  m-space:not([direction*='vertical'])[size='big'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-big) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-big) * 0);
  }

  m-space:not([direction*='vertical'])[size='huge'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-huge) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-huge) * 0);
  }

  m-space:not([direction*='vertical'])[size='jumbo'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-jumbo) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-jumbo) * 0);
  }

  m-space:not([direction*='vertical'])[size='giant'] > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-giant) * calc(1 - 0));
    margin-right: calc(var(--m-spacing-giant) * 0);
  }

  m-space[direction='horizontal-reverse'][size='tiny']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-tiny) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-tiny) * 1);
  }

  m-space[direction='horizontal-reverse'][size='mini']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-mini) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-mini) * 1);
  }

  m-space[direction='horizontal-reverse'][size='small']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-small) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-small) * 1);
  }

  m-space[direction='horizontal-reverse'] > *:not([hidden]):not(:first-child),
  m-space[direction='horizontal-reverse'][size='medium']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-medium) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-medium) * 1);
  }

  m-space[direction='horizontal-reverse'][size='large']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-large) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-large) * 1);
  }

  m-space[direction='horizontal-reverse'][size='big']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-big) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-big) * 1);
  }

  m-space[direction='horizontal-reverse'][size='huge']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-huge) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-huge) * 1);
  }

  m-space[direction='horizontal-reverse'][size='jumbo']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-jumbo) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-jumbo) * 1);
  }

  m-space[direction='horizontal-reverse'][size='giant']
    > *:not([hidden]):not(:first-child) {
    margin-left: calc(var(--m-spacing-giant) * calc(1 - 1));
    margin-right: calc(var(--m-spacing-giant) * 1);
  }

  m-space[direction='vertical'][size='tiny'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-tiny) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-tiny) * 0);
  }

  m-space[direction='vertical'][size='mini'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-mini) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-mini) * 0);
  }

  m-space[direction='vertical'][size='small'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-small) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-small) * 0);
  }

  m-space[direction='vertical'] > *:not([hidden]):not(:first-child),
  m-space[direction='vertical'][size='medium'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-medium) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-medium) * 0);
  }

  m-space[direction='vertical'][size='large'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-large) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-large) * 0);
  }

  m-space[direction='vertical'][size='big'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-big) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-big) * 0);
  }

  m-space[direction='vertical'][size='huge'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-huge) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-huge) * 0);
  }

  m-space[direction='vertical'][size='jumbo'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-jumbo) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-jumbo) * 0);
  }

  m-space[direction='vertical'][size='giant'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-giant) * calc(1 - 0));
    margin-bottom: calc(var(--m-spacing-giant) * 0);
  }

  m-space[direction='vertical-reverse'][size='tiny'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-tiny) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-tiny) * 1);
  }

  m-space[direction='vertical-reverse'][size='mini'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-mini) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-mini) * 1);
  }

  m-space[direction='vertical-reverse'][size='small']
    > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-small) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-small) * 1);
  }

  m-space[direction='vertical-reverse'] > *:not([hidden]):not(:first-child),
  m-space[direction='vertical-reverse'][size='medium']
    > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-medium) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-medium) * 1);
  }

  m-space[direction='vertical-reverse'][size='large']
    > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-large) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-large) * 1);
  }

  m-space[direction='vertical-reverse'][size='big'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-big) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-big) * 1);
  }

  m-space[direction='vertical-reverse'][size='huge'] > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-huge) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-huge) * 1);
  }

  m-space[direction='vertical-reverse'][size='jumbo']
    > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-jumbo) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-jumbo) * 1);
  }

  m-space[direction='vertical-reverse'][size='giant']
    > *:not([hidden]):not(:first-child) {
    margin-top: calc(var(--m-spacing-giant) * calc(1 - 1));
    margin-bottom: calc(var(--m-spacing-giant) * 1);
  }
`);

export class Space extends Flex {
  static get observedAttributes() {
    return super.observedAttributes.concat(['align', 'direction', 'size']);
  }

  constructor() {
    super();
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
}

customElements.define('m-space', Space);
