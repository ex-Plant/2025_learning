## Intro

Reusable structural solution to a common problem in software design. It's a template for reasoning.

Practical example:
Instead of saying this class creates other classes we would say this is a factory pattern.

Patterns gives us coherent naming to common code structures (factory, singleton, observer).
Encourage decoupled architectures
Enhance predictibililty in code organization
Originated in a book "A gang of four" - foundataion of modern OOP design thinking.

Examples:

- Observer - React state updates
- Singleton - db connection
- Factory - service creation

💡 Pattern: Real‑world Presence  
`Factory`: Constant => (hooks/components factories)  
`Singleton`: Frequent (service/config modules)  
`Observer`: Fundamental (React’s core)  
`Decorator`: Daily (HOCs, wrappers, middleware)  
`Facade`: Everywhere (custom API hooks)  
`Proxy`: Moderate (caching, reactivity, security)  
`Strategy`: Common (mapping context to function)  
`State`: Core (UI logic, FSMs)  
`Command`: Moderate (job queues, server actions)  
`Adapter`: Common (API normalization)  
`Composite`: Constant (component tree)

## Factory pattern 🏭

`Function/class that decides how something is created, so consumers don’t have to.`  
`Creator of objects`  
Abstract object creation to decouple the creation logic from object usage.

Witout factory:

```js
const user = new User("Alice", "admin");
const product = new Product("Laptop");
```

Consequences:

❗If object creation starts requiring validation, defaults, dependencies, or conditionals — those rules repeat across the codebase.
Every time we wanted to create a new user we would have to

```js
if (role === "admin") {
  return new User(name, role, grantAllPermissions());
}
return new User(name, role, grantBasicPermissions());
```

❗Violation of Open/Closed Principle  
Without a factory, if the construction method of a class changes (new params, dependencies, async init, etc.), every place that creates the object must be modified — the code is not closed for modification.

A factory lets you change how instances are built without touching consumers.

❗Poor Testability
Factories isolate object creation.
Without them, test setups need to know too much — they must build valid objects manually instead of asking a factory for a consistent instance.

❌ Naive version

```js
class User {
  constructor(name, role, permissions) {
    this.name = name;
    this.role = role;
    this.permissions = permissions;
  }
}

const admin = new User("Alice", "admin", ["READ", "WRITE", "DELETE"]);
const guest = new User("Bob", "guest", ["READ"]);
```

Now suppose your business logic changes — admins must also have a token from an external service.
You start scattering conditional logic around.

✅ Factory solution

```js
class UserFactory {
  static createUser(role, name) {
    switch (role) {
      case "admin":
        return new User(name, role, grantAllPermissions(), makeToken());
      case "guest":
        return new User(name, role, ["READ"]);
      default:
        throw new Error(`Unknown role: ${role}`);
    }
  }
}

const admin = UserFactory.createUser("admin", "Alice");
const guest = UserFactory.createUser("guest", "Bob");
```

- Object creation rules are centralized.
- Changes in creation do not affect consumers.
- Easier mocking in tests: mock UserFactory.createUser.

✅ Modern factory
This is a factory function version — it returns objects configured per parameters.

```js
const createUser = (role, name) => {
  const base = { name, role };
  if (role === "admin") return { ...base, permissions: ["ALL"], token: uuid() };
  if (role === "guest") return { ...base, permissions: ["READ_ONLY"] };
  throw new Error("Unknown role");
};
```

💥 React context  
In React, you’re rarely “new”-ing classes. You create factories of behavior or components.  
Factories exist here conceptually — tools that produce something configured.

❌

```js
function useUserData() {
  /* ...fetch /users... */
}
function useProductData() {
  /* ...fetch /products... */
}
```

✅ Factory

```js
const createDataHook = (endpoint) => {
  return function useData() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(endpoint)
        .then((res) => res.json())
        .then(setData);
    }, [endpoint]);

    return data;
  };
};

export const useUsers = createDataHook("/api/users");
export const useProducts = createDataHook("/api/products");
```

Component factory

```js
const createButton = (variant) => {
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-black",
  };

  return function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded ${variantClasses[variant]}`}
      >
        {children}
      </button>
    );
  };
};

export const PrimaryButton = createButton("primary");
export const SecondaryButton = createButton("secondary");
```

`A factory is a function (or class) that produces ready‑made, pre‑configured objects or components`

## Singleton pattern 🤖

`Ensure one and only one instance of a particular object exists throughout the entire app, and provide a global access point to it`

Before modules and dependency injection programs often need to share a single resource:

- config obj
- db connection
- cache
- logger
  Instead of passing it everywhere it was exposed globally

Modern js modules gives us natural singletones since a module is loaded only once per process.

```js
// dbClient.js
import { createConnection } from "./driver";

const dbClient = createConnection(process.env.DATABASE_URL);

export default dbClient;
```

Every import of dbClient gets the same instance.

💥 SINGLETONS IN REACT / NEXT.JS CONTEXT  
React apps (especially with SSR) need singletons cautiously — they can leak state between requests.
But they’re valid for:

- Database or API clients (MongoDB, Prisma, Redis, etc.)
- Configuration or logger objects
- External service SDKs (e.g. Firebase)

Safe modern pattern:

```js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

This ensures:

- One instance during hot reloads in dev.
- No duplicate connections in prod.

## Observer pattern 👁️

`Define a one‑to‑many dependency between objects so that when one object (the subject) changes state, all its dependents (observers) are notified automatically - when X changes, Y updates.`

Foundation of react, used in stores or in a simple component tree.

- Parent’s setCount changes “subject state.”
- React’s reconciliation algorithm notifies all children that observe count.
- Children re‑render.

We could implement the same pattern manually

```js
const state = { count: 0 };
const observers = new Set();

function setCount(newValue) {
  state.count = newValue;
  observers.forEach((fn) => fn());
}

function subscribe(fn) {
  observers.add(fn);
  return () => observers.delete(fn);
}
```

- Parent acts as a subject whose state changes.

- Children are observers, implicitly notified through React’s internal dataflow.

- The pattern is present conceptually, not as an implementation.

## Strategy

`Separate what needs to happen from how it happens.`  
Define a family of algorithms, encapsulate each one, and make them interchangeable.  
Strategy lets the algorithm vary independently from the code that uses it.

❌

```js
if (paymentMethod === "stripe") doStripe();
else if (paymentMethod === "paypal") doPaypal();
else if (paymentMethod === "crypto") doCrypto();
```

✅

```js
const strategies = {
  stripe: (amount) => console.log(`Paid ${amount} with Stripe`),
  paypal: (amount) => console.log(`Paid ${amount} with PayPal`),
  crypto: (amount) => console.log(`Paid ${amount} with Crypto`),
};

function pay(method, amount) {
  const strategy = strategies[method];
  if (!strategy) throw new Error("Unsupported payment method");
  strategy(amount);
}

pay("stripe", 100);
pay("crypto", 0.2);
```

Combining strategy with factories

```js
const createPaymentStrategy = (method) => {
  switch (method) {
    case "stripe":
      return (amount) => console.log(`Stripe ${amount}`);
    case "paypal":
      return (amount) => console.log(`PayPal ${amount}`);
    default:
      throw new Error("Unknown");
  }
};

const pay = createPaymentStrategy("stripe");
pay(50);
```

- Factory decides which strategy to give you.
- You execute it, agnostic to what’s inside.

That’s clean separation between decision and behavior.

💥 React Example

```js
const validators = {
  email: (value) => value.includes("@"),
  password: (value) => value.length > 6,
  username: (value) => /^[a-z0-9]+$/i.test(value),
};

function InputField({ type, value, onChange }) {
  const validate = validators[type];
  const isValid = validate(value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      {!isValid && <p className="text-red-500">Invalid {type}</p>}
    </div>
  );
}
```

Validators = strategy collection (family of interchangeable logic).  
The component just selects and applies strategy based on type.  
No switch/if trees across the codebase.

- Encapsulation: Each strategy is a self-contained function/class with uniform interface
- Replaceability: Strategies can be swapped without affecting consumers
- Extensibility: Add new behavior without touching existing logic
- Testability: Each strategy tested separately

Not to confuse with❗:

- State Pattern: changes behavior based on current state internally, not external selection.
- Factory Pattern: creates objects; Strategy decides which algorithm the objects use.

## State Pattern

`Code that changes its own behavior when its internal condition changes.`

- Strategy = You choose the behavior from outside.
- State = The object chooses the behavior based on its own condition.

❌

```js
if (gamePhase === "start") startPhase();
if (gamePhase === "run") runPhase();
if (gamePhase === "end") endPhase();
```

✅

```js
const states = {
  loading: () => console.log("Loading..."),
  success: () => console.log("Success!"),
  error: () => console.log("Error!"),
};

let currentState = "loading";

function setState(state) {
  currentState = state;
}

function run() {
  states[currentState]();
}
```

💥 React example:

```js
function PaymentButton() {
  const [status, setStatus] = useState("idle");

  const handleClick = async () => {
    setStatus("loading");
    // simulate
    await new Promise((r) => setTimeout(r, 1000));
    setStatus(Math.random() > 0.5 ? "success" : "error");
  };

  const renderByState = {
    idle: <button onClick={handleClick}>Pay now</button>,
    loading: <p>Processing...</p>,
    success: <p>Payment successful!</p>,
    error: <p>Something went wrong</p>,
  };
  return renderByState[status];
}
```

## Command Pattern

`Encapsulate a request or operation as an object, allowing you to parameterize, queue, cancel, or log actions independently of the object that calls them.`  
When actions start mixing with UI logic or control flow, you lose flexibility:
undo, redo, retry, batching, or deferred execution become messy.
Command separates invoking an action from executing it.

```js
const makeCommand = (action) => ({
  execute: (...args) => action(...args),
});

const logToServer = makeCommand((msg) =>
  fetch("/log", {
    method: "POST",
    body: JSON.stringify({ msg }),
  })
);

logToServer.execute("User logged in");
```

Now we could simply do this

```js
function logToServer(msg) {
  fetch("/log", {
    method: "POST",
    body: JSON.stringify(msg),
  });
}
```

But if we want to for example queue it we could use a command pattern

```js
const queue = [];

// this callback is now a command pattern, it can be queued or retried etc.
queue.push(() => logToServer("deferred log"));

// later
for (const cmd of queue) cmd();
```

Undo / redo or batch operations

```js
const undoStack = [];

const createCommand = (doFn, undoFn) => ({
  execute: doFn,
  undo: undoFn,
});

const turnOnLight = createCommand(
  () => console.log("Light ON"),
  () => console.log("Light OFF")
);

turnOnLight.execute(); // Light ON
undoStack.push(turnOnLight);

undoStack.pop().undo(); // Light OFF
```

- callApiAction = command template (behavior definition)
- () => callApiAction({ ... data ... }) = command instance (action ready to run)

`Batching operations` = grouping multiple actions together to:

- execute them as one unit,
- optimize performance or consistency,
- reduce repetitive overhead (e.g., network calls, re-renders, transactions).

It’s basically:  
“Do these n things together instead of one by one.”

This might re-render separately - not optimal
❌

```js
increment();
increment();
increment();
```

✅

```js
batch(() => {
  increment();
  increment();
  increment();
});
```

## Adapter pattern

`Make two pieces of code that don’t naturally fit together, work together — without changing either.`  
Convert the interface of one class, function, or module into another interface that the client expects.

Used when:

- You integrate an API that returns data in a different shape.

- You switch libraries but keep your internal interface.

- You wrap third‑party or legacy code within your app conventions.

It is basically a transition layer

Example
Let's say we are using the following function for loggin

```js
function log(message, level) {
  console.log(`[${level.toUpperCase()}] ${message}`);
}
```

But we want to use a third party logger

```js
thirdPartyLogger.write({ text, priority });
```

We could find each original log call within the code base and change it to a new logger but this is far from perfect.
Instead a better idea is to write an adapter

```js
function log(message, level) {
  console.log(`[${level.toUpperCase()}] ${message}`);
}

const thirdPartyLogger = {
  write({ text, priority }) {
    // fake implementation for demonstration
    console.log(`Third‑party logger → [${priority}] ${text}`);
  },
};

function loggerAdapter(message, level) {
  const priorityMap = {
    info: "normal",
    warn: "medium",
    error: "high",
  };

  thirdPartyLogger.write({
    text: message,
    priority: priorityMap[level] || "normal",
  });
}

// replace old interface
const log = loggerAdapter;
```

## Decorator Pattern

`Add new behavior to an existing function, class, or object without modifying its original code.`

You might have:

- A function that does one thing,

- You want to add logging / metrics / permission checks,

but you don’t want to — or can’t — change the original.

A decorator wraps the original behavior, calling it and enhancing results.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

// Decorator: adds timestamp logging
function withLogging(fn) {
  return (...args) => {
    console.log(`[${new Date().toISOString()}] Calling ${fn.name}`);
    const result = fn(...args);
    console.log(`[${new Date().toISOString()}] Done`);
    return result;
  };
}

const loggedGreet = withLogging(greet);

loggedGreet("Alice");
// [2025-03-12T14:58:30.100Z] Calling greet
// [2025-03-12T14:58:30.102Z] Done
```

Adapter: Translate one interface into another  
Decorator: Extend or augment behavior

## Proxy Pattern

`Provide a surrogate or intermediary for another object to control access to it.`  
A proxy stands in front of something to regulate how it’s used — add rules, defer work, or intercept calls.

You need a Proxy when:

- Access must be controlled (permissions, caching, rate‑limiting, validation).
- You want lazy initialization or virtualization — e.g., load only when needed.
- You need transparent interception — monitor or alter behavior without changing the real target.

Example of adding auth check using Proxy constructor

```js
const api = {
  getUser(id) {
    console.log(`Fetching user ${id}`);
  },
  deleteUser(id) {
    console.log(`Deleting user ${id}`);
  },
};

api.deleteUser(1); // runs with no check

const currentUser = { role: "guest" };

const apiProxy = new Proxy(api, {
  // api is a target, prop is a target property
  get(target, prop) {
    const original = target[prop];

    // we are only trying to intercept function calls
    if (typeof original !== "function") return original;

    return (...args) => {
      if (prop === "deleteUser" && currentUser.role !== "admin") {
        throw new Error(`Not authorized`);
      }
      return original.apply(target, args);
    };
  },
});

apiProxy.getUser(1); // works for any role
apiProxy.deleteUser(42); // throws for guests
```

## Facade Pattern

`Provide a simplified interface to a complex subsystem.`  
Hide the mess behind a clean API.
Most well‑written functions are mini‑Facades.  
A function becomes a Facade when it’s used to simplify a subsystem, not just to shorten code.

```js
function loadUser(id) {
  const user = fetchUser(id);
  const posts = fetchPosts(id);
  return { user, posts };
}
```

## Composite Pattern

`Build structures where a single item and a group of items behave the same way.`

The React component tree is a Composite structure.

- Every component (function or element) can contain other components.
- The interface (return <JSX />) is the same regardless of whether it renders a leaf <div> or a nested tree of children.

```js
function Leaf({ label }) {
  return <span>{label}</span>;
}

function Branch({ label, children }) {
  return (
    <div>
      <strong>{label}:</strong>
      <div>{children}</div>
    </div>
  );
}

function TreeExample() {
  return (
    <Branch label="Root">
      <Leaf label="Child A" />
      <Branch label="Nested">
        <Leaf label="Child B" />
      </Branch>
    </Branch>
  );
}
```

Each component (Leaf, Branch) is treated uniformly as “something you can render and nest.”
That’s the Composite pattern, functionally expressed.

## Builder pattern

Intent:

Separate the construction of a complex object from its final representation, so the same construction process can create different representations.  
`Progressively constructing something complex❗`  
Structure (OOP view):

- Builder – defines methods to configure parts of the product.
- Director (optional) – orchestrates builder calls.
- Product – final object created by the builder.

Without returnig this we would not be able to chain methods.
Each intermediate call configures internal state but doesn’t finalize anything.

```js
class UserBuilder {
  constructor() {
    this.data = {};
  }
  setName(name) {
    this.data.name = name;
    return this; // chainable
  }
  setAge(age) {
    this.data.age = age;
    return this;
  }
  build() {
    return { ...this.data };
  }
}

const user = new UserBuilder().setName("Alice").setAge(30).build();
```

### Modern example

The builder returns a new function or a new object carrying the next stage of configuration.

```js
const createUser = (config = {}) => ({
  setName: (name) => createUser({ ...config, name }),
  setAge: (age) => createUser({ ...config, age }),
  build: () => ({ ...config }),
});

const user = createUser().setName("Alice").setAge(30).build();
```

Function version = pure builder:  
no internal state, each call returns a new function capturing prior configuration in closures.

```js
const buildUser = (name) => (age) => () => ({ name, age });
const user = buildUser("Alice")(30)();
```

Now why not simply calling

```js
function buildUser(name, age) {
  return {
    name,
    age,
  };
}

const user = buildUser("Alice", 30);
```

With builder pattern we can build are object gradually without knowing all arguments upfront
We can apply defaults, optional fields or conditions before building the object
If your function has more than ~3–4 optional or named parameters, builders scale better:

```js
const user = createUser()
  .setName("Alice")
  .setAge(10)
  .setEmail("alice@example.com")
  .setRole("admin")
  .setPosition("worker")
  .build();
```

vs

```js
buildUser("Alice", undefined, "alice@example.com", "admin", undefined);
```

Practical rule

Use builder (or function‑based chaining) when:

- Object/config has many optional or staged values.

- Config needs to be built dynamically.

- You define public APIs used by others (readability & extensibility matter).

Use simple factory/direct call when:

- You control all input values at once.

- Object is small.

- Performance or simplicity matter more than flexibility.
