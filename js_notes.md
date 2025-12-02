### MAP

```js
let issuesMap = new Map();
currentlySelectedIssues.forEach((i) => {
  if (issuesMap.has(i.status)) {
    issuesMap.get(i.status).push(i);
  } else {
    issuesMap.set(i.status, [i]);
  }
  return issuesMap;
});

issuesMap.set(`dummKey`, currentlySelectedIssues);
const issuesByStatus = Array.from(issuesMap);
const issuesByStatus: IssuesByStatusT = Array.from(issuesByStatusMap.entries());
```

### Reduce

```js
const numbersArr = [1, 2, 3, 4];
const newArr = numbersArr.reduce((acc, item) => acc + item, 0);
```

## REDUCE + MAP

Grouping items into a Map using reduce
Initial accumulator is a new Map and than we accumulate results into this map

```js
const testArr = currentlySelectedIssues.reduce((acc, issue) => {
  if (!acc.has(issue.status)) {
    acc.set(issue.status, [issue])
  } else {
    acc.get(issue.status).push(issue)
  }
  return acc
}, new Map()

```

This will not work in next.js - in next.js useSearchParams is readonly❗
const [searchParams, setSearchParams] = useSearchParams()

## CHECK IF VALUE IS OF CERTAIN TYPE

```js
function isTargetFilter(val: string): val is IssuesTargetFilterT {
  return val === 'all_issues' || val === 'my_issues' || val === 'created_by_me'
}
```

### SORT

```js
const numbers = [3, 1, 4, 1, 5];

// Ascending order (a - b)
console.log(numbers.sort((a, b) => a - b));
// Output: [1, 1, 3, 4, 5]

// Descending order (b - a)
console.log(numbers.sort((a, b) => b - a));
// Output: [5, 4, 3, 1, 1]
```

Sort by date ASC

```js
const sortedIssues = [...issues].sort((a, b) => {
  if (!a.dueDate) return 1; // -> a goes after -> to the end
  if (!b.dueDate) return -1; // b goes after -> to the end
  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
});
```

The sort function uses a comparison function that takes two elements (a and b) and determines their order.  
`Returning a positive number (like 1) means "a" should come after "b"`  
`Returning a negative number (like -1) means "a" should come before "b"`  
Returning 0 means they are equal in terms of sorting

If "a" doesn't have a due date, we return 1.
This means "a" should come after "b", effectively pushing items without due dates towards the end of the array.
(2) if (!b.dueDate) return -1:
This means "a" should come before "b", again pushing items without due dates towards the end.

`JAK TO DZIAŁA`
B - A -> jeśli z takiego równania uzyskamy liczbę dodatnia to B będzie posortowane wyżej.

// Let's break down what happens in ascending sort (a - b):
// When comparing 3 and 1:
// 3 - 1 = 2 (positive) -> 3 goes after 1
// When comparing 4 and 1:
// 4 - 1 = 3 (positive) -> 4 goes after 1
// etc.

// In descending sort (b - a):
// When comparing 3 and 1:
// 1 - 3 = -2 (negative) -> 3 goes before 1
// When comparing 4 and 1:
// 1 - 4 = -3 (negative) -> 4 goes before 1
// etc.

The exact comparison sequence depends on the sorting algorithm implementation (which varies by browser).

### sorting strings

The array elements are converted to strings, then sorted according to
each character's Unicode code point value. Will not work as expected ❗
In order to correctly sort strings we need to use sort without callback

```js
// ❗ Case sensitive - uppercase letters will go first
const fruits = ["banana", "apple", "cherry", "date"];
fruits.sort(); // ['apple', 'banana', 'cherry', 'date']
```

### Case Insensitive - localeCompare

```js
["Apple", "banana", "Cherry"].sort((a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
); // ['Apple', 'banana', 'Cherry']
```

### check if date is valid

```js
function safeParseDate(dateStr: string): Date | undefined {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return undefined;
  }
  return date;
}
```

`%2F` to `/` w query stringu

### for of + continue

```js
const { issuesByStatusMap, issuesAssignedToMe, issuesCreatedByMe } = useMemo(() => {
  const map = new Map<string, IssueT[]>()
  const assignedTo: IssueT[] = []
  const createdBy: IssueT[] = []
  const userId = `/users/${user?.id}`

    for (const issue of currentlySelectedIssues) {
      if (issue.createdBy === userId) {
        createdBy.push(issue)
      }
      if (issue.recipient === userId) {
        assignedTo.push(issue)
      }

      if (!issue.status) continue

      if (!map.has(issue.status)) {
        map.set(issue.status, [issue])
      } else {
        map.get(issue.status)!.push(issue)
      }
    }
```

### optional function execution

```js
function updateStores() {
  foo2 && foo2();
}

function updateStores() {
  foo2?.();
}
```

### ZUSTAND RE-RENDERS

Trggers rerender whenever anything within the store changes:

```js
const myStore = useMyStore();
const count = myStore.count;
```

Trggers rerender only when a particular selector changes

```js
const count = myStore((state) => state.count);
```

### Array.isArray([])

```js
if (!Array.isArray(statusesArr)) {
  console.error(`statuses is not an array`);
  return true;
}
```

### MAP ENTRIES

```js
const issuesByStatus: [string, IssueT[]][] = Array.from(
  issuesByStatusMap.entries()
);
```

### prevent bubbling

`e.stopPropagation()`

### e.target vs e.currentTarget

`e.target` is the element that `triggered the event`  
`e.currentTarget` is the element that the `event listener is attached to`

### async operations in loops

- for in doesn't work with async code
- you can use a for...of loop or a traditional for loop, which can handle await correctly.

```js
const filesArr = Array.from(files);

for (const file of filesArr) {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    await uploadFile({ file });
  } else {
    const compressedFile = await compressImage(file);
    await uploadFile({file: compressedFile}
}
```

### URL.createObjectURL(file)

Create an img preview

```js
<img src={URL.createObjectURL(file)} alt="" />
```

### new URL()

```js
const url = new URL(defaultLink)
const pathWithQuery = url.pathname + url.search
}
```

### MEASURING TIME

```js
console.timeEnd("FileUploadTime");
console.time("FileUploadTime");
performance.now();
```

### ERROR HANDLING

Error object is just an instance of Error class.

```js
const err = new Error();
```

This check is needed because not all libraries are returing this instance when error occurs. You can throw anything as error. That is why it is typed as unknown.

```js
if (error instanceof Error) // do something
```

### Object.freeze()

Freezes the object preventing it from being modified. This means no properties can be added or removed, their writability, mutability etc. can not be changed, values can not be updated, object's prototype can not be re-assigned.

```js
const obj = { prop: 42 };

Object.freeze(obj);
obj.prop = 44; // //❌ Throws an error in strict mode
console.log(obj.prop); // 42
```

### Awaited

Generic Programming:
When writing generic code that consumes functions returning promises, you might not know ahead of time what the resolved type is. Using Awaited<> can help you extract the correct type without manual annotations.

Get the type of awaited promise.
Can be used instead of using Promise<T>

```js
// A function that returns a Promise<string>
async function fetchData(): Promise<string> {
  return "Hello, world!";
}
// using Awaited to infer the resolved type
type Data = Awaited<ReturnType<typeof fetchData>>;
// Data is now of type 'string'
```

## PROMISIFYING CALLBACK-BASED APIS

```js
  //Standard
  function getCurrentPositionCallback() {
    return navigator.getCurrentPosition(onSuccess, onError) () => {}
  }

  // Promisified
  async function getCurrentPositionPromise() {
  return new Promise((resolve, reject) => {
    return navigator.getCurrentPosition(resolve, reject)
)

  await getCurrentPositionPromise() {
    try {
      const position = await getCurrentPositionPromise()
      console.log(position)
    } catch (error) {
      console.log(error)
    }
  }
```

### PROMISIFYING TIMEOUTS

```js
function timerPromise() {
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolved')
  } , 1000)
  })
})

function sleep() {
  return new Promise((resolve, reject) => setTimeout(resolve, 1000))
}
```

To get all default possible attributes, events etc. of a certain element like onClick, autofocus etc

```ts
type ComponentElementPropsWithRef = React.ComponentPropsWithRef<"button">;

export function ElementComponent2({
  autoFocus,
  ...rest // in this context this is rest
}: ComponentElementPropsWithRef) {
  return <div>Hello</div>;
}
```

# GENERICS

```ts
function someGenericFoo<T>(value: T): T[] {
  return [value];
}

//with this syntax you need a coma after T, otherwise TSX will think that we are trying to
// create a jsx element like <div>

const someGenericFoo2 = <T>(value: T): T[] => {
  return [value];
};
```

### INITIALIZING MAP

```ts
const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);

// the same as
const mapper2 = new Map();
mapper.set("1", "a");
mapper.set("2", "b");
```

### Timeout type

```ts
type TimeoutId = ReturnType<typeof setTimeout>;
const t = useRef<TimeoutId | null>(null);

useEffect(() => {
  if (t.current) clearTimeout(t.current);
  t.current = setTimeout(() => {
    console.log("");
  }, 500);
  return () => {
    if (t.current) cleartTimeout(t.current);
  };
}, []);
```

### Sending email using anchor tag

```js
function ContactLink() {
  return (
    <a href="mailto:support@example.com?subject=Support%20Request&body=Hello%2C%20I%20need%20help%20with...">
      Contact Support
    </a>
  );
}
``;
```

### Symbols

1. How Often Are They Used in Modern JavaScript?

-

Everyday Code:

In typical application logic, you might not see symbols being used regularly. Most developers rely on strings or numbers as object keys because those fit many straightforward use cases.

- Library and Framework Code:

Symbols become much more prominent in the internals of libraries and frameworks. They’re used to define properties or protocols in a way that minimizes naming collisions, especially in larger or distributed codebases.

- Built-in Protocols:

JavaScript itself makes heavy use of symbols (known as well-known symbols) for built-in operations. For example, symbols like \(\text{Symbol.iterator}\) and \(\text{Symbol.toStringTag}\) support runtime protocols that allow objects to be iterated over or provide custom string representations.

Unique Property Keys:

```js
const uniqueKey = Symbol("unique");
const obj = {
  [uniqueKey]: "Hidden value",
};
```

Defining “Private” or Internal Properties:

Since symbol-keyed properties don’t appear in standard enumeration methods (like for...in or Object.keys), they can serve as a mechanism to hide implementation details:

```js
const internalId = Symbol("id");
class MyClass {
  constructor(id) {
    this[internalId] = id;
  }

  getId() {
    return this[internalId];
  }
}
```

Meta-programming and Reflection:

Symbols also play a role in advanced patterns where you may need to attach metadata or influence object behavior without interfering with the object’s main API.

Summary

-

Frequency of Use:

While symbols might not appear much in everyday, high-level application code, they’re essential for internal library design, for setting up robust and collision-proof APIs, and for implementing JavaScript’s core protocols.

- Scenarios:

They are commonly used for creating unique object keys, hiding internal or “private” properties, and enabling protocol-driven features (like iteration and custom behavior on built-in operations).

You're correct that an object cannot have two properties with the same key. However, the power of symbols lies in the fact that every symbol is unique, even if they share the same description. This means that two symbols created separately with the same descriptive text are considered distinct and will not collide as object keys.

Consider the following example:

```js
const symbolA = Symbol("konrad");
const symbolB = Symbol("konrad");

const obj = {
  [symbolA]: "value from symbolA",
  [symbolB]: "value from symbolB",
};

console.log(obj[symbolA]); // "value from symbolA"
console.log(obj[symbolB]); // "value from symbolB"
```

### Reduce

```js
/*  1. Extract and Normalize Attributes from 
    { "name": "Nazwa firmy / pracowni", "value": "ABC Studio" },
     To object {"Nazwa firmy / pracowin" : "ABC Studio"}
  */

const rawAttributes = (order?.note_attributes || []).reduce(
  (acc: Record<string, any>, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  },
  {}
);

/* This is equivalent to using a loop  */

const rawAttributes: Record<string, string> = {};
for (const attr of order.note_attributes ?? []) {
  rawAttributes[attr.name] = attr.value;
}
```

### Higher-order function composition.

Does on or both of the following:

- takes another function as an argument
- returns new function

If a normal function is a worker that does a task,
a higher-order function is a manager that takes or produces workers.

```js
function higherOrder(fn) {
  return function composed() {
    return fn();
  };
}
```

Real worlds scenario is a zustand store with persist
create returns a store creator
persist returns enhanced initializer
The outer call injects the enhancer into the creator

```js
create()  → returns [factory function]
persist() → returns [enhanced factory initializer]
create()(persist(...)) → executes both and links them
```

```js
function test() {
  console.log(`1`);
  return function () {
    console.log("2");
    return function () {
      console.log(3);
      return function () {
        console.log(4);
      };
    };
  };
}
test()()()();
// 1 2 3 4

// test now holds inner function of test so fn() prints 2
const fn = test();
```

1. Function as a Returned Value
   In JavaScript, a function can:

- be stored in a variable,
- be passed as an argument,
- be returned from another function.
  Since functions are first‑class values, they persist as return values and can be instantly executed via ().

### Currying

Transforming a function that takes mutliple arguments
Ordinary foo:

```js
function sum(a, b, c) {
  return a + b + c;
}
sum(1, 2, 3); // 6
```

Curried:

```js
const curriedSum = (a) => (b) => (c) => a + b + c;
curriedSum(1)(2)(3); // 6
```

Each returned function carries context from the previous one (via closures).

1. It allows partial application

```js
const add = curriedSum(2)(3);
add5(10); // 15
```

2. Configuration chaining
   uses function returns (or method returns) to carry progressively built configuration objects.

Each call configures part of a final object

```js
const configureServer = (host) => (port) => (useSSL) => ({
  host,
  port,
  useSSL,
});

const config = configureServer("localhost")(8080)(true);
```

Libraries often wrap this into method‑based chaining, which conceptually = “return a function or object with methods returning itself.”

```js
const builder = {
  name: "",
  age: 0,
  setName(n) {
    this.name = n;
    return this; // allows chaining
  },
  setAge(a) {
    this.age = a;
    return this;
  },
  build() {
    return { name: this.name, age: this.age };
  },
};

const user = builder.setName("Alice").setAge(30).build();
```

Configuration chaining in function form is the functional analogue of the Builder pattern from object‑oriented design.
