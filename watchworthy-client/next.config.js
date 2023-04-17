/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');
const { i18n } = require('./next-i18next.config');

const antdLessOptions = {
  modifyVars: {},
  cssLoaderOptions: {},
  webpack(config) {
    return config;
  },
};

const nextI18nOptions = {
  i18n,
};

const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
};

module.exports = withAntdLess({
  ...antdLessOptions,
  ...nextI18nOptions,
  ...nextConfig,
});
