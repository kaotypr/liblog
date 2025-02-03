import { createLiblog } from '../src/liblog';
import { createLiblogConfig } from '../src/liblog-config';

// Initialize liblog with scopes type
const liblogConfig = createLiblogConfig<'aaa' | 'bbb' | 'ccc'>();

// Create liblog utils for each scope
const aaaLog = createLiblog(liblogConfig.get, { scope: 'aaa' });
const bbblog = createLiblog(liblogConfig.get, { scope: 'bbb', scopePrefix: false });
const ccclog = createLiblog(liblogConfig.get, { scope: 'ccc', scopePrefix: (s) => `${String(s).toUpperCase()} >>` });

liblogConfig.set(['aaa', 'bbb', 'ccc'], {
  info: true,
});

aaaLog.info('hello world'); // scope prefix added by default => console.info('[aaa]:', 'hello world')
bbblog.info('hello world'); // no prefix on scopePrefix: false => console.info('hello world')
ccclog.info('hello world'); // custom prefix: console.info('CCC >>', 'hello world')
