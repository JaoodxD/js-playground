class AccountCommand {
    constructor(operaion, account, amount) {
        this.operaion = operaion;
        this.account = account;
        this.amount = amount;
    }
}

class BankAccount {
    static collection = new Map();
    constructor(name) {
        this.name = name;
        this.balance = 0;
        BankAccount.collection.set(name, this);
    }

    static find(name) {
        return BankAccount.collection.get(name);
    }
}

const operaions = {
    Withdraw: {
        execute: (command) => {
            const account = BankAccount.find(command.account);
            account.balance -= command.amount;
        },
        undo: (command) => {
            const account = BankAccount.find(command.account);
            account.balance += command.amount;
        },
    },
    Income: {
        execute: (command) => {
            const account = BankAccount.find(command.account);
            account.balance += command.amount;
        },
        undo: (command) => {
            const account = BankAccount.find(command.account);
            account.balance -= command.amount;
        },
    },
};

class Bank {
    commands = [];

    operation(account, amount) {
        const operation = amount < 0 ? 'Withdraw' : 'Income';
        const { execute } = operaions[operation];
        const command = new AccountCommand(
            operation, account.name, Math.abs(amount)
        );
        this.commands.push(command);
        execute(command);
    }

    undo(count) {
        for (let i = 0; i < count; i++) {
            const command = this.commands.pop();
            const { operaion } = command;
            const { undo } = operaions[operaion];
            undo(command);
        }
    }

    showOperations() {
        console.table(this.commands);
    }
}

const bank = new Bank();
const account1 = new BankAccount('Maksym');
bank.operation(account1, 20000);
bank.operation(account1, -4000);

bank.showOperations();
console.table(account1);

bank.undo(1);

bank.showOperations();
console.table(account1);
