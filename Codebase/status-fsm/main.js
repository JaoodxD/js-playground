const STATUSES = {
    'Новый': 'Новый',
    'Принят': 'Принят',
    'Отказ': 'Отказ',
    'Передан': 'Передан',
    'Возврат': 'Возврат',
    'Завершён': 'Завершён',
}
class FiniteStateMachine {
    state = STATUSES.Новый;
    #transitions = {
        [STATUSES.Новый]: {
            [STATUSES.Принят]() {
                this.state = STATUSES.Принят;
            },
            [STATUSES.Передан]() {
                this.state = STATUSES.Передан;
            },
            [STATUSES.Завершён]() {
                this.state = STATUSES.Завершён;
            },
            [STATUSES.Возврат]() {
                this.state = STATUSES.Возврат;
            },
        },
        [STATUSES.Принят]: {
            [STATUSES.Передан]() {
                this.state = STATUSES.Передан;
            },
            [STATUSES.Завершён]() {
                this.state = STATUSES.Завершён;
            },
            [STATUSES.Возврат]() {
                this.state = STATUSES.Возврат;
            },
        },
        [STATUSES.Передан]: {
            [STATUSES.Завершён]() {
                this.state = STATUSES.Завершён;
            },
            [STATUSES.Возврат]() {
                this.state = STATUSES.Возврат;
            },
        },
    };
    changeState(status) {
        if (this.#transitions[this.state] && status in this.#transitions[this.state]) {
            this.#transitions[this.state][status].call(this);
            console.log('New state:', this.state);
        }
        else {
            console.error('ERROR TRANSFER TO:', status);
        }
    }
}

console.log('machine#1');
const machine = new FiniteStateMachine();
machine.changeState(STATUSES.Принят);
machine.changeState(STATUSES.Принят);
machine.changeState(STATUSES.Завершён);
machine.changeState(STATUSES.Передан);
machine.changeState(STATUSES.Завершён);

console.log('machine#2');
const machine2 = new FiniteStateMachine();
machine2.changeState(STATUSES.Принят);
machine2.changeState(STATUSES.Передан);
machine2.changeState(STATUSES.Возврат);
machine2.changeState(STATUSES.Завершён);
