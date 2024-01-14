const name = ['shirt', 'trousers']
const color = ['white', 'black']

function magic (arr1, arr2) {
  const resultArr = []

  for (const i of arr1) {
    for (const j of arr2) {
      resultArr.push([i, j])
    }
  }
  return resultArr
}

const result = magic(name, color)
console.log(result)
