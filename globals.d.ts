declare module 'https://cdn.jsdelivr.net/npm/uce-loader@2.0.0/+esm';

declare module 'help-es/*';

declare module '*.css' {
  const value: CSSStyleSheet;

  export default value;
}

interface Document {
  adoptedStyleSheets: any[];
}

interface ShadowRoot {
  adoptedStyleSheets: any[];
}

interface CSSStyleSheet {
  replaceSync(css: string): void;
}

interface HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
}
