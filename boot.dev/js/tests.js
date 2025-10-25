const TWO_FACTOR = Symbol("twoFactor");

const test = {
 [TWO_FACTOR]: 'test'
}

console.log(TWO_FACTOR);
console.log(test);
console.log(test['twoFactor']); // undefined
console.log(test[TWO_FACTOR]); // test
