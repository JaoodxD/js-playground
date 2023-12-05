const wait = ms => new Promise(res => setTimeout(res, ms))

async function* f (name) {
  for (let i = 0; i < 3; i++) {
    yield name + i
  }
}

async function run (letter) {
  for await (const msg of f(letter)) {
    console.log(msg)
  }
}

run('A')
run('B')

