import type { LogLevelConfig } from './types';

const DEFAULT_CONFIG: LogLevelConfig = {
  verbose: false,
  info: false,
  warning: false,
  error: false,
  dir: false,
  table: false,
};

export class LiblogConfig<S extends string> {
  private configStore: Map<S, LogLevelConfig>;
  defaultConfig: LogLevelConfig;

  constructor(defaultConfig: Partial<LogLevelConfig> = {}) {
    this.defaultConfig = { ...DEFAULT_CONFIG, ...defaultConfig };
    this.configStore = new Map();
  }

  set(arg1: S[] | S | Partial<LogLevelConfig>, arg2: Partial<LogLevelConfig> = {}) {
    let nextConfig;
    let target;

    if (Array.isArray(arg1) || typeof arg1 === 'string') {
      target = arg1;
      nextConfig = arg2;
    } else if (typeof arg1 === 'object') {
      Object.assign(this.defaultConfig, arg1);
      return;
    }

    if (Array.isArray(target)) {
      for (const scope of target) {
        const currentConfig = this.configStore.get(scope) || DEFAULT_CONFIG;
        this.configStore.set(scope, { ...currentConfig, ...nextConfig });
      }
      return;
    }
    if (target) {
      const currentConfig = this.configStore.get(target) || DEFAULT_CONFIG;
      this.configStore.set(target, { ...currentConfig, ...nextConfig });
      return;
    }
  }

  get(target?: S): LogLevelConfig {
    if (target && this.configStore.has(target)) {
      return {
        ...this.defaultConfig,
        ...this.configStore.get(target),
      };
    }
    return this.defaultConfig;
  }
}
