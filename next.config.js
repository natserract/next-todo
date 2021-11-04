const Dotenv = require("dotenv-webpack");
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withPlugins = require( 'next-compose-plugins' );

const NextAppConfig = withImages({
  webpack: (config) => {
    config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    });

    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  }
});

module.exports = withPlugins([ 
  [
    withSass, {
      cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        }
    }
  ]
], NextAppConfig );
