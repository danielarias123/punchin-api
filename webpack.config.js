import path from 'path';

export default {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'functions'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    (context, request, cb) => {
      const isExternal = request.match(/^[a-z][a-z\\.\-0-9]*$/i);
      cb(null, Boolean(isExternal));
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
    reasons: true,
    timings: true,
    children: false,
  },
};
