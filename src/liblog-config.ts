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
  private configStore: Map<S | 'default', LogLevelConfig>;

  constructor() {
    this.configStore = new Map([['default', DEFAULT_CONFIG]]);
  }

  set(arg1: S[] | S | Partial<LogLevelConfig>, arg2: Partial<LogLevelConfig> = {}) {
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
        const currentConfig = this.configStore.get(scope) || DEFAULT_CONFIG;
        this.configStore.set(scope, { ...currentConfig, ...config });
      }
      return;
    }
    if (target) {
      const currentConfig = this.configStore.get(target) || DEFAULT_CONFIG;
      this.configStore.set(target, { ...currentConfig, ...config });
      return;
    }
  }

  get(target?: S): LogLevelConfig {
    if (target && this.configStore.has(target)) return this.configStore.get(target)!;
    return this.configStore.get('default')!;
  }
}
