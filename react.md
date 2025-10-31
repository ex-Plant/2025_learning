**TYPESCRIPT**

_type for style properties_

`type ElementProps = {
properties: React.CSSProperties
}`

_union type_
type TUnion = 'test1' | 'test2' | 'test3' | 'test4'

_Html properties type_

`type TT = {
children: React.ReactNode;
jsxEl:Element
} & ElementProps
`

`export const TypescriptRecap = ({
properties,
}: TT) => {
return (
<><button style={{ backgroundColor:properties.backgroundColor }}</button></>
)}`

**INTERFACES**
Main difference between interface and type is that type is more elastic, for example in
interface you can't do something like:
`interface Inter1 = "string"`
Interface is always an object!

interface InterfaceName {
inter1: string
}

_types_
type Inter1 = `string`;

When typing complicated types yon can simply hover over element where it was defined and you
will get intellisense of what exact type it is, it is ok to copy paste from there

_Extending types_
type SomeType1 = { } & SomeType2

_Extending interface_
interface SomeInterface {
name: string
}
interface SomeInterface1 extends SomeInterface{
}

// to get all default possible attributes, events etc. of a certain element like onClick,
// autofocus etc
`type ComponentElementProps = React.ComponentPropsWithoutRef<'button'>`

export function ElementComponent ({
autoFocus,
}: ComponentElementProps) {
return <button autoFocus={autoFocus}>

  </button>
    <ElementComponent2/>

}

type ComponentElementPropsWithRef = React.ComponentPropsWithRef<'button'>

export function ElementComponent2 ({
autoFocus,
...rest // in this context this is rest
}: ComponentElementPropsWithRef) {

//we can see this complicated type when hovering over an element where it is used
function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
console.log(e);
}

return <>
<button autoFocus={autoFocus}
onClick={e => () => handleClick(e)}

          {...rest}>  // spread

</button></>
}

**typing tuples**

const buttonTextOptions = [
"option1",
"options2",
"option3",
] as `const`

`adding as const will give as intellisense and will tell typescript that this is a tuple,
meaning an array of a certain length and structure
it will also be readonly`

**OMIT**
`lets say that we need only some values from a certain type, in such scenarios we can use Omit`

type User = {
sessionId: number,
name: string,
}

we are ommitting sessionId
type Guest = Omit<User, "sessionId"> // only name is left

// any type - anything goes it is much better to use unknown

_GENERICS_

`function someGenericFoo<T>(value: T): T[] {
return [value]
}`

//with this syntax you need a coma after T, otherwise TSX will think that we are trying to
// create a jsx element like <div>

`const someGenericFoo2 = <T, >(value: T): T[] => {
return [value]
}`

console.log(someGenericFoo2, someGenericFoo))

`type GenericPropst<T> ={
name:T
nameArr: T
}`

`export const T = ({}) => {
return <></>
}`

`function SomeGenericComponentConstT<T>({nameArr, name}: GenericPropst<T>) {
console.log(nameArr);
console.log(name);
return<></>
}`

`const SomeGenericComponentConst = <T, >({name, nameArr}: GenericPropst<T> ) => {
console.log(name);
console.log(nameArr );
return <>
</>
}`

console.log(SomeGenericComponentConstT, ), SomeGenericComponentConst;


**OptimizeGettingInitialState**
import { useEffect, useState } from "react";

// If we have some function that we need to execute to get this initial state, and we do not want it to execute every time the component renders, we can actually use a function as a value, this will only  run once!!
//
// Another thing, you don't need useEffect to get data from local storage!!


export const OptimizeGettingInitialState = ({name}: any) => {

// If we store
const [testname, setTestname] = useState(name);
console.log(testname);
console.log(`rendering... this will run every time name changes and this is fine`);


// But what if the initial value is something we want to get once, and not rerender it when
// component re-renders? We can store this data as a function.

    const [data, setData] = useState(() => {
      // This function will only run once on initial render
      console.log('Calculating initial state...');

      // Simulate an expensive operation
      const result = Array.from({ length: 1000000 }, (_, i) => i).reduce((sum, num) => sum + num, 0);

      return result;
    });


    // Now this is quite simillar to using useEffect with an empty dependency array but there
// are some differences:

const [data2, setData2] = useState(null);

useEffect(() => {
console.log('Calculating initial state...');
setData(() => {
console.log(`rendering`);
return JSON.parse(localStorage.getItem(`count`)) ??
0
}
);
}, []);


// Render timing:
//   useState callback: The calculation happens before the first render.
//   useEffect: The calculation happens after the first render.

// Initial render content:
//   useState callback: The component renders with the calculated data immediately.
//   useEffect: The component first renders with null (or whatever initial state you set), then re-renders with the calculated data.

// Performance:
//   useState callback is slightly more efficient as it avoids an extra render.


return (
<>

    </>
);
};

**INITIALIZING MAP**

const mapper = new Map([
["1", "a"],
["2", "b"],
]);

**the same as**
const mapper = new Map();
mapper.set("1", "a");
mapper.set("2", "b");


**RULES OF HOOKS**
- Generally only use hooks at the top level of React components, do not use it inside loops, conditions, event 
  handlers etc. 


  
# useEffectEvent(callback) React 19.2^
https://www.youtube.com/watch?v=uQpky6ygfk0
Call useEffectEvent at the top level of your component to declare an Effect Event. Effect Events are functions you 
can call inside Effects, such as useEffect and *you do not have to include them in the dependency array.*
Only call inside Effects: Effect Events should only be called within Effects. Define them just before the Effect that uses them.
Use for non-reactive logic: Only use useEffectEvent to extract logic that does not depend on changing values.
In some cases, you may want to read the most recent props or state inside an Effect without causing the Effect
to re-run when those values change.
```js
  import { useEffect, useContext, useEffectEvent } from 'react';
   
  export default function Page({ url }) {
    const { items } = useContext(ShoppingCartContext);
    const numberOfItems = items.length;
  
    // add reactive values as an argument to callback - this will tell it to re run use effect only if this value changes
    const onNavigate = useEffectEvent((url) => {
      logVisit(url, numberOfItems);
    });
  
    /*
     In this example, the Effect should re-run after a render when url changes (to log the new page visit), but it 
     should not re-run when numberOfItems changes. By wrapping the logging logic in an Effect Event, numberOfItems 
     becomes non-reactive. It’s always read from the latest value without triggering the Effect. Before we would have
     */
    useEffect(() => {
      onNavigate(url);
    }, [url])
  }
  
  function OldWay({ url }) {
    const { items } = useContext(ShoppingCartContext);
    const numberOfItems = items.length;
    
    //  Before we would have to do something like this, 
    useEffect(() => {
      function logVisit() {
        console.log(url, numberOfItems)
      }
      
      logVisit()
    }, [url, numberOfItems])
  
    /* Since we only want to rerun the effect if url changes, not when number of items changes we had a few workarounds.
     Our options where to store same vals in ref and check if it changed, or to disable eslint complaining about non 
     exhasustive deps. Now we can do it the right way. 
     */
  }
```
