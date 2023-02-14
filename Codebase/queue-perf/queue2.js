class QueueNode {
    value;
    nextNode;
    constructor(value) {
        this.value = value;
    }
}

class Queue {
    #head;
    #tail;

    push(value) {
        const newNode = new QueueNode(value);
        if (!this.#head) return void (this.#head = this.#tail = newNode);
        this.#tail = this.#tail.nextNode = newNode;
    }

    shift() {
        const node = this.#head;
        if (!node) return;
        const { value } = node;
        this.#head = this.#head.nextNode;
        if (!this.#head) this.#tail = undefined;
        return value;
    }

    printQueue() {
        this.#printNode(this.#head);
    }

    #printNode(node) {
        if (!node) return;
        console.log(node.value)
        this.#printNode(node.nextNode);
    }
}

exports.Queue = Queue;
