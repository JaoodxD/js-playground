function pipe () {
  const functions = []
  queueMicrotask(exec)
  return { do: push }

  function push (name, func) {
    functions.push([name, func])
    return { do: push }
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
  .do('readConfig', readConfig)
  .do('doQuery', doQuery)
  .do('httpGet', httpGet)
  .do('readFile', readFile)

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
