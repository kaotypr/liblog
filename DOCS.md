# @kaotypr/liblog

A lightweight and configurable logging utility for JavaScript/TypeScript "library" with scope-based logging control.
Create the liblog utils in your library, export and use it in anywhere your library.
Then you can configure the logging behavior based on your needs.

- you can export the liblog utils from your library and configure it in your application.
- turn on the log levels you want to see in your application.
- turn off the log levels you don't want to see in your application.

NOTE: always set the log levels to false in your production environment unless you want to see the logs in your production environment.

## Features

- 🎯 Scope-based logging
- 🎨 Customizable scope prefixes
- 🔧 Multiple log levels (verbose, info, warning, error, dir, table)
- 💪 TypeScript support
- 🔄 Dynamic configuration

## Installation

```bash
npm install @kaotypr/liblog
```

## Usage

### Basic Usage

```typescript
import { createLiblog, LiblogConfig } from '@kaotypr/liblog';

// Initialize liblog config
const liblogConfig = new LiblogConfig();

// Create liblog utils
const liblog = createLiblog(liblogConfig);

// Try to log without log level set to true
liblog.info('this is not printed'); // no output

// Set "info" log level to true
liblogConfig.set({
  info: true,
});

// Try to log again
liblog.info('hello world'); // Output: hello world

// Set the config to false using logger's config
liblog.config.set({
  info: false,
});

// Try to log again
liblog.info('this is not printed'); // No output
```

### Scoped Logging

```typescript
import { createLiblog, LiblogConfig } from '@kaotypr/liblog';

// Define your scope types
type Scopes = 'api' | 'auth' | 'db';

// Initialize with scopes
const liblogConfig = new LiblogConfig<Scopes>();

// Create scoped loggers
const apiLog = createLiblog(liblogConfig, { scope: 'api' });
const authLog = createLiblog(liblogConfig, { scope: 'auth' });

// set default "verbose" level logging for all scopes
liblogConfig.set({
  verbose: true,
});

// Enable logging for specific scopes
liblogConfig.set(['auth', 'api'], {
  info: true,
  error: true,
});

// Use scoped logging
authLog.debug('Auth debug'); // Output: [auth]: Auth debug
apiLog.info('Request received'); // Output: [api]: Request received
authLog.error('Login failed'); // Output: [auth]: Login failed

// Disable specific scope
apiLog.config.set({
  info: false,
  error: false,
});

apiLog.info('Not visible'); // No output
authLog.error('Still visible'); // Output: [auth]: Still visible
```

### Custom Scope Prefixes

```typescript
import { createLiblog, LiblogConfig } from '@kaotypr/liblog';

const liblogConfig = new LiblogConfig<'api' | 'auth' | 'db'>();

// Different prefix styles
const apiLog = createLiblog(liblogConfig, { scope: 'api' }); // Default prefix
const authLog = createLiblog(liblogConfig, { scope: 'auth', scopePrefix: false }); // No prefix
const dbLog = createLiblog(liblogConfig, {
  scope: 'db',
  scopePrefix: (scope) => `${scope.toUpperCase()} >>`, // Custom prefix
});

liblogConfig.set(['api', 'auth', 'db'], { info: true });

apiLog.info('Hello');   // Output: [api]: Hello
authLog.info('Hello');  // Output: Hello
dbLog.info('Hello');    // Output: DB >> Hello
```

## Available Log Levels

- verbose - Debug information
- info - General information
- warning - Warnings
- error - Errors
- dir - Object inspection
- table - Tabular data

## Configuration

### Setting default log levels

```typescript
liblogConfig.set({
  verbose: true,  // Enable debug logging
  info: true,     // Enable info logging
  warning: true,  // Enable warning logging
  error: true,    // Enable error logging
  dir: true,      // Enable dir logging
  table: true,    // Enable table logging
});
```

### Setting scope log levels

```typescript
liblogConfig.set('scope1', {
  verbose: true,  // Enable debug logging
  info: true,     // Enable info logging
  warning: true,  // Enable warning logging
  error: true,    // Enable error logging
  dir: true,      // Enable dir logging
  table: true,    // Enable table logging
});

liblogConfig.set(['scope1', 'scope2'], {
  verbose: true,  // Enable debug logging
  info: true,     // Enable info logging
  warning: true,  // Enable warning logging
  error: true,    // Enable error logging
  dir: true,      // Enable dir logging
  table: true,    // Enable table logging
});
```

### Setting log level from created liblog utils

```typescript
const liblogConfig = new LiblogConfig<'feature'>();
const appLog = createLiblog(liblogConfig);
const featureLog = createLiblog(liblogConfig, { scope: 'feature' });

appLog.config.set({
  verbose: true,  // Enable debug logging
  info: true,     // Enable info logging
  warning: true,  // Enable warning logging
  error: true,    // Enable error logging
  dir: true,      // Enable dir logging
  table: true,    // Enable table logging
});

featureLog.config.set({
  verbose: true, // Enable debug logging only on feature scope
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
