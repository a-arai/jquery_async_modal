import glob from 'glob';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const entry = glob.sync('./src/**/*.?(html|css|scss|js)').reduce((previous, current) => {
  const key = current.indexOf('.scss') !== -1 ? current.replace(/scss/g, 'css') : current;
  const keyReplace = key.replace(/^\.\/src\//, '');

  previous[keyReplace] = current.indexOf('.js') !== -1 ?
    ['babel-polyfill', current.replace(/\/src/, '')] :
    current.replace(/\/src/, '');

  return previous;
}, {});

const module = {
  rules: [
    {
      test: /\.html$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract('html-loader')
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        {
          loader: 'eslint-loader'
        }
      ]
    }
  ]
};

const devServer = {
  contentBase: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  proxy: {
    '/api': 'http://localhost:3000'
  },
  port: '8080'
};

export default {
  context: path.resolve(__dirname, 'src'),

  entry,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },

  devServer,

  module,

  plugins: [
    new ExtractTextPlugin('[name]')
  ]
};
