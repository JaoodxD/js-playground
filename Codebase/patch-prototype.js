'use strict';

const call = Function.prototype.call;

Function.prototype.call = function () {
    console.log('ніт');
    call(...arguments);
}

const func = () => console.log('Hello world');
func();
