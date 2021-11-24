import { reduce } from '@fxts/core';

export const sumAll = (iter: number[]) => reduce((a, b) => a + b, iter);

export const multipleAll = (iter: number[]) => reduce((a, b) => a * b, iter);

