{
  const CircularDependencyPlugin = require('circular-dependency-plugin');
  const path                     = require('path');
  const TsconfigPathsPlugin      = require('tsconfig-paths-webpack-plugin');
  const nodeExternals            = require('webpack-node-externals');

  const ROOT   = path.resolve(__dirname, '../');
  const INPUT  = path.resolve(ROOT, 'server');
  const OUTPUT = path.resolve(ROOT, 'dist');

  const configFile   = path.resolve(INPUT, 'tsconfig.json');
  const isProduction = process.env.NODE_ENV === 'production';

  module.exports = {
    devtool:      'source-map',
    entry:        {
      server: path.resolve(INPUT, './index.ts'),
    },
    externals:    [
      nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]}),
    ],
    module:       {
      rules: [
        {
          exclude: /node_modules/,
          loader:  'ts-loader',
          options: {
            transpileOnly: true,
          },
          test:    /\.ts(x?)$/,
        },
        {
          include: /images/,
          test:    /\.(jpe?g|png|svg|ico|webp)$/,
          // dependency: { not: ['url'] },
          // type: 'javascript/auto',
          generator: {
            emit:     false,
            filename: 'assets/img/[name][ext]',
          },
          use:       {
            loader:  'file-loader',
            options: {
              name:       '[name].[ext]',
              outputPath: 'assets/img/',
              publicPath: '/assets/img/',
              emitFile:   false,
            },
          },
        },
        {
          include:   /fonts/,
          test:      /\.(eot|svg|ttf|otf|woff2?)$/,
          generator: {
            emit:     false,
            filename: 'fonts/[name][ext]',
          },
          use:       {
            loader:  'file-loader',
            options: {
              name:       '[name].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: '/assets/fonts/',
              emitFile:   false,
            },
          },
        },
        {
          test:   /\.s?css$/,
          loader: 'null-loader',
        },
      ],
    },
    name:         'server',
    node:         {__dirname: false},
    optimization: {nodeEnv: false},
    output:       {
      assetModuleFilename: '[file]',
      filename:            '[name].js',
      path:                OUTPUT,
      publicPath:          '/',
    },
    performance:  {hints: isProduction ? 'warning' : false},
    plugins:      [
      new CircularDependencyPlugin({
        exclude:          /node_modules/,
        failOnError:      true,
        allowAsyncCycles: true,
        cwd:              process.cwd(),
      }),
    ],
    resolve:      {
      extensions: ['.ts', '.tsx'],
      plugins:    [new TsconfigPathsPlugin({configFile})],
    },
    target:       'node',
  };
}