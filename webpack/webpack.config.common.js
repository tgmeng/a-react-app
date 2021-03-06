const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelLoader = {
  loader: 'babel-loader',
  options: {},
};

module.exports = () => {
  return {
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: [babelLoader],
            },
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: [
                babelLoader,
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.ttf$/,
              use: ['file-loader'],
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: true,
        reportFiles: ['src/**/*.{ts,tsx}'],
      }),
      new HtmlWebpackPlugin({
        title: 'A React App'
      }),
    ],
  };
};
