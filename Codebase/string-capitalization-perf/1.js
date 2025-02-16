#!/usr/bin/env node
Benchmark = require("benchmark")

function generateWords(numWords) {
  const words = [];

  const generateWord = () => {
    let word = '';
    const defisPositions = [];

    // Генерація двох позицій для дефісів
    while (defisPositions.length < 2) {
      const pos = Math.floor(Math.random() * 8) + 1; // Позиція дефісу від 1 до 8
      if (!defisPositions.includes(pos)) {
        defisPositions.push(pos);
      }
    }

    // Створюємо слово
    for (let i = 0; i < 20; i++) {
      if (defisPositions.includes(i)) {
        word += '-'; // додаємо дефіс на обрану позицію
      } else {
        const isUpper = Math.random() > 0.5; // випадково вибираємо велику чи малу літеру
        const char = isUpper
          ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) // Велика літера
          : String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Мала літера
        word += char;
      }
    }

    return word;
  };

  for (let i = 0; i < numWords; i++) {
    words.push(generateWord());
  }

  return words;
}


function canonicalHeaderName1Opt3(name) {
  var upper = true;
  var result = '';
  var StringFromCharCode = String.fromCharCode;

  var len = name.length;
  for (var i = 0; i < len; i++) {
    const code = name.charCodeAt(i);

    // 'a' -> 97, 'z' -> 122
    if (upper && code >= 97 && code <= 122) {
      result += StringFromCharCode(code - 32); // to uppercase
    }

    // 'A' -> 65, 'Z' -> 90
    else if (!upper && code >= 65 && code <= 90) {
      result += StringFromCharCode(code + 32); // to lowercase
    }

    else {
      result += name[i];
    }

    // '-' is char code 45
    upper = (code === 45);
  }

  return result;
}
function doOpt6( name ) {
  var code;
  var result = (
    ( ( code = name.charCodeAt( 0 ) ) >= 97 && code <= 122 )
      ? ( String.fromCharCode( ( code & 223 ) ) )
      : ( name[ 0 ] )
  );



  for ( var i = 1; i < name.length; i++ ) {


    result += (
      ( ( code = name.charCodeAt( i ) ) === 45 )
        ? (
          `-${ (
            ( ( code = name.charCodeAt( ++i ) ) >= 97 && code <= 122 )
              ? ( String.fromCharCode( ( code & 223 ) ) )
              : ( name[ i ] )
          ) }`
        )
        : (
          (
            ( code >= 65 && code <= 90 )
              ? String.fromCharCode( ( code | 32 ) )
              : name[ i ]
          )

        )
    );

  }

  return result;
}


var wordCount = 10000;
var wordsArray = generateWords(wordCount);
var suite = new Benchmark.Suite
suite.add("baseline canonicalHeaderName1Opt3", function(){
  for (var i = 0; i < wordCount; i++) {
    canonicalHeaderName1Opt3(wordsArray[i]);
  }
})
suite.add("doOpt6", function(){
  for (var i = 0; i < wordCount; i++) {
    doOpt6(wordsArray[i]);
  }
})
suite.on('cycle', function(event) {
  console.log(String(event.target));
})
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
suite.run()
