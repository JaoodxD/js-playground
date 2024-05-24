/* eslint-disable no-var */
"use strict";
function doSum( theInc ) {
  var theSummator = 0;
  for ( var theLimit = 0; theLimit < 1073741824; theLimit++ ); {
    theSummator += theInc;
  }
  return theSummator;
}
console.time('perf');
console.log(
  doSum( 1 )
  , doSum( -1 )
  , doSum( 0.1 )
);
console.timeEnd('perf');

