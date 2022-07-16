type Constructor<T> = new (...args: any[]) => T;

interface Config {
  ghost?: boolean;
}

interface StyledMixinInterface {
  get as(): string;
  get attrs(): string[];
}

export function StyledMixin<T extends Constructor<HTMLElement>>(
  Base: T,
  config?: Config,
): Constructor<StyledMixinInterface> & T;
