# DESIGN PATTERNS 🚀

Reusable structural solution to a common problem in software design. It's a template for reasoning.
Formally each pattern defines:

- Intent
- Problem
- Solution
- Consequences

Practical example:
Instead of saying this class creates other classes we would say this is a factory pattern.

Patterns gives us cohernt naming to common code structures (factory, singleton, observer).
Enourage decoupled architectures
Enhance predictibililty in code organization

Originated in a book "A gang of four" - foundation of modern OOP design thinking.

Examples:

- Observer - React state updates
- Singleton - db connection
- Factory - service creation
- Repository - data access abstraction

React hooks are factories returning internally managed singletons.

### Factory pattern 🏭

`Creator of objects`

1. Intent  
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

Now:

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

### Hook Factory

❌

```js
function useUserData() {
  /* ...fetch /users... */
}
function useProductData() {
  /* ...fetch /products... */
}
```

✅

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

### Component factory

Factory = “Function/class that decides how something is created, so consumers don’t have to.”

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

❗ This is not a factory
This is just parametrization.
We are not creating the same object every time
Configurable ≠ factory.
This is a single component with dynamic behavior.

```js
function Button({ variant }) {
  const style =
    variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-black";

  return <button className={style}>Click</button>;
}
```

`A factory is a function (or class) that produces ready‑made, pre‑configured objects or components`

### Builder pattern

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
