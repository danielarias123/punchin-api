/*
 * Copies files to build directory
 */
import fs from 'fs';


const copy = () => {
  fs.createReadStream('package.json').pipe(fs.createWriteStream('functions/package.json'));
  fs.createReadStream('.env').pipe(fs.createWriteStream('functions/.env'));
};

export default copy;
