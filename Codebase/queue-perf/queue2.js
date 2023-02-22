class QueueNode {
    constructor(value) {
        this.value = value;
        this.nextNode = undefined;
    }
}

class Queue {
    #head;
    #tail;

    push(value) {
        const newNode = new QueueNode(value);
        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
            return;
        }
        this.#tail = this.#tail.nextNode = newNode;
    }

    shift() {
        const node = this.#head;
        if (!node) return;
        this.#head = this.#head.nextNode;
        if (!this.#head) this.#tail = undefined;
        return node.value;
    }

    printQueue() {
        const queue = this.valueOf();
        console.log(queue);
    }

    valueOf() {
        const arr = [];
        let node = this.#head;
        while (node) {
            arr.push(node.value);
            node = node.nextNode;
        }
        return arr;
    }
}

exports.Queue = Queue;
