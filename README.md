# liblog

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
npm install liblog
```

## Usage

### Basic Usage

```typescript
import { createLiblog, createLiblogConfig } from 'liblog';

// Initialize with default configuration
const liblogConfig = createLiblogConfig();
const liblog = createLiblog(liblogConfig.get);

// Enable info level logging
liblogConfig.set({
  info: true,
});

// Log messages
liblog.info('Hello, world!'); // Output: Hello, world!
```

### Scoped Logging

```typescript
import { createLiblog, createLiblogConfig } from 'liblog';

// Define your scope types
type Scope = 'auth' | 'api' | 'db';

// Initialize with scopes
const liblogConfig = createLiblogConfig<Scope>();

// Create scoped loggers
const authLog = createLiblog(liblogConfig.get, { scope: 'auth' });
const apiLog = createLiblog(liblogConfig.get, { scope: 'api' });

// Enable logging for specific scopes
liblogConfig.set(['auth', 'api'], {
  info: true,
  error: true,
});

// Use scoped logging
authLog.info('User logged in'); // Output: [auth]: User logged in
apiLog.error('Request failed'); // Output: [api]: Request failed
```

### Custom Scope Prefixes

```typescript
import { createLiblog, createLiblogConfig } from 'liblog';

const liblogConfig = createLiblogConfig<'custom'>();

// Custom prefix function
const logger = createLiblog(liblogConfig.get, {
  scope: 'custom',
  scopePrefix: (scope) => `${scope.toUpperCase()} >>`,
});

liblogConfig.set('custom', { info: true });

logger.info('Hello'); // Output: CUSTOM >> Hello
```

## Available Log Levels

- verbose - Debug information
- info - General information
- warning - Warnings
- error - Errors
- dir - Object inspection
- table - Tabular data

## Configuration

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
