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
