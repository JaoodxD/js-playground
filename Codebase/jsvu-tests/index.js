/* eslint-disable no-var */
"use strict";
function doSum( theInc ) {
  var theSummator = 0;
  for ( var theLimit = 0; theLimit < 1073741824; theLimit++ ) {
    theSummator += theInc;
  }
  return theSummator;
}

var start = performance.now();

console.log(
  doSum( 1 )
  , doSum( -1 )
  , doSum( 0.1 )
);

console.log(performance.now() - start);
