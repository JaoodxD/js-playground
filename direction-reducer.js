const dirReduc = (arr) => {
    const dic = {
        'EAST': 'WEST',
        'WEST': 'EAST',
        'NORTH': 'SOUTH',
        'SOUTH': 'NORTH'
    };
    let stack = [];
    while (arr.length) {
        let dir = arr.shift();
        if (stack[stack.length - 1] === dic[dir]) {
            stack.pop();
        }
        else {
            stack.push(dir);
        }
    }
    console.log(stack);
    return stack;
};

dirReduc(['EAST', 'WEST', 'NORTH', 'NORTH', 'EAST']);

