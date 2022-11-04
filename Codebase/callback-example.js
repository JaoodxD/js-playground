'use strict';

const Dispatcher = (obj = {}) =>
    (newValue) => {
        obj = { ...obj, ...newValue }
        console.log({ obj });
    };

const callback = Dispatcher();

// context#1
{
    callback({ message: 'Hi' });
}

// context#2
{
    callback({ someOtherMessage: 'Hello World' });
}
