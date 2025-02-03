import { ScopeConfig } from './types';

interface CreateLiblogOptions<S extends string> {
  scope: S;
  scopePrefix?: boolean | ((s: S) => string);
}

const DEFAULT_OPTIONS: CreateLiblogOptions<any> = {
  scope: 'default',
};

export const createLiblog = <S extends string>(
  configGetter: (scope: S) => ScopeConfig,
  options: CreateLiblogOptions<S> = DEFAULT_OPTIONS
) => {
  const { scopePrefix = true } = options;
  const withPrefix = options.scope === 'default' ? false : scopePrefix;
  const prefix = withPrefix
    ? typeof options.scopePrefix === 'function'
      ? options.scopePrefix(options.scope)
      : `[${options.scope}]:`
    : undefined;

  return {
    warn: (...args: any[]) => {
      const config = configGetter(options.scope);
      if (config?.warning) {
        console.warn(...(prefix ? [prefix, ...args] : args));
      }
    },
    error: (...args: any[]) => {
      const config = configGetter(options.scope);
      if (config?.error) {
        console.error(...(prefix ? [prefix, ...args] : args));
      }
    },
    info: (...args: any[]) => {
      const config = configGetter(options.scope);
      if (config?.info) {
        console.info(...(prefix ? [prefix, ...args] : args));
      }
    },
    debug: (...args: any[]) => {
      const config = configGetter(options.scope);
      if (config?.verbose) {
        console.debug(...(prefix ? [prefix, ...args] : args));
      }
    },
    dir: (...args: any[]) => {
      const config = configGetter(options.scope);
      if (config?.verbose) {
        if (prefix) console.log(prefix);
        console.dir(...args);
      }
    },
    table: (...args: any[]) => {
      const config = configGetter(options.scope);
      if (config?.verbose) {
        if (prefix) console.log(prefix);
        console.table(...args);
      }
    },
  };
};
