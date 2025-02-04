import { createLiblog } from '../src/liblog';
import { LiblogConfig } from '../src/liblog-config';

// Initialize liblog config
const liblogConfig = new LiblogConfig();

// Create liblog utils for each scope
const liblog = createLiblog(liblogConfig);

// Try to log without log level set to true
liblog.info('this is not printed'); // no ouput

// Set "info" log level to true
liblogConfig.set({
  info: true,
});

// Try to log again
liblog.info('hello world'); // Output, "hello world"

// Set the config to false from `liblog.config.set`
liblog.config.set({
  info: false,
});

// Try to log again after "info" log level set to false
liblog.info('this is not printed'); // No ouput

// Set the config to true from `liblog.config.set`
liblog.config.set({
  info: true,
});

liblog.info('hello world again'); // Output, "hello world again"

/**
 * bun run examples/v2/basic-usage.ts
 * Output:
 *
 * hello world
 * hello world again
 */
