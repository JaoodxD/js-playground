'use strict';

const obj = {
    name: 'Maksym',
    greet: function () {
        console.log('Hello, world!');
    }
};

obj.greet();
obj.greet = function () {
    console.log(`Hello, ${this.name}!`);
}
obj.greet();

