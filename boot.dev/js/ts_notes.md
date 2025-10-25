### Typescript recap

Released 2012
Typescript is a compiled language - it is compiled into javascript. 
The compiler = *tsc* was written in TypeScript, but recently it was rewritten in go. 
Ts is not supported by most js engines, that is why compilation step is necessary. 
*Basically it is just a js linter.*

The whole idea behind it is to add static typing to js. 
Typescript is a superset of js. 
All js code is valid ts code but *not all ts code is valid js code*

Concepts to recap:
- types inference
- type declaration
- union types: 1 | 2
- optional parameters
- default parameters
- literal types
# Using template literals to create types
```ts
    export type LogLevel = "info" | "warn" | "error";
    export type LogSourceType = "api" | "database" | "auth";
    export type LogSource = `${LogSourceType}_${number}`
    export type LogMessage = `${LogLevel}: ${string}`

    export function createLogEntry(message: LogMessage, source: LogSource): string {
    return `[${source}] LOG - ${message}`;
    }
```

# DISCRIMINATED UNIONS 
*Discriminate properties* or *tags*
Very useful when we need to apply some conditional logic.
The convention is to use *kind* as the tag.

```ts
type MultipleChoiceLesson = {
  kind: "multiple-choice"; // Discriminant property
  question: string;
  studentAnswer: string;
  correctAnswer: string;
};

type CodingLesson = {
  kind: "coding"; // Discriminant property
  studentCode: string;
  solutionCode: string;
};

type Lesson = MultipleChoiceLesson | CodingLesson;

function isCorrect(lesson: Lesson): boolean {
  switch (lesson.kind) {
    case "multiple-choice":
      return lesson.studentAnswer === lesson.correctAnswer;
    case "coding":
      return lesson.studentCode === lesson.solutionCode;
  }
}
```

# Object with unknown properties
```ts
    type ObjT = {
      [key: string]: number | string
    }
```

# Object with unknown properties AND required properties
```ts
    type ObjT = { 
      name: string;
      surname: string;
      [key: string]: number | string
    }
```
# Usually you do want to know all objects properties in advance, and simply set some of them as optional❗ 

# PropertyKey
```ts
  // this is a built-in type
  type PropertyKey = string | number | symbol;

  type InfrastructureTags = {
    [key: PropertyKey]: any;
  };

  const janesServer: InfrastructureTags = {
    name: "Jane's Server",
    1: 420,
    [Symbol("role")]: "Admin",
  };
```

# symbol as an object key
A symbol is a unique and immutable data type that may be used as an object property name. It's kinda like a string, 
but it's guaranteed to be unique. ❗

```ts
  const TWO_FACTOR = Symbol("twoFactor");

Symbol(twoFactor)

  const test = {
    [TWO_FACTOR]: 'test'
  }

  console.log(TWO_FACTOR); // Symbol(twoFactor)
  console.log(test); // { [Symbol(twoFactor)]: 'test' }
  console.log(test['twoFactor']); // undefined
  console.log(test[TWO_FACTOR]); // test


  const TWOO_FACTOR = Symbol("twoFactor");
  export const BIOMETRIC_LOCK = Symbol("biometricLock");

  export type MailPreferences = {
    [key: PropertyKey]: boolean | string;
  doNotDisturb: boolean;
  outOfOffice: boolean;
  [TWOO_FACTOR]: boolean;
  [BIOMETRIC_LOCK]: boolean;
  };
  
  export function isSecure(preferences: MailPreferences) {
    return preferences[TWOO_FACTOR]  || preferences[BIOMETRIC_LOCK]
  }

```

# READONLY
 - modifier similar to const in js - makes a property of an object immutable

```ts  
  type Point = {
    readonly x: number;
    y: number;
  };

  export type MailPreferences = {
    [key: PropertyKey]: boolean | string;
    readonly doNotDisturb: boolean;
    readonly outOfOffice: boolean;
  };

```

# AS CONST 
```ts
  const colorsConst = ["red", "green", "blue"] as const;

  // Error: Property 'push' does not exist on type 'readonly ["red", "green", "blue"]'
  colorsConst.push("yellow");
  
```
It works great with objects too, and unlike most utility types and Object.freeze(), it automatically makes all nested structures readonly as well:

```ts   
  const configConst = {
    apiUrl: "https://api.cobrakai.com",
    admins: {
      johnny: "lawrence",
      daniel: "larusso",
    },
    features: ["no mercy", "not crying", "winning too much"],
  } as const;
  
  // Error: Cannot assign to 'apiUrl' because it is a read-only property
  configConst.apiUrl = "https://api.karate.com";

  // Error: Property 'push' does not exist on type 'readonly ["no mercy", "not crying", "winning too much"]'
  configConst.features.push("sweep the leg");
```

# OBJECT.FREEZE()
The Object.freeze() method is a built-in JavaScript function that prevents modifications to the top level of an object at runtime. It makes the object immutable, but it does not affect TypeScript's type system.
TypeScript is smart enough to recognize that Object.freeze is being called, so it gives us a nice compile-time error 
when we try to modify the top-level properties. And because Object.freeze() is a runtime operation, it will still fail at runtime if a mutation actually happens

```ts
const frozenConfig = Object.freeze({
  apiUrl: "https://api.cobrakai.com",
  admins: {
    johnny: "lawrence",
    daniel: "larusso",
  },
  features: ["no mercy", "not crying", "winning too much"],
});

// Error: Cannot assign to 'apiUrl' because it is a read-only property
frozenConfig.apiUrl = "https://api.karate.com";

// This is fine because nested properties are not frozen automatically
frozenConfig.admins.johnny = "kreese";

// This is also fine because the array is not frozen
frozenConfig.features.push("sweep the leg");

```

In other words Object.freeze() will give us both runtime and compile time immutability and we do not need to add as 
const in such a case

```ts
  export const defaultPreferences = Object.freeze({
    name: "Kreese",
    doNotDisturb: false,
    outOfOffice: false,
  })
```

# SATISFIES
```ts

const colors = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yelow: "#FFFF00",
};

type ColorMap = {
  red: string;
  green: string;
  blue: string;
  yellow: string;
};

const colorsTyped: ColorMap = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  // Error: "yelow" is not in type ColorMap
  yelow: "#FFFF00",
};

// RedHex is any 'string'
// where it used to be the literal "#FF0000"
type RedHex = typeof colors.red;

const colorsSatisfies = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  // Error: "yelow" is not in type ColorMap
  // yelow: "#FFFF00"
} as const satisfies <ColorMap>;

// We keep the literal types!
type RedHexSatisfies = typeof colorsSatisfies.red; // "#FF0000"

const test1: RedHex = 'any string' // no error
const test2: RedHexSatisfies = 'any string' //  error
```


# importing types
- straight from the module
```ts
import { User, Post } from "./models";
```

- using import type more efficient and safer, 
- TypeScript knows that you're only importing types, and it can drop the imports from the compiled JavaScript code
- this is irrelevant in most modern cases 
- TypeScript already erases all type-only imports automatically (since TS 3.8+), as long as you’re compiling with "importsNotUsedAsValues": "remove" or "preserve" in tsconfig.json (default is "remove").
- 
```ts
import type { User, Post } from "./models";
```


# Type masturbation is a bad thing ❗ 
# Creating to complex types, with endless possibilities will result in ts errors and is very bad for performance and compilation speed
