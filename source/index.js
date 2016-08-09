//
//  index.js
//  asynctime
//
//  Created on 08/08/2016 By Thibault Malbranche
//

import chalk from 'chalk';

const shouldLog = {};

const logFunc = async (funcName, start, id) => {
  const time = ((new Date().getTime()) - start.getTime()).toString();
  process.stdout.write(`${funcName} - ${chalk.blue(time)} ms\r`);
  if (shouldLog[id]) {
    setTimeout(() => { logFunc(funcName, start, id); }, 20);
  } else {
    process.stdout.write(`${funcName} - ${chalk.green(time)} ms\r\n`);
  }
};

async function asyncTimedFunc(func, funcName) {
  const start = (new Date());
  const id = `${Math.floor(Math.random() * 1000000)}`;
  shouldLog[id] = true;
  return (await Promise.all([
    (async () => {
      try {
        const res = await func();
        shouldLog[id] = false;
        return res;
      } catch (err) {
        shouldLog[id] = false;
        throw err;
      }
    })(),
    logFunc(funcName, start, id),
  ]))[0];
}

export default asyncTimedFunc;
