export const objToArray = function* <T>(obj: { [index: string | number]: T }): Generator<T> {
  for (const o in obj) yield obj[o];
};
