import type { ConsoleLevel } from './types';

type ConsoleLevelConfig = Record<ConsoleLevel, boolean>;

const DEFAULT_CONFIG: ConsoleLevelConfig = {
  verbose: false,
  info: false,
  warning: false,
  error: false,
  dir: false,
  table: false,
};

export function createLiblogConfig<S extends string>() {
  const configStore = new Map<S | 'default', ConsoleLevelConfig>([['default', DEFAULT_CONFIG]]);

  const setConfig = (
    arg1: S[] | S | 'default' | Partial<ConsoleLevelConfig>,
    arg2: Partial<ConsoleLevelConfig> = {}
  ) => {
    let config;
    let target;

    if (Array.isArray(arg1) || typeof arg1 === 'string') {
      target = arg1;
      config = arg2;
    } else if (typeof arg1 === 'object') {
      target = 'default';
      config = arg1;
    }

    if (Array.isArray(target)) {
      for (const scope of target) {
        const currentConfig = configStore.get(scope) || DEFAULT_CONFIG;
        configStore.set(scope, { ...currentConfig, ...config });
      }
      return;
    }
    if (target) {
      const currentConfig = configStore.get(target) || DEFAULT_CONFIG;
      configStore.set(target, { ...currentConfig, ...config });
      return;
    }
  };

  const getConfig = (target: S | 'default') => {
    if (configStore.has(target)) return configStore.get(target)!;
    return configStore.get('default')!;
  };

  return {
    get: getConfig,
    set: setConfig,
  };
}
