/*
 * Helper function that runs a specified module
 */

const format = time => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

const run = async (fn, options) => {
  const moduleFunction = fn.default || fn;
  const start = new Date();
  console.log(`[${format(start)}] Starting '${moduleFunction.name}'...`);
  await moduleFunction(options);
  const end = new Date();
  const time = end.getTime() - start.getTime();
  console.log(`[${format(end)}] Finished '${moduleFunction.name}' after ${time} ms`);
};

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = process.argv[2];
  run(require(`./${module}.js`)).catch(err => console.error(err.stack)); // eslint-disable-line global-require
}

export default run;
