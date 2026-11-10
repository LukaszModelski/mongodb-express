const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // @sentry/react-native optionally requires "expo-router" inside try/catch.
  // We don't use expo-router, so webpack's "Module not found" warning is noise.
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    { module: /@sentry[\\/]react-native[\\/].*expoRouterStore/ },
  ];

  return config;
};
