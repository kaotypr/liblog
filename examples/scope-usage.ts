import { createLiblog } from '../src/liblog';
import { createLiblogConfig } from '../src/liblog-config';

// Define scope type
type Scope = 'scope1' | 'scope2';

// Initialize liblog with scopes type
const liblogConfig = createLiblogConfig<Scope>();

// Create liblog utils for each scope
const scope1log = createLiblog(liblogConfig.get, { scope: 'scope1' });
const scope2log = createLiblog(liblogConfig.get, { scope: 'scope2' });

scope1log.warn('warned'); // no console.warn
scope2log.warn('warned'); // no console.warn

liblogConfig.set(['scope1', 'scope2'], {
  warning: true,
});

scope1log.warn('warned'); // console.warn('[scope 1]:', 'warned')
scope2log.warn('warned'); // console.warn('[scope 2]:', 'warned')

liblogConfig.set(['scope2'], {
  warning: false,
});

scope1log.warn('warned'); // console.warn('[scope 1]:', 'warned')
scope2log.warn('warned'); // no console.warn
