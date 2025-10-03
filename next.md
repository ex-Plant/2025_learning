**SERVER ACTIONS**
-server actions are async functions that run on the server


**LOADING AND SUSPENSE**
- loading is a special file in next.js that allows next.js to use React Suspense feature
Whenever there's some server side component that is awaiting some data and you add loading file it would be 
  equivalent to wrapping the whole component in a <Suspense fallback={Loading...}><SomeAwaitedComponent/></Suspense>


**STREAMING**
-You can add a suspense yourself - very useful for example if you want to leverage `STREAMING` in next.js. Lets say 
we dont want to block the entire page when fetching data needed only by a small component within it. We can make 
this component fetching data a server component and fetch data directly within it as close as possible to a place 
where this data will be used.  Data to this component will be streamed in by next when they are ready, but will not 
block rendering or interacting with the page. You can also incorporate your own strategy what you want to do with 
that component while it is being streamed.
 

- ROUTE CACHE - 5 MI
-  


**dynamic rendering** 
- NO CACHING - PAGE ALWAYS HAS A FRESH ACTUAL DATA - COMPONENT IS RENDERED WHENEVER THSE USER MAKES A REQUEST 

**static rendering**
- data fetched during build and only then

export const dynamic = 'force-dynamic'
- this will make every component in  the current route dynamic

- to do that on the fetch level you can add no-cache option
- to revalidate after a certain amount of time or after some event etc - revalidate


**middleware**
- you can do something before the request hits the server - for example you can check if the user is logged in

**client/server**
- you can wrap a server component with a  client component without making it a client component when you are not 
  importing server one component into client component. When using children pattern we are actually doing just that

****
