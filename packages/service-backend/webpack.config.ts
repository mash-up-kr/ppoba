import * as path from 'path';
import * as webpack from 'webpack';
import { execSync } from 'child_process';

module.exports = {
  entry: './src/entry.lambda.ts',
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      SOURCE_VERSION: captureSourceVersion(),
    }),
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          './swagger-ui-bundle.js',
          './swagger-ui-standalone-preset.js',
          'class-transformer/storage',
          'fastify-swagger',
          '@nestjs/microservices',
          '@nestjs/platform-fastify',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',

          // mongodb optionals
          'mongodb-client-encryption',
          'bson-ext',
          'kerberos',
          'aws4',
          'snappy',
          '@mongodb-js/zstd',
          'snappy/package.json',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  stats: {
    warningsFilter: [
      'optional-require',
      'load-package.util',
      'load-adapter',
      (warning: any) => false,
    ],
  },
};

declare global {
  const SOURCE_VERSION: string;
}

export function getSourceVersion() {
  try {
    return SOURCE_VERSION; // Webpack DefinePlugin will fill it
  } catch {
    return 'local';
  }
}

export function captureSourceVersion() {
  try {
    // using in webpack
    const version = execSync('git rev-parse HEAD').toString().trim();
    return `'${version.slice(0, 7)}'`;
  } catch {
    return `'unknown'`;
  }
}
