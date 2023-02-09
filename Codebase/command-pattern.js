class Action {
    name;
    #do;
    #undo;
    #isExecuted = false;
    constructor(name = 'default name', execMethod = () => { }, undoMethod = () => { }) {
        this.name = name;
        this.#do = execMethod;
        this.#undo = undoMethod;
    }
    execute() {
        if (this.#isExecuted) return void console.log('Already executed');
        this.#do();
        this.#isExecuted = true;
    }
    undo() {
        if (!this.#isExecuted) return void console.log('Nothing to undo');
        this.#undo();
        this.#isExecuted = false;
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
        if (target[key] + value < 0) return void console.log(`Money can't be negative number`);
        target[key] = value;
    }
})
const transferMoney = function (amount) {
    this.money += amount;
};
const add10UAH = transferMoney.bind(account, 10);
const remove10UAH = transferMoney.bind(account, -10);
const add8UAH = transferMoney.bind(account, 8);
const remove8UAH = transferMoney.bind(account, -8);
const action1 = new Action('Payment for drink', add10UAH, remove10UAH);
const action2 = new Action('Payment for snacks', add8UAH, remove8UAH);

action1.undo(); //fires error on nothing to undo
action2.undo(); //fires error on nothing to undo

action1.execute();
action2.execute();

action1.undo();
action2.undo();

action1.undo(); //fires error on second undo
action2.undo(); //fires error on second undo
