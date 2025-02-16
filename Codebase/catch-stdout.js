let output = ''
const originalWrite = process.stdout.write

process.stdout.write = (chunk, encoding, callback) => {
  output += chunk
  originalWrite.call(process.stdout, chunk, encoding, callback)
}

const data = [{ name: 'John', age: 25 }, { name: 'Jane', age: 27 }]
console.table(data)

process.stdout.write = originalWrite

console.log('Captured output:', JSON.stringify(output))
