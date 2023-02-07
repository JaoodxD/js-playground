class Action {
    name;
    #do;
    #undo;
    constructor(name = 'default name', execMethod = () => { }, undoMethod = () => { }) {
        this.name = name;
        this.#do = execMethod;
        this.#undo = undoMethod;
    }
    execute() {
        this.#do();
    }
    undo() {
        this.#undo();
    }
};

const account = new Proxy({ money: 0 }, {
    get(target, key) {
        console.log(`Accessing to ${key}`, target[key]);
        if (key in target) return target[key];
        throw new Error('No such key in the object');
    },
    set(target, key, value) {
        console.log(`Setting ${key} to`, value);
        if (target[key] + value < 0) return void console.log('Money can\'t be negative number');
        target[key] = value;
    }
})
const transferMoney = function (amount) {
    this.money += amount;
};
const add10UAH = transferMoney.bind(account, 10);
const remove10UAH = transferMoney.bind(account, -10);
const action1 = new Action('Add money', add10UAH, remove10UAH);

action1.execute();
action1.undo();
action1.undo();

