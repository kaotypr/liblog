export type LogLevel = 'verbose' | 'info' | 'warning' | 'error' | 'dir' | 'table';

export type LogLevelConfig = Record<LogLevel, boolean>;
