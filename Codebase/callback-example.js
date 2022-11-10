'use strict';

const Dispatcher = (obj = {}) =>
    (newValue) => {
        obj = { ...obj, ...newValue }
        console.dir({ obj }, { depth: null });

    };

const callback = Dispatcher();

// context#1
{
    callback({ message: 'Hi', order: [['id', 'asc']] });
}

// context#2
{
    callback({ someOtherMessage: 'Hello World', order: [['name', 'desc']] });
}

// context#3
{
    callback({ someOtherOtherMessage: 'Zdarova Yopta', order: [['country', 'asc']] });
}

// context#4
{
    callback({ id: [1,3,6,8,10], order: [['id', 'desc']] });
}
