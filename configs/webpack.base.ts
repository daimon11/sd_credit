import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

export const webpackBase: webpack.Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@layout': path.resolve(__dirname, '../src/layout'),
      '@redux': path.resolve(__dirname, '../src/redux'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@types': path.resolve(__dirname, '../src/types'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      'domrf-ui': path.resolve(__dirname, '../src/domrf-ui'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../node_modules')],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};
