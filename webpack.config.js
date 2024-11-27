const webpack = require('@nativescript/webpack');
const { resolve } = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.chainWebpack((config) => {
    // change the "@" alias to "app/libs"
    config.resolve.alias.set('@', resolve(__dirname, 'app/libs'));

    //caso se queira que não carregue o modulo
    // config.resolve.alias.set('fs', false);
    config.resolve.alias.set('fs', 'browserify-fs');
	config.resolve.alias.set('leveldown/package', false);
	config.resolve.alias.set('leveldown', false);
	

    config.resolve.fallback = {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
	  "leveldown/package": false,
	  "leveldown": false
    };

    // config.resolve.plugins.set("NodePolyfillPlugin", new NodePolyfillPlugin());

    // console.log(config);
  });

  return webpack.resolveConfig();
};
