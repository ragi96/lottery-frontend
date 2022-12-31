import configCommon from './common.json';
// Using `require` as `import` does not support dynamic loading (yet).

// Accepting React env vars and aggregating them into `config` object.
const envVarNames = ['REACT_APP_PROVIDER_SOCKET', 'REACT_APP_DEVELOPMENT_KEYRING'];
/* eslint-disable */
const envVars = envVarNames.reduce((mem: any, n) => {
  // Remove the `REACT_APP_` prefix
  if (process.env[n] !== undefined) mem[n.slice(10)] = process.env[n];
  return mem;
}, {});
/* eslint-enable */
const config = { ...configCommon, ...require(`./${process.env.NODE_ENV}.json`), ...envVars };
export default config;
