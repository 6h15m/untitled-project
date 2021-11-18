import { pipe, reduce } from "fxts-test";

export const join = (iter: IterableIterator<string>) =>
  pipe(
    iter,
    reduce((a, b) => `${a}${b}`)
  );
