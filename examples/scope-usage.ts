import { createLiblog } from '../src/liblog';
import { LiblogConfig } from '../src/liblog-config';

// Initialize liblog config with scopes type for type safety, and set default log level "warning" to true for all scopes
type Scopes = 'api' | 'auth' | 'db';
const liblogConfig = new LiblogConfig<Scopes>({ warning: true });

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

// Set "warning" log level to false and set "error" log level to true for all scopes at once
liblogConfig.set({
  warning: false,
  error: true,
});

// Try to log `apiLog` and `authLog` scopes again
apiLog.warn('This is not printed'); // No output
authLog.warn('This is not printed'); // No output
apiLog.error('API Error'); // Output, "[api]: API Error"
authLog.error('Auth Error'); // Output, "[auth]: Auth Error"

/**
 * bun run examples/v2/scope-usage.ts
 * Output:
 *
 * [api]: /health
 * [auth]: User {username} logged in
 * Output, "[api]: API Error"
 * Output, "[auth]: Auth Error"
 */
