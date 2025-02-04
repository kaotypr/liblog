import { LiblogConfig } from './liblog-config';
import { LogLevelConfig } from './types';

interface CreateLiblogOptions<S> {
  scope: S;
  scopePrefix?: boolean | ((s: S) => string);
}

export const createLiblog = <S extends string>(
  config: LiblogConfig<S>,
  options: CreateLiblogOptions<S> = { scope: 'default' as S, scopePrefix: false }
) => {
  const getCurrentConfig = () => config.get(options.scope);
  const { scopePrefix = true } = options;
  const withPrefix = options.scope === 'default' ? false : scopePrefix;
  const prefix = withPrefix
    ? typeof options.scopePrefix === 'function'
      ? options.scopePrefix(options.scope)
      : `[${options.scope}]:`
    : undefined;

  return {
    warn: (...args: unknown[]) => {
      if (getCurrentConfig()?.warning) {
        console.warn(...(prefix ? [prefix, ...args] : args));
      }
    },
    error: (...args: unknown[]) => {
      if (getCurrentConfig()?.error) {
        console.error(...(prefix ? [prefix, ...args] : args));
      }
    },
    info: (...args: unknown[]) => {
      if (getCurrentConfig()?.info) {
        console.info(...(prefix ? [prefix, ...args] : args));
      }
    },
    debug: (...args: unknown[]) => {
      if (getCurrentConfig()?.verbose) {
        console.debug(...(prefix ? [prefix, ...args] : args));
      }
    },
    dir: (...args: unknown[]) => {
      if (getCurrentConfig()?.verbose) {
        if (prefix) console.log(prefix);
        console.dir(...args);
      }
    },
    table: (...args: unknown[]) => {
      if (getCurrentConfig()?.verbose) {
        if (prefix) console.log(prefix);
        console.table(...args);
      }
    },
    config: {
      get: getCurrentConfig,
      set: (nextConfig: Partial<LogLevelConfig>) => {
        if (options.scope === 'default') {
          config.set(nextConfig);
          return;
        }
        config.set(options.scope, nextConfig);
      },
    },
  };
};
