( () => {
  var timings = { var: [], const: []};
  function useVar(a)   { var n = 0; for(var i=0; i < 100; ++i) { var s1 = a + i; n += s1 } return n }
  function useConst(c) { let n = 0; for(let i=0; i < 100; ++i) { const s2 = c + i; n += s2 } return n }
  function run(f) { 
    var t1 = performance.now();
    for (var i = 0; i < 10000000; ++i) f(i);
    var t2 = performance.now();
    return t2 - t1;
  }
  
  for (let i = 0; i < 4; i++) {
    timings.const.push(run(useConst));
  }
  
  for (let i = 0; i < 4; i++) {
    timings.var.push(run(useVar));
  }
  
  
  for(var t in timings)
      console.log(t, timings[t].reduce((s, v) => s + v, 0) / timings[t].length);
  console.table(timings)
     
})();
