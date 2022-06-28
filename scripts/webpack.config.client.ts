{
  const CircularDependencyPlugin = require('circular-dependency-plugin');
  const CompressionPlugin        = require('compression-webpack-plugin');
  const CssMinimizerPlugin       = require('css-minimizer-webpack-plugin');
  const CSSMQPackerPlugin        = require('css-mqpacker-webpack-plugin');
  const MiniCssExtractPlugin     = require('mini-css-extract-plugin');
  const path                     = require('path');
  const TerserPlugin             = require('terser-webpack-plugin');
  const TsconfigPathsPlugin      = require('tsconfig-paths-webpack-plugin');
  const {CleanWebpackPlugin}     = require('clean-webpack-plugin');

  const {version} = require('../package.json');

  const ROOT   = path.resolve(__dirname, '../');
  const INPUT  = path.resolve(ROOT, 'src');
  const OUTPUT = path.resolve(ROOT, 'dist/assets');

  const configFile   = path.resolve(INPUT, 'tsconfig.json');
  const isProduction = process.env.NODE_ENV === 'production';

  module.exports = {
    devtool:      'inline-source-map',
    entry:        {
      app: path.resolve(INPUT, 'index.tsx'),
    },
    module:       {
      rules: [
        {
          exclude: /node_modules/,
          loader:  'ts-loader',
          options: {
            transpileOnly: true,
          },
          test:    /\.tsx?$/,
        },
        {
          test: /\.s?css$/,
          use:  [
            {
              loader: 'style-loader',
            },
            {
              loader:  MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: 'css-loader',
            },
            {
              loader:  'postcss-loader',
              options: {
                postcssOptions: {
                  ident:   'postcss',
                  plugins: [
                    require('autoprefixer'),
                  ],
                },
              },
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader:  'sass-loader',
              options: {
                sassOptions: {
                  sourceMapContents: false,
                },
                sourceMap:   true,
              },
            },
          ],
        },
        {
          exclude:   /fonts/,
          test:      /\.(jpe?g|png|svg|ico|webp)$/,
          generator: {
            emit:     false,
            filename: 'img/[name][ext]',
          },
          use:       {
            loader:  'file-loader',
            options: {
              name:       '[name].[ext]',
              outputPath: 'img/',
              publicPath: '/assets/img/',
            },
          },
        },
        {
          exclude:   /images/,
          test:      /\.(eot|svg|ttf|otf|woff2?)$/,
          generator: {
            emit:     false,
            filename: 'fonts/[name][ext]',
          },
          use:       {
            loader:  'file-loader',
            options: {
              name:       '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/assets/fonts/',
            },
          },
        },
      ],
    },
    optimization: {
      minimize:  isProduction,
      minimizer: [
        new CSSMQPackerPlugin({sort: true}),
        new CssMinimizerPlugin(),
        new TerserPlugin({
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          terserOptions: {
            sourceMap: true,
          },
        }),
      ],
    },
    output:       {
      assetModuleFilename: '[file]',
      chunkFilename:       `js/[name].${isProduction ? '[contenthash].min' : 'min'}.js`,
      filename:            `js/[name].min.js?${version}`,
      path:                OUTPUT,
      publicPath:          '/assets/',
    },
    performance:  {hints: isProduction ? 'warning' : false},
    plugins:      [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: [path.resolve(OUTPUT, '**/*.LICENSE.txt')],
        cleanOnceBeforeBuildPatterns: [path.resolve(OUTPUT, 'assets')],
      }),
      new CircularDependencyPlugin({
        exclude:          /node_modules/,
        failOnError:      true,
        allowAsyncCycles: true,
        cwd:              process.cwd(),
      }),
      new CompressionPlugin({test: /\.(js|css)(\?.*)?$/i}),
      new MiniCssExtractPlugin({
        filename:      `css/[name].min.css?${version}`,
        chunkFilename: `[id].${isProduction ? '[contenthash].min' : 'min'}.css`,
      }),
    ],
    resolve:      {
      extensions: ['.scss', '.ts', '.tsx'],
      plugins:    [
        new TsconfigPathsPlugin({configFile}),
      ],
    },
  };
}