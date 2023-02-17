const STATUSES = {
    'Новый': 'Новый',
    'Принят': 'Принят',
    'Передан': 'Передан',
    'Возврат': 'Возврат',
    'Завершён': 'Завершён',
}
const reserve = () => console.log('+Резерв');
const unreserve = () => console.log('-Резерв');

const writeOff = () => console.log('-Партии');
const reverseWriteOff = () => console.log('+Партии');

const assembleOrder = () => console.log('+Собрать заказ');
const disassembleOrder = () => console.log('-Собрать заказ');
class FiniteStateMachine {
    state = STATUSES.Новый;
    #transitions = {
        [STATUSES.Новый]: {
            [STATUSES.Принят]() {
                this.state = STATUSES.Принят;
                reserve();
            },
            [STATUSES.Передан]() {
                this.state = STATUSES.Передан;
                reserve();

                unreserve();
                assembleOrder();
                writeOff();
            },
            [STATUSES.Завершён]() {
                this.state = STATUSES.Завершён;
                reserve();

                unreserve();
                assembleOrder();
                writeOff();
            },
            [STATUSES.Возврат]() {
                this.state = STATUSES.Возврат;
                reserve();

                unreserve();
                assembleOrder();
                writeOff();

                disassembleOrder();
                reverseWriteOff();
            },
        },
        [STATUSES.Принят]: {
            [STATUSES.Передан]() {
                this.state = STATUSES.Передан;
                unreserve();
                assembleOrder();
                writeOff();
            },
            [STATUSES.Завершён]() {
                this.state = STATUSES.Завершён;
                unreserve();
                assembleOrder();
                writeOff();
            },
            [STATUSES.Возврат]() {
                this.state = STATUSES.Возврат;
                unreserve();
                assembleOrder();
                writeOff();

                disassembleOrder();
                reverseWriteOff();
            },
        },
        [STATUSES.Передан]: {
            [STATUSES.Завершён]() {
                this.state = STATUSES.Завершён;
            },
            [STATUSES.Возврат]() {
                this.state = STATUSES.Возврат;
                disassembleOrder();
                reverseWriteOff();
            },
        },
    };
    changeState(status) {
        if (this.#transitions[this.state] && status in this.#transitions[this.state]) {
            console.log(`Change state: ${this.state} -> ${status}`);
            this.#transitions[this.state][status].call(this);
        }
        else {
            console.error('ERROR TRANSFER TO:', status);
        }
    }
}

console.log('\n\nmachine#1');
const machine = new FiniteStateMachine();
machine.changeState(STATUSES.Принят);
machine.changeState(STATUSES.Принят);
machine.changeState(STATUSES.Завершён);
machine.changeState(STATUSES.Передан);
machine.changeState(STATUSES.Завершён);

console.log('\n\nmachine#2');
const machine2 = new FiniteStateMachine();
machine2.changeState(STATUSES.Принят);
machine2.changeState(STATUSES.Передан);
machine2.changeState(STATUSES.Возврат);
machine2.changeState(STATUSES.Завершён);

console.log('\n\nmachine#3');
const machine3 = new FiniteStateMachine();
machine3.changeState(STATUSES.Возврат);
