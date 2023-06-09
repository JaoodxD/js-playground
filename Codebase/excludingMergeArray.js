const group = [1, 4, 5];
const user = [1, 4, 5, 6];

const expect = [1, 4, 5, 6];

const result = group
  .concat(user)
  .filter((x) =>
    !(group.includes(x) && user.includes(x)));

console.log({ group, user, result });
