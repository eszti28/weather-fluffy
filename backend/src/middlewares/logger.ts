import * as fs from 'fs';

export function logger(message: string) {
  try {
    const textFile = fs.readFileSync('logger.txt');
    fs.writeFileSync('logger.txt', textFile + `\n${message}`);
  } catch (err) {
    console.log(err);
  }
}
