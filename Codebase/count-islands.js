const countIslands = (matrix) => {
  let count = 0;
  for (let x = 0; x < matrix.length; x++)
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y]) {
        count++;
        dfs(matrix, x, y);
      }
    }
  return count;
};

const dirs = [-1, -1, -1, 0, -1, 1, 0, -1, 0, 1, 1, -1, 1, 0, 1, 1];

const dfs = (matrix, x, y) => {
  if (!(matrix[x] || [])[y]) return;
  matrix[x][y] = 0;
  for(let i = 0; i < dirs.length - 1; i += 2)
    dfs(matrix, x + dirs[i], y + dirs[i + 1]);
};


const matrix = [
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 1, 1, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 1, 1, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 1, 0
  ],
  [
    0, 0, 0, 0, 0,
    1, 1, 1, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ]
];

const result = countIslands(matrix);
console.log(result);
