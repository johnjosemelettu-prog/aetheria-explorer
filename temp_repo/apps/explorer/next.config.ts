const withTM = require('next-transpile-modules')(['@aetheria/shared']);

module.exports = withTM({
  webpack: (config) => {
    return config;
  },
});
