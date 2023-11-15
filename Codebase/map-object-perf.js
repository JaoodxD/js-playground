const hrtime = process.hrtime.bigint;
const timeMS = ts => Number(hrtime() - ts)/1e6 | 0;

const limit = 23;
// формируем содержимое кэша из пар ключ-значение
const content = new Array(1 << limit)
  .fill()
  .map((_, i) => [
    i.toString(16).padStart(8, '0') // key
  , i                               // val
  ]);

console.log('exp | map gen | obj gen | map scan | obj scan');
// прогоняем тесты для размеров от 2^1 до 2^23
for (let pow2 = 1; pow2 <= limit; pow2++) {
  const sz = 1 << pow2;

  const slice = content.slice(0, sz);

  // генерируем кэш на Map
  const tsGM = hrtime();
  const map = new Map(slice);
  const tmGM = timeMS(tsGM);

  // генерируем кэш на Object
  const tsGO = hrtime();
  const obj = Object.fromEntries(slice);
  const tmGO = timeMS(tsGO);

  // формируем миллион случайных ключей для поиска
  const keys = new Array(1e6)
    .fill()
    .map(_ => ((Math.random() * sz) | 0).toString(16).padStart(8, '0'));

  // прогоняем поиск по Map
  const tsSM = hrtime();
  keys.forEach(v => map.get(v));
  const tmSM = timeMS(tsSM);

  // прогоняем поиск по Object
  const tsSO = hrtime();
  keys.forEach(v => obj[v]);
  const tmSO = timeMS(tsSO);

  // принудительно вызываем Garbage Collector
  gc();

  console.log(
    pow2.toString().padStart(3, ' ')
  , '|'
  , tmGM.toString().padStart(7, ' ')
  , '|'
  , tmGO.toString().padStart(7, ' ')
  , '|'
  , tmSM.toString().padStart(8, ' ')
  , '|'
  , tmSO.toString().padStart(8, ' ')
  );
}
