**2.0 PRIMITIVES**
- primitives non-mutable
string.substring()

      const test2 = "konrada";
      const noA = test2.replace(/a/g, "");


**Falsy values** 
  After conversion t bool they will return false

- false
- 0
- "" (empty string)
- null
- undefined
- NaN

  *OBJECTS* // non-primitive types
  - object - {}
  - array - []
  - nan

*Identifier*
- var, let, const
-

    const test = 1;
    console.log(window.test); // undefined
    var test2 = 1;
    console.log(window.test2); //1
    delete window.test2;
    console.log(test2); // 1
this will not work, you cant do that with variables created using var, what you could do is the following:
- 
      window.test3 = 11;
      console.log(test3); //11 

      delete window.test3;
      console.log(test3); // error - not defined


     function testGlobalVars() {
        var globalVatTests2 = "konrad";
      }

      console.log(globalVatTests2); // not defined

var declared inside a function will not be defined
var declared inside a if will be accessible from outside 


      a ??= b; // a = a ?? b;
      a ||= b; // a = a || b;



COERTION - AUTOMATIC CONVERSION OF TYPES.  NIEJAWNA KONWERSJA. 
EXPLICIT VS IMPLICIT


console.log( typeof null ); // "object"

*Concepts to recap*

1. useEffect debouncing
2. useEffect cleanup
3. React router
4. useContext
5. useReducer
6. derivedState
7. short-circuiting
8. safe guards guard clauses
9. PATCH VS PUT
   PATCH - assumes updated object exists,you do not have to post all objects data
   PUT - you have to post all objects data, if it does not exist it will create it

makery - change fetch data to separate function fo every http method
for example delete does not need headers or body
get doesn't need headers


LocalsStorage  - lasts longer, across closed tabs and browser windows
SessionStorage the opposite



Autofocus instead of ref.current.focus

onEvent - event name + on

Better id = new Date().getTime() // ms from 1970s

Form on Submit  - you have to prevent default in react, the default being trying to make a network request to some backend, what you would normally do if you try to submit an html form with an action attribute

You want to keep the logic of updating the state, as close as possible to this state? Maeanin if there is an array
that is bieing updated by an item, you would want to define updating function in the same component that this state is. // to consider, I would probably define it inside the item itself witch is not ideal now that I think about it


https://bytegrad.com/app/professional-react-and-nextjs/trekbag-project-best-practices-naming-props
Naming convention
Function to handle items array for example add item would be called handleAdditem and you pass it to a prop colled onadditem


<Item onAddiIem={handleAddItem}/>

Similarly you would pass a click handler as handleClick to a onClick prop

<b></b> bring attention to an element, for bold text, stuff like that


const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]

Array.prototype.toSpliced()

Creating a copy of an array in one line

Const newSorted = [...sorted].sort(() => a - b)

const dummy = [1, 2, 3, 4, 5];

const sorted = useMemo(() => [...dummy].sort((a, b) => a - b),[dummy])
// const toSorted = useMemo(() => dummy.toSorted((a, b) => a - b),[dummy]) // same thing

const dummyFoo = useCallback(() => {
return [1, 2,3, 4, 5].sort((a, b) => a - b)
},[])



https://bytegrad.com/app/professional-react-and-nextjs/trekbag-project-localstorage-with-usestate

REACT CONTEXT  
Problems with context
Every time anything within context object changes, the entire component tree within this context will rerender.
Every consumer, even if it is not using the particular value that has changed will be rerendered.
Context do not have so called selectors, to help you avoid unnecessary rerendering.
The other issue is simply the syntax and the amount of boiler plate necessary to create a context.

<Context.Provider value={value}>{children}</Context.Provider>


ZUSTAND
How to get a state from zustand, alternatively to destructuring the store

const someValue = useMyStoreName((state) => state.someValue)
// this is suppose to be better for performance
ZUSTAND PERSIST!!!! saving and getting data to and from local storage to persist data between page refreshes

// code example to create with persist

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
persist(
(set) => ({
count: 0,
increment: () => set((state) => ({ count: state.count + 1 })),
decrement: () => set((state) => ({ count: state.count - 1 })),
}),
{
name: 'count-storage',
}
)   
)


lorem15 - to get lorem ipsum with 15 words
