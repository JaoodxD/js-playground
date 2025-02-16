class Test {
  static #helper() {
      console.log('helper')
  }
  constructor() {
      Test.#helper()
  }
}

new Test()
