module.exports = class LinkedListQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  push(item) {
    this.length++;
    const last = this.last;
    const element = { prev: last, next: null, item };
    if (last) last.next = element;
    else this.first = element;
    this.last = element;
  }

  shift() {
    const element = this.first;
    if (!element) return null;
    this.length--;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
      this.first.prev = null;
    }
    return element.item;
  }
}
