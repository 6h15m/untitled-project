import { pipe, reduce } from "@fxts/core";

export const join = (iter: IterableIterator<string>) =>
  pipe(
    iter,
    reduce((a, b) => `${a}${b}`)
  );
