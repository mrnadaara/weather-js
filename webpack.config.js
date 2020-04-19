const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: ['babel-polyfill', './src/index.js'],
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Cagarweyne Weather',
      template: './src/assets/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/logo.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'Cagarweyne-Weather',
        appDescription: 'Get Weather forecast from around the world',
        developerName: 'Sharmarke Ahmed',
        developerURL: null,
        background: '#3498db',
        theme_color: '#ecf0f1',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
  ],
};
