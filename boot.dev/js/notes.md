https://www.youtube.com/watch?v=OOOfBC1grl0

# HOISTING 
JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables, classes, or imports to the top of their scope, prior to execution of the code


# MULTIPLE RETURN STATEMENTS
In Js you can't simply return many values in a function like you could in python.
That is why when we need that we are usually using object or array.

# VAR SCOPE
- function scope not block scope as it is expected
  Global Scope:
  Variables declared globally have the highest level of scope and can be accessed from anywhere in your code.
  In browsers, global variables are properties of the window object. For example, window.myGlobalVar = 'hello world' defines a global variable.
  In Node.js, global variables are properties of the global object: global.myGlobalVar = 'hello world'.
  Module Scope:
  In ES modules (both in Node.js and modern browsers), variables declared at the top level of a module are scoped to that module. They are not added to the global scope.
  In the browser, using <script type="module"> creates a module scope for that script.
  Function Scope:
  Variables declared with var (we try to avoid this) are limited to the function scope. They are accessible only within that function and any nested functions.
  Block Scope:
  ES6 introduced block scope with the let and const keywords. A block is typically defined by curly braces {}, like in if statements, loops, and other blocks of code.
  Variables declared with let and const are confined to their block, making them more predictable and reducing the chances of accidental variable hoisting.
# Anonymous functions
- no name
- useful when creating a function to be used only once, or to create a quick closure

# using a named function
```js
  function double(a) {
    return a + a;
  }
  conversions(double, 1, 2, 3);
  // 2 4 6
```
```js
// using an anonymous function
conversions(
  function (a) {
    return a + a;
  },
  1,
  2,
  3,
);
// 2 4 6
```

Function called by test internally is an anonymous function
```js
    function test(a, b) {
      return function(a, b) {a + b}
    }
```


# IIFE - immediately invoked function expression
```js
    (function () {
  console.log("JavaScript: at least it's not Java");
})();


// JavaScript: at least it's not Java
```

```js
const result = (function (a, b) {
  return a + b;
})(1, 2);

console.log(result);
// 3
```

The function is defined and then immediately called. It looks nasty, but it's occasionally useful for a couple of reasons:

Scope: It has its own scope
Expression: Can be convenient for computing a value as a single expression (like above)
Async: Can be used to quickly run code in an async function (we'll cover this later)

# 😵‍💫❗YOU CAN DO THAT 
```js
  const total = function calculateTotal(numMessages, bytesPerMessage) {
  return numMessages * bytesPerMessage;
  }(100, 24);
```


# *THIS* KEYWORD
# 1. EXPECTED BEHAVIOUR
This refers to an object that it was invoked in
```js
  const person = {
    name: "test",
    getName() {
      return this.name
    }
  }

  console.log(person.getName())
```

# 2. Window Context
*This* is not limited to objects or classes. That's where the problems start.
In the global window context This refers to the window
```js
 
  console.log(this) // Window
```
# 3. Node context Strict Mode
console.log(this) // undefined

# 4. Node context old
console.log(this) // {}

# 5. Arrow functions
Arrow functions inherit value of this from the parent scope
In the example below this would result in undefined - we are invoking it in node runtime in strict mode, global this 
in this context is undefined

```js
const person = {
  name: "test",
  getName: () =>  {
    return this.name
  }
}

console.log(person.getName()) // UNDEFINED 

```

# ARROW FUNCTIONS
What's the Difference?
Fat arrow functions are usually declared as variables, while the function keyword may or may not be declared as a variable.
Fat arrow functions *handle object scoping in a more intuitive way* 
Fat arrow functions *don't work as constructors*
Fat arrow functions *do not have access to arguments*

❌ this will not work
```js
// const foo = (x, y ) => {
//   console.log(...arguments)
// }
//
// foo(1, 2 )
```

✅ this will
You can assign a standard function to a variable or you can make it a name foo
```js
const oldFoo = function(x, y) {
  console.log(...arguments)
}

oldFoo(1, 2) // 1, 2

function oldFoo2(x, y) {
  console.log(...arguments)
}

oldFoo2(1, 2) // 1, 2
```

With a fat-arrow function, the this keyword refers to the same context as its parent. In essence, fat arrow functions "preserve" the this context. That's why this this.firstName and this.lastName are undefined in this example:

```js
const author = {
  firstName: "Lane",
  lastName: "Wagner",
  getName: () => {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log(author.getName());
// Prints: undefined undefined
// because `this` still refers to the global object
// and `firstName` and `lastName` are not defined globally
```


# SPREAD
The spread syntax shallow-copies the properties of the objects you're spreading. If properties have the same name, the last (right-most) object's property will overwrite the previous ones
```js 
  function mergeTemplates(defaultTemplates, customTemplates) {
  return {
    ...defaultTemplates, 
    ...customTemplates
  }
  // ?
}
```

# BIND 
In js methods ARE NOT BOUND TO THEIR OBJECT BY DEFAULT. So if we want to use a method as a callback function we may 
run into issues.
For example we want to use getName from person object:

✅ Works as expected
```js
const person = {
  name: "name",
  getName() {
    console.log( this.name)
  }
}

person.getName()
```
❌ Will not work
```js
  const boundMethodTest = person.getName;
// boundMethodTest(); // TypeError: Cannot read properties of undefined (reading 'name')
```

✅ In order to use this method we need to bind it to the person object
```js
const boundMethodCorrect = person.getName.bind(person)
boundMethodCorrect() // name
```

# Callback with bind example
```js
const campaign = {
  name: "Welcome Campaign",
  maxMessages: 100,
  sentMessages: 30,
  sendMessage() {
    this.sentMessages++;
  },
};

function sendWelcome(name, callback) {
  callback();
  console.log(`Sending: "Welcome ${name}! We are so glad you are here."`);
}

console.log("Campaign Messages:", campaign.sentMessages);

// don't touch above this line

sendWelcome("Tyler", campaign.sendMessage.bind(campaign));

// don't touch below this line

console.log("Campaign Messages:", campaign.sentMessages);
```


# CLASSES 
Templates for creating objects. 

```js
    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
     }
  }
  const user = new User("Lane", 100);
```

❗ *Class* declaration creates a new class
❗ *constructor* is a method that is called when new object (new instance of a class) is created
❗ *new* keyword calls the constructor method and creates a new instance of the class

 By default all class properties are public, they can be accessed and modified from outside the class. 
```js
  const film = new Movie('Pulp Fiction')
  console.log(film.name);
  film.name = "Fuck you that's why"
  console.log(film.name) // Fuck you that's why
```
# PRIVATE PROPERTIES + SETTERS AND GETTERS
To get a private property define it at the top of the class with a hashtag
```js
class Movie2 {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get title() {
    return this.#name;
  }
  set title(newTitle) {
    return this.#name = newTitle
  }
}

const film2 = new Movie2("Plebania");
console.log(film2.name); // undefined
console.log(film2.title)
```

# STATIC METHODS AND PROPERTIES
Can't be used by the instances of a class (objects created from the class templates). Useful for some internal 
calculations etc within a class.

```js
  class TestStatic {
  static count = 0;
  
  constructor(name) {
    this.name = name
  }
  
  static getCount() {
    console.log(this.count);
    return this.count;
  }

  // static member is not accessible - with private property we could access this 
  getCountFromInstance() {
    return this.count 
  }
}


  const test1 = new TestStatic("test1")
  console.log(test1.name) // test1

  test1.getCount() //: test1.getCount is not a function
  console.log(test1.count) // undefined
```


# STATIC METHODS ANOTHER EXAMPLE
- You can access class itself
- you can call some methods on the class from within the constructor function

```js 
  class Message {
  static TOTAL_MESSAGES = 0;
  static TOTAL_MESSAGE_LENGTH = 0;


  constructor(recipient, sender, body) {
    this.recipient = recipient;
    this.sender = sender;
    this.body = body;
    Message.TOTAL_MESSAGES++
    Message.TOTAL_MESSAGE_LENGTH  += body.length
  }

  static getAverageMessageLength() {
    console.log(Message.TOTAL_MESSAGES);
    console.log(Message.TOTAL_MESSAGE_LENGTH);
    return Math.round(this.TOTAL_MESSAGE_LENGTH / this.TOTAL_MESSAGES )
  }
}

const t = new Message('🍆', "🚀", "Cześć Marysia");
const t2 = new Message('🍆🍆', "🚀🚀", "Cześć Marysia sia");
console.log(Message.getAverageMessageLength())
```

# Getters and Setters 
Look like static methods but are accessed like properties without "()"
Notice that we've renamed this.name to this._name in our constructor to avoid a name collision with the getter itself.

```js
  class User {
  constructor(name, age) {
    this._name = name;
    this.age = age;
  }

  get name() {
    return this._name.toUpperCase();
  }
}

const lane = new User("Lane", 30);
console.log(lane.name); // LANE
```

```js
  class User {
  constructor(name, age) {
    this.name = name;
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (value < 0) {
      throw new Error("Age can't be negative.");
    }
    this._age = value;
  }
}

const lane = new User("Lane", 29);
lane.age = -5; // "Age can't be negative."
console.log(lane.age); // 29
```


Private Methods
Definition: Methods prefixed with # (e.g., #myMethod()), introduced in ES2022 for JavaScript classes.
Access: Only accessible within the class where they're defined. Cannot be called from outside the class or from instances.
Purpose: Encapsulate internal logic, prevent external access, and avoid name conflicts.
Static Methods
Definition: Methods prefixed with static (e.g., static myMethod()), available since ES6.
Access: Called directly on the class itself (e.g., ClassName.myMethod()), not on instances. Instances don't have access to them.
Purpose: Provide utility functions or behaviors that don't depend on instance state, like factory methods or constants.
Key Differences
Scope: Private methods are instance-bound and hidden; static methods are class-bound and shared.
Invocation: Private: this.#method() inside the class; Static: Class.method() outside.
Use Case: Private for internal encapsulation; Static for class-level operations without needing an instance.

# INHERITANCE
- Classes can inherit properties from other classes we do that using *extends* keyword
```js
class Sender {
  constructor(recipient) {
    this.recipient = recipient;
  }
}

class SMSSender extends Sender {
  sendMessage(message) {
    console.log(`Sending SMS to ${this.recipient}: ${message}`);
  }
}

class EmailSender extends Sender {
  sendMessage(message) {
    console.log(`Sending email to ${this.recipient}: ${message}`);

  }
}

const t = new SMSSender('TEST')
const te = new EmailSender('email')

t.sendMessage("Hello")
te.sendMessage("Idk")
// Sending SMS to TEST: Hello
// Sending email to email: Idk

```

# SUPER
The example from above works fine, but what if we want to add a constructor function to a class that inherits some 
properties from another class? In such case we need to call a constructor from that parent function too. 
For example lets say we want to add extra property to SMSSender class. Without super it will not work.
```js
class SMSSender extends Sender {
  constructor(someProperty, recipient) {
    super(recipient);
    this.someProperty = someProperty;
  }
  sendMessage(message) {
    console.log(`Sending SMS to ${this.recipient}: ${message}`);
  }
}
```

We can also use it to call parent method:
```js

class SMSSenderExtended extends SMSSender {
  constructor(someProperty, recipient) {
    super(recipient, someProperty);
  }
  send(message) {
    super.sendMessage(message)
  }
}

const t = new SMSSenderExtended(`some prop`, `recipient`)
t.send('whaaaaat')

```

# Another example
```js
class Sender {
  constructor(recipient) {
    this.recipient = recipient;
  }

  formatMessage(message) {
    return `To: ${this.recipient}, Message: ${message}`;
  }
}

class SMSSender extends Sender {
  constructor(recipient) {
    super(recipient)
  }
  formatMessage(message) {
    return `${super.formatMessage(message)} [SMS]`
  }
}

class EmailSender extends Sender {
  constructor(recipient) {
    super(recipient)
  }
  formatMessage(message) {
    return `${super.formatMessage(message)} [Email]`

  }
}

const t = new EmailSender('recipient')
console.log(t.formatMessage('Hi there'))


```

# INHERITANCE BEFORE CLASSES AND HOW IT ALL WORKS UNDER THE HOOD
Classes are just syntactic sugar for prototypes - underlying mechanism for inheritance. 
Every object in js has a prototype. It is stored internally in the property named __proto__ 
When object "inherits" from the parent it simply means that the parent is its 
prototype. At the very beginning of every prototype chain there is a prototype object. 
We can still create an object that has its prototype by using Object.create()
So when we create a new object its prototype is Object.prototype and Object.protytpe.__proto__ = null
```js
const newObj = {}
console.log(newObj.__proto__ === Object.prototype) // true
```
With classes, it's the same under the hood. When we create a class we also create an object who acts as the 
prototype for all new instances. 

```js
const pureTitan = {
  // (define a parent object / prototype)
  name: "Eren's mom",
  speak(msg) {
    console.log("*titan noises*");
  },
};
pureTitan.speak();
// *titan noises*

const beastTitan = Object.create(pureTitan); // (define a child)

console.log(beasTitan.__proto__ === pureTitan)

console.log(beastTitan.name); // (accessing .name from pureTitan)
console.log(beastTitan.__proto__.name); // (accessing .name from pureTitan)
// Eren's mom

beastTitan.name = "Zeke";
beastTitan.speak = function () {
  console.log(`${this.name} says, "I'm the Beast Titan"`);
};

beastTitan.speak();
// Zeke says, "I'm the Beast Titan"
```

# Object.getPrototypeOf() 
returns the prototype of an object

```js
const pureTitan = {
  name: "Eren's mom",
};

const beastTitan = Object.create(pureTitan);
beastTitan.name = "Zeke";

console.log(beastTitan); // { name: "Zeke" }
console.log(Object.getPrototypeOf(beastTitan)); // { name: "Eren's mom" }
console.log(Object.getPrototypeOf(Object.getPrototypeOf(beastTitan))); // {} (Object.prototype)
console.log(
        Object.getPrototypeOf(
                Object.getPrototypeOf(Object.getPrototypeOf(beastTitan)),
        ),
); // null (end of the chain)
```

# How Are Parent Members Accessed?
You might think that using Object.create() copies the properties from the parent object to the child object:

const pureTitan = {
name: "Eren's mom",
};

const beastTitan = Object.create(pureTitan);
console.log(beastTitan.name); // Eren's mom

JavaScript looks within the beastTitan object for the name property and doesn't find it because we never set one. So 
it *checks its prototype (using Object.getPrototypeOf(beastTitan))*, which is pureTitan, and finds the name property 
there. It uses that value instead.

```js
const user = {

  name: "Default User",
  type: "user",
};

const adminUser = Object.create(user);
adminUser.type = "admin";

function isAdmin(object) {
  
  // this is the same
  const isProto =  adminUser === object.__proto__
  const isProto2 =  adminUser === Object.getPrototypeOf(object);

  return isProto && isProto2
}
const newO = Object.create(adminUser);
isAdmin(newO) // true
```


# for loop
```js
function bulkSendCost(numMessages) {
  let cost = 0;
  for (let i = 0; numMessages > i; i++ ) {
    let dynamicFee = i + i / 100
    cost += dynamicFee
    if (i === 3) break
  }
  return cost;
}

console.log(bulkSendCost(10))

// calculate max messages within budget
function maxMessagesWithinBudget(budget) {
  let costOfMessages = 0;
  let messagesCount = 0;
  for (messagesCount; budget > costOfMessages; messagesCount++ ) {
    costOfMessages += 1 + messagesCount * 0.01
    if (budget < costOfMessages) break;
  }
  return messagesCount
}
maxMessagesWithinBudget(10)

//❗The same function thath coulg go endlessly until break
function maxMessagesWithinBudget(budget) {
  let totalCost = 0;
  let count = 0;

  //❗empty condition
  for (let i = 0; ; i++) {
    const cost = 1.0 + i * 0.01;
    if (totalCost + cost > budget) {
      break;
    }
    totalCost += cost;
    count += 1;
  }

  return count;
}


```
# PRIME NUMBERS TASK 
A prime number is a natural number greater than 1 that has exactly two distinct positive divisors:
→ 1 and itself.

Function to check prime numbers
Prime numbers can't be even


```js
function printPrimes(max) {
  for (let i = 0; max >= i; i++) {
    
    // 2 is a prime but 2 % 2 === condition would be true so we need to handle 2 first otherwise we would skip it 
    if (i === 2 ) {
    console.log(i)
    continue
  }
    
    // check for even numbers as above 2 they are never primes
    if (i % 2 === 0) continue

    // we start by setting flag as true 
    let isAPrime = true
    
    // now we start another loop where we will go through every number up until the currently checked one
    for (let j = 3;  j < i;   j++) {

      //this means it is not a prime number we want to break this check and update isAPrime flag
      if (i % j === 0) {
        isAPrime = false
        break
      }
    }
    
    if (isAPrime) console.log(i)
  }
}

printPrimes(20);
```

# Optimized algorithm to check prime numbers
An example from above works, but we can optimize it a lot
Each not prime number must have at least two divisors cause 
n = a x b
One must be greater or equal to square root n
One must be smaller or equal to square root n
Why?
If both were smaller than multiplication of them would be smaller than n
If both were bigger would be bigger
Knowing this we can simply check all numbers up until square root n

So in second loop to avoid checking all the numbers until n we just check square root of n
i * i <= n 
The loop will stop if i * i is bigger than n
We also increment by two since even numbers are not primes
This way our loop is much more efficient.


```js
function printPrimes(max) {
  for (let i = 0; max >= i; i++) {
    
      if (i === 2 ) {
        console.log(i)
        continue
      }
    if (i % 2 === 0) continue

    let isAPrime = true
    
    // start with 3 as this is the minimum
    for (let j = 3;  j * j  <= i; j+=2) {

      //this means it is not a prime number we want to break this check and update isAPrime flag
      if (i % j === 0) {
        isAPrime = false
        break
      }
    }
    
    if (isAPrime) console.log(i)
  }
}

printPrimes(20);
```

# while
```js
function getMaxMessagesToSend(costMultiplier, maxCostInPennies) {

  let actualCostInPennies = 1.0;
  let maxMessagesToSend = 1;
  let balance = maxCostInPennies - actualCostInPennies;

  // console.log({maxCostInPennies}, {actualCostInPennies});

  while (balance >= actualCostInPennies   ) {
    actualCostInPennies *= costMultiplier;
    balance -= actualCostInPennies;
    maxMessagesToSend++;
    console.log(actualCostInPennies);
  }

  if (balance < 0) {
    maxMessagesToSend--;
  }

  return maxMessagesToSend;
}
```



# For in 
Used to loop over object keys

```js
const printMatchingProperties = (messageLog, searchTerm) => {

for (let key in messageLog) {
  if (key.startsWith(searchTerm)) console.log(`Found: ${key} ->  ${messageLog[key]}`)
} 
};
```

# string to array 
```js
const string = 'string'
const arr1 = string.split('')
const arr2 = Array.from(string)
console.log(arr1) // [ 's', 't', 'r', 'i', 'n', 'g' ]
console.log(arr2) //[ 's', 't', 'r', 'i', 'n', 'g' ]

const str2 = arr1.join("")
console.log(str2) // string

```

# String practice - SLICE VS SUBSTRING
❗ There are small differences between slice and substring, but generally substring is legacy and slice is a modern way

```js
const string = 'my string'
console.log(string.slice(0, -1)) // my strin
console.log(string.slice(0, -2)) // my stri


console.log(string.substring(0, string.length - 1)) // my strin
console.log(string.slice(0, string.length - 1)) // my strin
const slice = string.slice(0, string.length - 1)
console.log(slice); // my strin
console.log(string); // my string
```


```ts
export function formatLabels(...labels: string[]) {
  if (!labels || labels.length === 0) return "No Labels";
  if (labels.length === 1) return `Label: ${labels[0]}`
  
  let labelString = ``
  for (let label of labels) {
    labelString += label + ", "
  }
  return "Labels: " +  labelString.substring(0, labelString.length - 2)
  // ?
}

```
```ts
export function formatLabels(...labels: string[]) {
  if (labels.length === 0) {
    return "No Labels";
  }
  if (labels.length === 1) {
    return `Label: ${labels[0]}`;
  }
  return `Labels: ${labels.join(", ")}`;
}
```


### SET
```js
  const myArr = [1, 2, 3, 4];
  const emptySet = new Set()
  const populatedSet = new Set(myArr)
  console.log(populatedSet) // Set(4) { 1, 2, 3, 4 }
  populatedSet.delete(1)
  console.log(populatedSet) //Set(3) { 2, 3, 4 }
  populatedSet.add(1)
  console.log(populatedSet) // Set(4) { 2, 3, 4, 1 }
  console.log(populatedSet.has(1)) // true
  console.log(populatedSet.has(-1)) // false
  console.log(populatedSet.size) // 4
  
  const arrWithDuplicatedVals = [1, 1, 2, 2, 3, 3]
  const anotherSet = new Set(arrWithDuplicatedVals)
  console.log(anotherSet) // Set(3) { 1, 2, 3 }

  anotherSet.forEach(el => console.log(el))
  /*
   1
   2
   3
   */

for (const item of anotherSet) {
  console.log(item, 'here')
}
  /*
  1 here
  2 here
  3 here
  */
```

# 💥PRACTICE
Complete the findNumUniqueLabels function. It takes an array of strings and returns the number of unique values in the array.
```ts
  export function findNumUniqueLabels(formattedAddresses: string[]) {
    const set = new Set(formattedAddresses)
    return set.size;
  }
```

### MAP
A collection of key value pairs

```ts
  const myMap = new Map();
  myMap.set("key1", "some value")
  console.log(myMap) // Map(1) { 'key1' => 'some value' }
  myMap.set("key2", 1)
  
  console.log(myMap) // Map(2) { 'key1' => 'some value', 'key2' => 1 }
  console.log(myMap.size) // 2
  console.log(myMap.has('key1')) // true
  console.log(myMap.has('non existing key')) // false
  
  myMap.delete("key1")
  console.log(myMap); // Map(1) { 'key2' => 1 }
  
  console.log(myMap.has('key1')) // false
  
  myMap.set("key3", 3)
  

 // ❌
  for (const item of myMap) {
    console.log(`My Map: ${item}`)
  }
  /*
   My Map key2,1
   My Map key3,3
   */
  

  for (const [key, value] of myMap) {
    console.log({ key })
    console.log({ value })
    //{ key: 'key2' }
    // { value: 1 }
    // { key: 'key3' }
    // { value: 3 }
  }

  console.log(myMap.keys()) // [Map Iterator] { 'key2', 'key3' }
  console.log(myMap.values()) //[Map Iterator] { 1, 3 }

for (const key of myMap.keys()) {
    console.log(key, 'key')
    //key2 key
    // key3 key
  }
  for (const key of myMap.values()) {
    console.log(key, 'value')
    // 1 value
    // 3 value
  }
  
```

# Iterating over objects 
```js
  class Person {
    constructor(name, surname) {
      this.name = name
      this.surname = surname;
    }
  }

  const man = new Person("Konrad", "Antonik");
  
  console.log(man)
  
  for (let key in man) {
    console.log(key)
    //name
    // surname
  }
  
  
  // for (let item of man) {
  //   console.log(key)
  // ❌ Error
  // }
  
  
  for (let value of Object.values(man)) {
    console.log(value, '123')
    //Konrad 123
    // Antonik 123
  }
  
  for (let value of Object.keys(man)) {
    console.log(value )
    //name
    // surname
  }
  
  // logs indexes
  for (let value in Object.keys(man)) {
    console.log(value )
    // 0
    // 1
  }
  

```

# 💥PRACTICE 
Complete the getFileLength function. It takes:
A Map<string, string> that represents filenames -> fileContents
A specific filename to get the length of
It returns the number of bytes in the file's contents.

```ts
   export function getFileLength(files: Map<string, string>, filename: string) {
    return new TextEncoder().encode(files.get(filename)).length;
  }

```
