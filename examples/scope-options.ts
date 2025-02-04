import { createLiblog } from '../src/liblog';
import { LiblogConfig } from '../src/liblog-config';

type Scopes = 'api' | 'auth' | 'db' | 'client';
const liblogConfig = new LiblogConfig<Scopes>();

// Create liblog utils for each scope
const apiLog = createLiblog(liblogConfig, { scope: 'api' });
const authLog = createLiblog(liblogConfig, { scope: 'auth', scopePrefix: false });
const dbLog = createLiblog(liblogConfig, { scope: 'db', scopePrefix: () => 'DB >>' });
const clientLog = createLiblog(liblogConfig, { scope: 'client', scopePrefix: (s) => `__${s}__` });

liblogConfig.set(['api', 'auth'], {
  verbose: true,
});

liblogConfig.set('db', {
  warning: true,
});

clientLog.config.set({
  error: true,
});

apiLog.debug('hello world'); // scope prefix added by default => console.debug('[aaa]:', 'hello world')
authLog.debug('hello world'); // no prefix on scopePrefix: false => console.debug('hello world')
dbLog.warn('warning!'); // custom prefix: console.warn('DB >>', 'warning!')
clientLog.error('error!!'); // custom prefix: console.error('__client__', 'error')

/**
 * bun run examples/v2/scope-options.ts
 * Output:
 *
 * [api]: hello world
 * hello world
 * DB >> warning!
 * __client__ error!!
 */
