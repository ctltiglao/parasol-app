const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// config.resolver.extraNodeModules = {
//     ...config.resolver.extraNodeModules,
//     crypto: require.resolve('crypto-browserify'),
//     stream: require.resolve('stream-browserify'),
//     buffer: require.resolve('buffer'),
// }

module.exports = withNativeWind(config, { input: './global.css' })