To get all default possible attributes, events etc. of a certain element like onClick, autofocus etc
```ts
type ComponentElementPropsWithRef = React.ComponentPropsWithRef<'button'>

export function ElementComponent2 ({
  autoFocus,
  ...rest // in this context this is rest
}: ComponentElementPropsWithRef) {
  return <div>Hello</div>
}
```

  
# GENERICS
        
```ts
    function someGenericFoo<T>(value: T): T[] {
      return [value]
    }

//with this syntax you need a coma after T, otherwise TSX will think that we are trying to
// create a jsx element like <div>

  const someGenericFoo2 = <T, >(value: T): T[] => {
    return [value]
  }

```


# OptimizeGettingInitialState
Render timing:
  *useState callback: The calculation happens before the first render.*
  *useEffect: The calculation happens after the first render*
Initial render content:
  useState callback: The component renders with the calculated data immediately.
  useEffect: The component first renders with null (or whatever initial state you set), then re-renders with the calculated date
Performance:
  useState callback is slightly more efficient as it avoids an extra render.

```ts
  import { useEffect, useState } from "react";

  // If we have some function that we need to execute to get this initial state, and we do not want it to execute every time the component renders, we can actually use a function as a value, this will only  run once!!
  //
  // Another thing, you don't need useEffect to get data from local storage!!


  export const OptimizeGettingInitialState = ({name}: any) => {
      const [data, setData] = useState(() => {
        // This function will only run once on initial render
        console.log('Calculating initial state...');
        // Simulate an expensive operation
        const result = Array.from({ length: 1000000 }, (_, i) => i).reduce((sum, num) => sum + num, 0);
        return result;
      })
  }
```


# INITIALIZING MAP
```ts
  const mapper = new Map([["1", "a"], ["2", "b"]]);
  
  // the same as
  const mapper2 = new Map();
  mapper.set("1", "a");
  mapper.set("2", "b");
```

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


# RENDERING
In react it means executing component function body, this way React knows what it must paint on the screen.  
Rendering can happen when:
- component is mounted - added to the DOM - initial render
- components state changes
- component props changes
- parent component re-renders

Each render produces a new React element tree (Virtual DOM) that is later compared with the previous one (the diff) 
and real dom is updated only where it is necessary

# Mounting / unmounting
Adding / removing component to the DOM. 
It happens once in a component's lifecycle, when it first appears on the screen.
React creates the DOM nodes and inserts them into actual document.
The mounting step includes an initial render, but with an important side effect — the real DOM now contains those elements.

A component can render many times, but it mounts only once (unless it’s removed and then added to the tree again).

Mounting / unmounting can happen for example if we have some conditional logic 

```js
  function Example() {
    const [show, setShow] = useState(true);
    return (
      <div>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Child />} {/* Child mounts/unmounts here */}
      </div>
    );
}
```


# NEXT JS DATA FETCHING
- CSR
- SSR - server rendered on demand
- ISR - revalidate
- Streaming - mix of SSR and ISR


# SSR (Server‑Side Rendering)
- Happens on every request.
- When a user requests /product/123, the server:
  - Fetches data (e.g. from your API or DB).
  - Renders the React component to HTML.
  - Sends that HTML to the browser — it's immediately visible.
  - Then React hydrates it (attaches event listeners) client‑side.

Use when data changes often or must be personalized per request.
Trade‑off: slightly slower than static because it always runs on demand.


# SSG (Static Site Generation)
- Happens at build‑time.
- Next.js pre‑renders pages as static HTML files (plus minimal JS).
- This means no server computation per request.

Use when content is mostly static — e.g. marketing pages, blog posts, docs.
Trade‑off: must rebuild the site to reflect content updates.


# ISR (Incremental Static Regeneration)
- A hybrid between SSG and SSR.
- Pages are initially generated at build‑time (like SSG).
- But Next can regenerate them in the background after a set revalidate interval (say every 60 seconds).
This gives the feel of live content updates—without expensive per‑request rendering.
Use when data updates occasionally or can tolerate small staleness.

# CSR (Client‑Side Rendering)
- This is traditional React SPA rendering.
- The page is just a skeleton delivered from server; JS runs and fetches data client‑side.
Use when the page is highly interactive, dynamic per user, or doesn’t need SEO pre‑rendering.


# Streaming / Server Components (Next 13+)
- React 18 introduced Server Components and Streaming Rendering.
- These let components run partly on the server — e.g., safe access to DB or secrets — and stream HTML chunks to the browser progressively.
- This gives the immediacy of SSR + the efficiency of static hydration.


# HYDRATION
1. What happens before hydration?
Imagine a page that renders via SSR (server‑side rendering).
When a user requests /home, the server runs your React components, producing pure HTML — no event listeners, no React state.
Hydration is the process by which React (running in the browser) attaches event handlers and rebuilds internal 
   component state by matching the static HTML structure already in the DOM.
React “reclaims” the server-rendered HTML and makes it interactive.
It reuses the existing DOM rather than re-rendering from scratch — that’s crucial for performance.

Roughly, hydration looks like this:
1. The page loads the JS bundle.
2. React runs on the client with the same component tree the server used.
3. React walks the DOM, comparing its virtual DOM output with the existing HTML.
4. If everything matches, React simply attaches event listeners instead of replacing nodes.
5. The page becomes fully “live”.

# Why not just render client‑side directly?
Because SSR gives you:
- Faster First Contentful Paint (FCP) — user sees UI instantly.
- SEO — search engines can index meaningful HTML.
And hydration then “activates” that HTML, turning it into an interactive app.

# Hydration in Next.js specifically

- SSR, SSG, or ISR pages all get HTML + JS bundles.
- Next injects the necessary script tags automatically.
- React hydrates once the JS loads.

In the App Router (React Server Components), hydration is more optimized:
# Server Components render on the server and are never hydrated (they’re not interactive).
# Only Client Components (declared with "use client") hydrate.


# Timeout type
```ts
    type TimeoutId = ReturnType<typeof setTimeout>
    const t = useRef<TimeoutId | null>(null)
    
    useEffect(() => {
    if (t.current) clearTimeout(t.current)
    t.current = setTimeout(() => {
      console.log('')
    }, 500)
    return () => {
      if (t.current) cleartTimeout(t.current)
    }
    }, [])  
```
