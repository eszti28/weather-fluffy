import * as fs from 'fs';

export function logger(error) {
  try {
    const textFile = fs.readFileSync('../backend/src/middlewares/logger.txt');
    fs.writeFileSync(
      '../backend/src/middlewares/logger.txt',
      textFile + `\n${error}`
    );
  } catch (err) {
    console.log(err);
  }
}
