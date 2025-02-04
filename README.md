# @kaotypr/liblog
A lightweight and configurable logging utility for JavaScript/TypeScript libraries with scope-based logging control.

## Installation
```bash
npm install @kaotypr/liblog
```

## Usage
```typescript
import { createLiblog, LiblogConfig } from '@kaotypr/liblog';

// Initialize with scopes
type Scopes = 'api' | 'auth';
const config = new LiblogConfig<Scopes>();

// Create loggers
const defaultLog = createLiblog(config);
const apiLog = createLiblog(config, { scope: 'api' });
const authLog = createLiblog(config, { 
  scope: 'auth',
  scopePrefix: (scope) => `${scope.toUpperCase()} >>` // Custom prefix
});

// Enable logging for specific scopes
config.set(['api', 'auth'], {
  info: true,
  error: true
});

// Use loggers
defaultLog.debug('Debug message');  // No output, as default is false for all scopes
apiLog.info('Request received');    // [api]: Request received
authLog.error('Login failed');      // AUTH >> Login failed

// Configure log level config from the logger
apiLog.config.set({ info: false });
```

## Features
- Scope-based logging with TypeScript support
- Configurable log levels: verbose, info, warning, error, dir, table
- Customizable scope prefixes
- Global and instance-level configuration

## Documentation
For detailed documentation and examples, visit our [documentation](https://github.com/kaotypr/liblog/blob/main/DOCS.md).

## License
MIT