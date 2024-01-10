function pipe () {
  const functions = []
  queueMicrotask(exec)
  return { run }

  function run (func, ...args) {
    functions.push([func, args])
    return { run }
  }

  function exec () {
    const next = nextFunction()
    if (!next) return
    const [func, args] = next
    func(...args, exec)
  }

  function nextFunction () {
    return functions.shift()
  }
}

pipe()
  .run(readConfig, 'readConfig')
  .run(doQuery, 'doQuery')
  .run(httpGet, 'httpGet')
  .run(readFile, 'readFile')

function readConfig (text, callback) {
  console.log(text)
  setTimeout(callback, Math.random() * 1000)
}
function doQuery (text, callback) {
  console.log(text)
  setTimeout(callback, Math.random() * 1000)
}
function httpGet (text, callback) {
  console.log(text)
  setTimeout(callback, Math.random() * 1000)
}
function readFile (text, callback) {
  console.log(text)
  setTimeout(callback, Math.random() * 1000)
}
