/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 */
class Queue {
  #elements;
  #offset = 0;
  /**
   * Creates a queue.
   * @param {array} [elements]
   */
  constructor(elements) {
    this.#elements = Array.isArray(elements) ? elements : [];
  }

  /**
   * Adds an element to the back of the queue.
   * @public
   * @param {number|string|object} element
   */
  enqueue(element) {
    this.#elements.push(element);
    return this;
  }

  /**
   * Adds an element to the back of the queue.
   * @public
   * @param {number|string|object} element
   */
  push(element) {
    return this.enqueue(element);
  }

  /**
   * Dequeues the front element in the queue.
   * @public
   * @returns {number|string|object}
   */
  dequeue() {
    if (this.size() === 0) return null;

    const first = this.front();
    this.#offset += 1;

    if (this.#offset * 2 < this.#elements.length) return first;

    // only remove dequeued elements when reaching half size
    // to decrease latency of shifting elements.
    this.#elements = this.#elements.slice(this.#offset);
    this.#offset = 0;
    return first;
  }

  /**
   * Dequeues the front element in the queue.
   * @public
   * @returns {number|string|object}
   */
  shift() {
    return this.dequeue();
  }

  /**
   * Dequeues the front element in the queue.
   * @public
   * @returns {number|string|object}
   */
  pop() {
    return this.dequeue();
  }

  /**
   * Returns the front element of the queue.
   * @public
   * @returns {number|string|object}
   */
  front() {
    return this.size() > 0 ? this.#elements[this.#offset] : null;
  }

  /**
   * Returns the back element of the queue.
   * @public
   * @returns {number|string|object}
   */
  back() {
    return this.size() > 0 ? this.#elements[this.#elements.length - 1] : null;
  }

  /**
   * Returns the number of elements in the queue.
   * @public
   * @returns {number}
   */
  size() {
    return this.#elements.length - this.#offset;
  }

  /**
   * Checks if the queue is empty.
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * Returns the remaining elements in the queue as an array.
   * @public
   * @returns {array}
   */
  toArray() {
    return this.#elements.slice(this.#offset);
  }

  /**
   * Clears the queue.
   * @public
   */
  clear() {
    this.#elements = [];
    this.#offset = 0;
  }

  /**
   * Creates a shallow copy of the queue.
   * @public
   * @return {Queue}
   */
  clone() {
    return new Queue(this.#elements.slice(this.#offset));
  }

  /**
   * Creates a queue from an existing array.
   * @public
   * @static
   * @param {array} elements
   * @return {Queue}
   */
  static fromArray(elements) {
    return new Queue(elements);
  }
}

exports.Queue = Queue;
