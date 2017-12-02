/*
 * Runs webpack for 'webpack.config.js'
 */
import webpack from 'webpack';
import appConfig from '../webpack.config';

// Runs webpack for both app configs from 'webpack.config.js'
const build = () =>
  new Promise((resolve, reject) => {
    const bundler = webpack(appConfig);

    // Gets called when webpack finishes
    const onComplete = (err, stats) => {
      if (err) return reject(err);
      console.log(stats.toString('minimal'));
      return resolve();
    };

    // Recompile automatically on changes if watch is set
    // bundler.watch({
    //   aggregateTimeout: 300,
    //   poll: true,
    // }, onComplete);

    bundler.run(onComplete);
  });

export default build;
