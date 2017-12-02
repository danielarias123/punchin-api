/*
 * Runs webpack for 'webpack.config.js'
 */

import run from './run';
import copy from './copy';
import bundle from './bundle';

const build = async () => {
  await run(bundle);
  await run(copy);
};

export default build;
