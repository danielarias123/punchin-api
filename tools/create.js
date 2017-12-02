import mkdirp from 'mkdirp';

const create = name => new Promise(resolve => mkdirp(name, () => resolve()));

export default create;
