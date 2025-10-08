const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'static/js/bundle.[contenthash].js',
      publicPath: '/observatory/'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom')
      },
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'classic' }]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'javascript/auto',
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      port: 3000,
      historyApiFallback: {
        index: '/observatory/index.html'
      },
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html'
      }),
      ...(!isDevelopment ? [
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css'
        })
      ] : [])
    ]
  };
};
