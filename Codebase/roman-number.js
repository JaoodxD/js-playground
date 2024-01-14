async function translate (n) {
  const api =
    'https://api.funtranslations.com/translate/roman-numerals.json?text='
  const url = api + n
  const res = await (await fetch(url)).json()
  return res.contents.translated
}

console.log(await translate(12))
