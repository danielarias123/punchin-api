import build from './build';
import serve from './serve';
import run from './run';

const start = async () => {
  await run(build);
  await run(serve);
};

export default start;
