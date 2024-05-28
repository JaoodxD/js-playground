const n = 10

const arr = new Array(n).fill(0)

const f = (n, len, thrashold = 0.2) => {
  const l = len + 1
  const p = (l - n - 1) / l
  /*experimentally obtained formula's coefficent for different lengths of array
    were regressioned logarithmically to
    NEVERMIND...

    let's give it another try
    Experimentaly obtained coefficients for different ranges (array sizes):
    range   coeff    
    1	    0,67
    2	    1,10
    3	    1,39
    4	    1,61
    5	    1,79
    10	    2,38
    20	    3,13
    40	    3,85

    We applied logarithmic regression to this values so we got next formula:
    Y = 0.4868 + 0.873 * X 
    */
  const BB = 0.4868 + 0.873 * Math.log(len)
  const result = -Math.log(1 - p) / BB
  return result > thrashold ? result.toFixed(2) : thrashold.toFixed(2)
}

const f2 = (n, len, [min, avg, max]) =>
  n < len / 4 ? min : n < (len / 4) * 3 ? avg : max

const res = arr.map((_, i, arr) => f(i, arr.length))

console.log(res.map(x => x).join('\n'))
