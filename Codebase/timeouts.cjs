setTimeout(() => {
  console.log('timeout 1');
}, 10);
setTimeout(() => {
  console.log('timeout 2');
});

Promise.reject('promise').catch(console.log)
Promise.resolve('promise 2').then(x => console.log(x))
Promise.resolve('promise with timeout').then(x => setTimeout(() => console.log(x)), 11)

console.log('task 2')
console.log('task 1')

