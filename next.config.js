const nextTranslate = require('next-translate');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
// const webpack = require('webpack');

// const prod = process.env.NODE_ENV === 'production';
// const dir = '/demo';

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (_) => {};
}

module.exports = nextTranslate(
  withFonts(
    withCSS({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
      images: {
        domains: ['dtic.co'],
      },
      ...withLess(
        withSass({
          LessModules: true,
          enableSvg: true,
          lessLoaderOptions: {
            javascriptEnabled: true,
          },
          webpack(config, { dev }) {
            config.module.rules.push({
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 100000,
                },
              },
            });
            return config;
          },
        })
      ),
    })
  )
);
