import { reduce } from '@fxts/core';

export const join = (iter: IterableIterator<string>, sep: string = '') =>
  reduce((a, b) => `${a}${sep}${b}`, iter);

export const sumAll = (iter: number[]) => reduce((a, b) => a + b, iter);

export const multipleAll = (iter: number[]) => reduce((a, b) => a * b, iter);
