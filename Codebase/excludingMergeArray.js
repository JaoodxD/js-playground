const defaultValues = [1, 2, 3];

const result = [1, 2, 4];

const diff = [3, 4];

const realDiff = defaultValues
  .concat(result)
  .filter((x) =>
    !(defaultValues.includes(x) && result.includes(x)));

console.table({ defaultValues, result, expected: diff, realDiff });
