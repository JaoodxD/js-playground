'use strict';

const names = ['dmytro', 'illya', 'maksym', 'evgen'];

console.log('IF..IF statements...');
for (const name of names) {
  if (name === 'dmytro') {
    console.log('Dimasik', 10);
  }
  if (name === 'illya') {
    console.log('Ilyuha', 20);
  }
  if (name === 'maksym') {
    console.log('Maksim', 30);
  }
  if (name === 'evgen') {
    console.log('Jenya', 40);
  }
}

console.log('\n\nSTRATEGIES...');
const strategies = {
  dmytro: (props) => console.log('Dimasik', 10, props),
  illya: () => console.log('Ilyuha', 20),
  maksym: () => console.log('Maksim', 30),
  evgen: () => console.log('Jenya', 40)
}
const call = (name, ...props) => strategies[name](...props);

names.forEach((name) => call(name, { kakoitoProps: 'ASDASASD' }));
