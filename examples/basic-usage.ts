import { createLiblog } from '../src/liblog';
import { createLiblogConfig } from '../src/liblog-config';

// Define scope type
type Scope = 'scope1' | 'scope2';

// Initialize liblog with scopes type
const liblogConfig = createLiblogConfig<Scope>();

// Create liblog utils (default scope)
const liblog = createLiblog(liblogConfig.get);

liblog.info('hello world'); // no console.info

liblogConfig.set({
  info: true,
});

liblog.info('hello world'); // console.info('hello world')
liblog.error('hello world error => 1'); // no console.error

liblogConfig.set({
  error: true,
});

liblog.error('hello world error => 2'); // console.error('hello world error => 2')
