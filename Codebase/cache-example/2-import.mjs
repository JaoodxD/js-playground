const readJson = async path => {
  const data = await import(path, {
    with: { type: 'json' }
  })
  return data.default
}

console.time('parse')
for (let i = 0; i < 1000; i++) {
  await readJson('./resource.json')
}
console.timeEnd('parse')
