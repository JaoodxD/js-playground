function pipe () {
  const functions = []
  queueMicrotask(exec)
  return { run }

  function run (name, func) {
    functions.push([name, func])
    return { run }
  }

  function exec () {
    const next = nextFunction()
    if (!next) return
    const [name, func] = next
    func(name, exec)
  }

  function nextFunction () {
    return functions.shift()
  }
}

pipe()
  .run('readConfig', readConfig)
  .run('doQuery', doQuery)
  .run('httpGet', httpGet)
  .run('readFile', readFile)

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
