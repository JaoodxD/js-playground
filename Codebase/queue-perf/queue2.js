class QueueNode {
    constructor(value) {
        this.value = value;
        this.nextNode = undefined;
    }
}

class Queue {
    #head;
    #tail;
    length = 0;

    push(value) {
        this.length++;
        const newNode = new QueueNode(value);
        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
            return;
        }
        this.#tail = this.#tail.nextNode = newNode;
    }

    shift() {
        this.length = Math.max(this.length - 1, 0);
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

    *[Symbol.iterator]() {
        let element = this.#head;
        while (element) {
            yield element.value;
            element = element.nextNode;
        }
    }
    *customInterator() {
        let element = this.#head;
        while (element) {
            console.log(`Zdarova: ${element.value}`)
            yield element.value;
            element = element.nextNode;
        }
    }

    valueOf() {
        /* const arr = [];
        let node = this.#head;
        while (node) {
            arr.push(node.value);
            node = node.nextNode;
        } */
        let node = this.#head;
        const arr = new Uint32Array(this.length);
        let i = 0;
        while (node) {
            arr[i++] = node.value;
            node = node.nextNode;
        }
        return arr;
    }
}

exports.Queue = Queue;
