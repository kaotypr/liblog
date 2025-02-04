import { createLiblog } from '../src/liblog';
import { LiblogConfig } from '../src/liblog-config';

// Initialize liblog config with scopes type for type safety
type Scopes = 'api' | 'auth' | 'db';
const liblogConfig = new LiblogConfig<Scopes>();

// Set "warning" log level to true for all scopes
liblogConfig.set({
  warning: true,
});

// Create liblog utils for each scope
const apiLog = createLiblog(liblogConfig, { scope: 'api' });
const authLog = createLiblog(liblogConfig, { scope: 'auth' });
const dbLog = createLiblog(liblogConfig, { scope: 'db' });

apiLog.warn('/health'); // Output, "[api]: /health"
authLog.warn('User {username} logged in'); // Output, "[api]: User {username} logged in"

// Set "warning" log level to false for "db" scope
dbLog.config.set({
  warning: false,
});

// Try to log "db" scope
dbLog.warn('This is not printed'); // No output

// Set "warning" log level to false for all scopes
liblogConfig.set({
  warning: false,
});

// Try to log `apiLog` and `authLog` scopes again
apiLog.warn('This is not printed'); // No output
authLog.warn('This is not printed'); // No output

/**
 * bun run examples/v2/scope-usage.ts
 * Output:
 *
 * [api]: /health
 * [auth]: User {username} logged in
 */
