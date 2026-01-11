import { merge } from 'webpack-merge';
import webpack from 'webpack';
import pkg from './package.json';
import { webpackBase } from './configs/webpack.base';
import { ModuleFederationPlugin } from '@module-federation/enhanced';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const deps = pkg.dependencies;
const [org, projectName] = pkg.name.split('/');

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    filename: `${org.slice(1)}-${projectName}.js`,
    libraryTarget: 'system',
    uniqueName: projectName,
    devtoolNamespace: projectName,
    publicPath: '/front-end/salary-front/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: `${org.slice(1)}_${projectName.split('-').join('_')}`,
      filename: `${projectName}.js`,
      remotes: {
        domrf_elka_sign:
          'domrf_elka_sign@/front-end/sign-front/elka-sign-manifest.json',
      },
      exposes: {
        './routes': './src/routes',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        '@reduxjs/toolkit': {
          singleton: true,
          requiredVersion: deps['@reduxjs/toolkit'],
        },
        'domrf-ui': {
          singleton: true,
        },
      },
      manifest: {
        fileName: `${projectName}-manifest.json`,
      },
    }),
    sentryWebpackPlugin({
      moduleMetadata: ({ release }) => ({
        dsn: 'SALARY_FRONT',
        release,
      }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.png$/i,
        type: 'asset/resource',
      },
    ],
  },
};

const devConfig = {
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9008,
  },
};

const mergedConfig = (_, argv) => {
  const isDev = argv.mode === 'development';
  const isStandalone = argv.env?.standalone;

  const plugins = [...config.plugins];
  
  if (isStandalone) {
    // Удаляем ModuleFederationPlugin для standalone режима
    const standalonePlugins = plugins.filter(
      (p) => !(p instanceof ModuleFederationPlugin)
    );
    standalonePlugins.push(
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true, // Автоматически добавлять скрипты
      })
    );
    return merge(
      {
        ...config,
        entry: './src/index.tsx',
        mode: argv.mode || 'development',
        output: {
          ...config.output,
          libraryTarget: undefined,
          publicPath: '/',
        },
        plugins: standalonePlugins,
        ...(isDev && devConfig),
        devServer: {
          ...devConfig.devServer,
          port: 8080,
          historyApiFallback: true,
        },
      },
      webpackBase,
    );
  }

  return merge(
    {
      ...config,
      mode: argv.mode || 'development',
      plugins,
      ...(isDev && devConfig),
    },
    webpackBase,
  );
};

export default mergedConfig;