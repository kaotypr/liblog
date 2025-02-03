export type ConsoleLevel = 'verbose' | 'info' | 'warning' | 'error' | 'dir' | 'table';

export type ScopeConfig = Record<ConsoleLevel, boolean>;
