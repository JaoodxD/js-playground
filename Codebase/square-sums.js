const test = (n) => {
  let sum = n;
  const arr = [];
  for (let i = Math.floor(Math.sqrt(n)); i > 0; i--) {
    const square = i ** 2;
    if (sum >= square) {
      sum -= square;
      arr.push({ i, square });
    }
    if (!sum) return arr;
  }
  return false;
};

const testSequence = (n) => {
  for (let i = 1; i <= n; i++){
    const check = test(i);
    if (check) console.log(i, check.map(({i}) => i+'²').join(' + '));
  }
}

testSequence(100);
