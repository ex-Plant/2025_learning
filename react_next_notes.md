isNan()  
substring()  
React.lazy()
useEffectEvent()

### RULES OF HOOKS

- Generally only use hooks at the top level of React components, do not use it inside loops, conditions, event
  handlers etc.

### useEffectEvent -> React 19.2^

https://www.youtube.com/watch?v=uQpky6ygfk0  
Call useEffectEvent at the top level of your component to declare an Effect Event. Effect Events are functions you
can call inside Effects, such as useEffect and _you do not have to include them in the dependency array._  
Effect Events should only be called within Effects. Define them just before the Effect that uses them.  
Only use useEffectEvent to extract logic that does not depend on changing values.  
In some cases, you may want to read the most recent props or state inside an Effect without causing the Effect to re-run when those values change.

```js
import { useEffect, useContext, useEffectEvent } from "react";

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
  }, [url]);
}

function OldWay({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  //  Before we would have to do something like this,
  /* Since we only want to rerun the effect if url changes, not when number of items changes we had a few workarounds.
     Our options where to store same vals in ref and check if it changed, or to disable eslint complaining about non 
     exhasustive deps. Now we can do it the right way. 
     */

  useEffect(() => {
    function logVisit() {
      console.log(url, numberOfItems);
    }

    logVisit();
  }, [url, numberOfItems]);
}
```

### RENDERING

In react it means executing component function body, this way React knows what it must paint on the screen.  
Rendering can happen when:

- component is mounted - added to the DOM - initial render
- components state changes
- component props changes
- parent component re-renders

Each render produces a new React element tree (Virtual DOM) that is later compared with the previous one (the diff)
and real dom is updated only where it is necessary

### Mounting / unmounting

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

### useEffect

`USE EFFECT RUNS AFTER THE RENDER` - when component is mounted

- runs when the component mounts and unmounts
- runs whenever the dependency changes

`Cleanup function runs on unmount` so that we can get rid of all the effects running in the background - we don't want them running when the component is not in the DOM anymore.

### Why we need to return cleanup function

- prevent memory leaks: If listeners aren't removed, they can continue to exist and consume memory even after the component is no longer needed.
- avoid unexpected behavior: Unmounted components shouldn't trigger updates or cause side effects.
- performance optimization: Unnecessary listeners can impact performance, especially in larger applications.

### NEXT JS DATA FETCHING

- CSR
- SSR - server rendered on demand
- ISR - revalidate
- Streaming - mix of SSR and ISR

### SSR (Server‑Side Rendering)

- Happens on every request.
- When a user requests /product/123, the server:
  - Fetches data (e.g. from your API or DB).
  - Renders the React component to HTML.
  - Sends that HTML to the browser — it's immediately visible.
  - Then React hydrates it (attaches event listeners) client‑side.

Use when data changes often or must be personalized per request.
Trade‑off: slightly slower than static because it always runs on demand.

### SSG (Static Site Generation)

- Happens at build‑time.
- Next.js pre‑renders pages as static HTML files (plus minimal JS).
- This means no server computation per request.

Use when content is mostly static — e.g. marketing pages, blog posts, docs.
Trade‑off: must rebuild the site to reflect content updates.

### ISR (Incremental Static Regeneration)

- A hybrid between SSG and SSR.
- Pages are initially generated at build‑time (like SSG).
- But Next can regenerate them in the background after a set revalidate interval (say every 60 seconds).
  This gives the feel of live content updates—without expensive per‑request rendering.
  Use when data updates occasionally or can tolerate small staleness.

### CSR (Client‑Side Rendering)

- This is traditional React SPA rendering.
- The page is just a skeleton delivered from server; JS runs and fetches data client‑side.
  Use when the page is highly interactive, dynamic per user, or doesn’t need SEO pre‑rendering.

### Streaming / Server Components (Next 13+)

- React 18 introduced Server Components and Streaming Rendering.
- These let components run partly on the server — e.g., safe access to DB or secrets — and stream HTML chunks to the browser progressively.
- This gives the immediacy of SSR + the efficiency of static hydration.

### Hydration

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

### Why not just render client‑side directly?

Because SSR gives you:

- Faster First Contentful Paint (FCP) — user sees UI instantly.
- SEO — search engines can index meaningful HTML.
  And hydration then “activates” that HTML, turning it into an interactive app.

### Hydration in Next.js specifically

- SSR, SSG, or ISR pages all get HTML + JS bundles.
- Next injects the necessary script tags automatically.
- React hydrates once the JS loads.

In the App Router (React Server Components), hydration is more optimized:

- Server Components render on the server and are never hydrated (they’re not interactive).
- Only Client Components (declared with "use client") hydrate.

### client/server

`You can wrap a server component with a client component without making it a client component` when you are not importing it to the client component. When using children pattern we are actually doing just that.

In server components `rendering happens on the server` but `the result of that rendering is than parsed to the client`. Thanks to that we can do all the heave lifting on the server.

`The 'server' is a computer, or cloud server or whatever where the app is running.` For example during development it is a local machine, onn prod it can be a serverless envorienment like Vercel or some server that you rent.
`When the user visits the page, the user's browser - client - is making a request to the server.`
In the context of server side code that is where all of it is happening and where you would ideally place all of the API calls, expensive calculations stuff like this. `After running the code the result is generated as HTML CSS and sometimes JSON, and then it is send to the client.`

The server is usually more secure and has more power, it keeps sensitive data from the user thus being more secure,
it reduces the amount of work that needs to be done by the client.

1. Browser requests the page
2. The server runs server side logic
3. Server sends back the rendered HTML
4. The browser displays html to the user
5. If there are any client components they get hydrated and become interactive.

### Rendering

`In web development (including Next.js) means:
Taking your code (React components, data, etc.) and running it to produce the final HTML (and sometimes CSS/JS) that the browser can display, so rendering = running code that generates the UI`

Examples:
On the server: Rendering means running your React components (with any data) to produce HTML that will be sent to the browser.  
On the client: Rendering means React takes the JavaScript code and builds the UI in the browser.
In short:

`Rendering = running code that creates the visible output (HTML, UI) for the user.`

### middleware

is just the `action that runs between the client and the server`, so whenever a client is making a request - we can do something in between like check auth.

NEXT 16 -> renamded to proxy.
EDGE RUNTIME IS NOT SUPPORTED IN PROXY
If you want to continue using the edge runtime, keep using middleware.

### Client-Side Cache

`Stores RSC payload after navigating to some page and going back - data for that page is already rendered and ready`

### CACHING / MEMOIZATION

`Memoization last for the duration of the render pass`
The cache lasts the lifetime of a server request until the React component tree has finished rendering.
`When a server receives a request to render a page, it may fetch data (e.g., with fetch()).
React (and Next.js) will cache the results of these fetches for the duration of that single server request.`  
This cache is only valid while the server is building the React component tree for that request.
`Once the rendering is done and the response is sent to the client, the cache is discarded.
If a new request comes in, a new cache is created for that request.`  
New request means:

- A user visits or reloads a page that is rendered on the server (SSR/Server Components) dynamically.
- The client navigates to a new page that requires server-side rendering (e.g., via Next.js app router navigation).

- An API route or server function is called that triggers a new server-side render due to revalidation etc.

`If a site is static the page is rendered on the server only during build time` (when you run next build or the equivalent build command).  
The HTML (and any data fetched during build) is generated once, then saved as static files.
zWhen a user visits the site, the server (or CDN) just serves these pre-built static files—no server-side rendering happens at request time.`  
`The fetch cache/memoization applies only during the build process, not at runtime.`
Summary:  
For static pages, server rendering (and fetch memoization) only happens at build time. All users get the same pre-rendered HTML until you rebuild the site.

`If the page is dynamic with revalidation (using revalidate or ISR in Next.js)`
the server render (server pass) happens:

- At build time (for the initial static generation).
- whenever the revalidation interval expires and a new request comes in (the page is regenerated on the server and the cache is updated).

`If the page is fully dynamic (e.g., dynamic = "force-dynamic" in Next.js)` the server render happens every time a user requests or navigates to that page.
There is no static cache - each request triggers a fresh server-side render and fetch.

### Static

- component run during the build
- html is already there during the build it is not created on request

### Dynamic

- rerendered on request
- `using some next.js features will automatically turn some pages into dynamic pages, for example using cookies, search params, params etc.` because they are using request-specific data, that can't be known during the build time.
- generate static params can make some of these dynamic pages static so that next.js can render them statically during the build
- `generateStaticParams` MUST return array of slug objects [{slug: "slug"}] - this way next js knows it needs to run them during build and render them -`CLIENT COMPONENTS RUN ON THE SERVER ONCE - during build time`

### PREFETCHING IN LINK COMPONENT

- on prod next will prefetch data to components, pages when they are in view.
- It will receive `REACT SERVER COMPONENT PAYLOAD` which is a result of rendering a server component and put it in the client-side cache (`ROUTER CACHE`)

### cache()

- if we are not using fetch that is cached by default we need to do that ourselves
- using unstable cache is caching data from data source for the `duration of a session refresh will delete it`

```js
const getCachedUsers = cache(async () => {
  try {
    const data = await prisma.users.findMany();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
});
const cachedData = await getCachedUsers();
```

### Fetching Data

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
    const json = await response.json();
    console.log(json);

  } catch (error) {
  console.error(error.message);
}
```

Why we need `(!response.ok)`?  
The try catch block here is catching unexpected errors, for example if a broken url is provided.  
But what if we try to access a resource we do not have persmission to access and server responds with 404 error.
We need to handle this response ourselves either by throwing an error or sent a response of an exepcted format to the client.

`All methods to access the response body content are asynchronous.`

By default, fetch() makes a GET request, but you can use the method option to use a different request method.
The request body is the payload of the request: it's the thing the client is sending to the server. You cannot include a body with GET requests.

```js
const response = await fetch("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
});
```

You can supply the body as an instance of any of the following types❗:

- string
- ArrayBuffer
- TypedArray
- DataView
- Blob
- File
- URLSearchParams
- FormData
- ReadableStream

`server is stateless - it receives a request from the client, and it sends response - after that it forgets` everything, that is why we can not do state management on the server like we can on the client - hence libraries, and tools like zustand or context api are client side only

### server security and server-only

Whenever there is some vulnerable users data that you do not want to leek to the client it is good idea to `put them to a separate catalogue like server-utils etc. and install a package called server-only` and import it at the top of the file that you want to keep on the server

```js
import "server-only";

// This will trigger an error if called from a client component❗
export async function doSomethingOnTheServer() {
  console.log("I am a server function");
}
```

### SERVER ACTIONS

async functions that run on the server

### LOADING AND SUSPENSE

loading.tsx is a special file in next.js that allows next.js to use React Suspense feature
Whenever there's some server side component that is awaiting some data and you add loading file it would be
equivalent to wrapping the whole component in a

```js
<Suspense fallback={Loading...}><SomeAwaitedComponent/></Suspense>
```

### STREAMING

-You can add a suspense yourself - very useful for example if you want to leverage `STREAMING` in next.js. Lets say
we dont want to block the entire page when fetching data needed only by a small component within it. We can make
this component fetching data a server component and fetch data directly within it as close as possible to a place
where this data will be used. Data to this component will be streamed in by next when they are ready, but will not
block rendering or interacting with the page. You can also incorporate your own strategy what you want to do with
that component while it is being streamed.

# dynamic rendering

- NO CACHING - PAGE ALWAYS HAS A FRESH ACTUAL DATA - COMPONENT IS RENDERED WHENEVER THSE USER MAKES A REQUEST

# static rendering

- data fetched during build and only then

# export const dynamic = 'force-dynamic'

- this will make every component in the current route dynamic
- to do that on the fetch level you can add no-cache option

### OPTIMIZING COMPONENTS - INITIALIZER FUNCTION

```js
const [test, setTest] = useState(() => localStorage.getItem(`key`));
```

useState callback:

- `the calculation happens before the first render`
- `component renders with the calculated data immediately`
- `more efficient - avoids extra render`
- `renders only once`

  useEffect:

- `component first renders with null (or whatever initial state you set, then re-renders with the calculated date`
- `the calculation happens after the first render`

```ts
export const OptimizeGettingInitialState = ({ name }: any) => {
  const [data, setData] = useState(() => {
    // This function will only run once on initial render
    console.log("Calculating initial state...");
    // Simulate an expensive operation
    const result = Array.from({ length: 1000000 }, (_, i) => i).reduce(
      (sum, num) => sum + num,
      0
    );
    return result;
  });
};
```

### event.currentTarget.scrollTop

Handle scroll using React's onScroll prop

```js
const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
  // The event target is the scrollable element
  const scrollTop = event.currentTarget.scrollTop;
  console.log(`scrolling, position: ${scrollTop}`);
  // Update swipe down state based on scroll position
  setSwipeDownDisabled(scrollTop > 5);
};
```

### debounce within foo

```js
function handleSearch(val: string) {
  if (timeoutId.current) clearTimeout(timeoutId.current);

  timeoutId.current = setTimeout(async () => {
    setSearch(val);
    timeoutId.current = null;
  }, 500);
}
```

### ZUSTAND PERSISTS

- useful middelware to automaticaly get and set data from local storage etc

### CUSTOM HOOKS

custom hooks are recreated whenever they arey usesed, so they should not be a replacement for using store !!!

### useCallback

`Memoizing function definition`

`re-rendering` means executing everything within the function body of a
componet and this means that `if we have a function definition inside a component body, we are creating a new one on every render, we are creating a new reference`. To avoid this we need to memoize the function definition. This is optimization but also it is necessary to avoid infinite loops when we are passing this
function as an argument to a dependency array in useEffect or useCallback.

### State setters in dep arrays

Not required - react guarantees that setters are actually stable,
but still you will see a lot of linter warnings about this and you can add them anyway.

### RECREATING OBJECTS WITH EVERY RERENDER

Functions and objects are recreated on every render simply becuase of how javascript works. objects are created with pointers to a certain place in memory. When component is re-rendered and everything within is executed this means also creating new pointers or references to memory location.

### Maps and unique keys

- index is ok when we are mapping over a list of items that won't change order of it's members. However if the order does change, we should use unique keys so that React can keep track of the items correctly.
- `using new Date().getTime() or something similar like Math.random() will not be persistent in between re-renders`

### useSearchParams from React Router

Getting params:

```js
searchParams.get(`industry`) || '',
```

Setting params

```js
function setParams(newParam: string) {
  setSearchParams((params) => {
    const newParams = Object.fromEntries(params);
    newParams.view = newParam;
    return newParams;
  });
}

setSearchParams("?tab=1");
setSearchParams({ tab: "1" });
setSearchParams({ brand: ["nike", "reebok"] });
setSearchParams(new URLSearchParams("?tab=1"));
```

### Page transition animations with framer

```js
export default function Template({ children }: PropsT) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Adding fonts

Import variable fonts in layout.
If you add variable option Next.js automatically creates a CSS variable and injects it into the DOM.

```js
const inclusive_Sans = Inclusive_Sans({
  variable: "--font-inclusive",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});
<body
  className={cn(geist.variable, inclusive_Sans.variable, "font-inclusive")}
></body>;
```

### Tailwind 4

Add imported variable fonts as css variables in global.css

```css
/* noinspection CssUnresolvedCustomProperty */
--font-inclusive: var(--font-inclusive);
/* noinspection CssUnresolvedCustomProperty */
--font-geist: var(--font-geist);
/* noinspection CssUnresolvedCustomProperty */
```

### Tailwind 3

I tailwind 3 we need to add variable fonts to tailwind.config

```css
fontFamily: {
  sans: ['var(--font-inclusive)'],
  geist: ['var(--font-geist)'],
},
```

# next 16 images fix

❌ next 16 image error:
upstream image http://localhost:3000/api/media/file/output-onlinejpgtools-2.jpg?2025-11-11T21%3A43%3A06.468Z resolved to private ip ["::1","127.0.0.1"]

```js
<Image
  unoptimized={
    src.toString().includes("localhost") || src.toString().includes("127.0.0.1")
  }
/>
```

### Adding and removing listeners using abort controller

```js
useEffect(() => {
  const controller = new AbortController();
  const signal = new AbortController().signal;

  function handleScroll() {
    console.log(`scroll...`);
  }

  function handleClick() {
    console.log("click...");
  }

  function dragstart() {
    console.log("dragstart...");
  }

  document.addEventListener(`scroll`, () => handleScroll, {
    signal,
  });
  document.addEventListener(`click`, () => handleClick, {
    signal,
  });
  document.addEventListener(`dragstart`, () => dragstart, {
    signal,
  });

  return () => controller.abort();
}, []);
```

### generate metadata

```js
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

You can add it at the layout level and than overwrite it on the page level if you want to have a dynamic title or
description.

### Dynamic metadata

- you have access to params
- you can fetch data inside (prefereably in concjunction with caching)

```js
export async function generateMetadata({ params }) {
  // Fetch data, e.g., from an API
  const data = await getData(params.id);
  return {
    title: data.title,
    description: data.summary,
  };
}
```

### usePathname

Good to know: When cacheComponents is enabled usePathname may require a Suspense boundary around it if your route has a dynamic param. If you use generateStaticParams the Suspense boundary is optional

### Setting @ alias in ts.config

this means @ will point to src catalogue

```js
"paths": {
"@/_": ["./src/_"]
}
```

### openGraph

- test if your page images shows up correctly on social media etc

### useActionState

- instead of showing error by triggering toast in use effect we can do something like
  if error than show something
- no javascript needed
- good for progressive enhancement

```js
const { cartItems } = useCart();
// this is how we add extra values to form action
const checkoutWithCartItems = proceedToCheckout.bind(null, cartItems);
const [state, formAction, pending] = useActionState(checkoutWithCartItems, initState);

useEffect(() => {
  console.log(state, "state");
  if (state.success) {
    toast.success(`😎`);
    router.push(`/tickets`);
  }
  console.log(state, `🍆`);
}, [state]);

...
<form action={formAction} className={`relative grid gap-4`}></form>

export async function proceedToCheckout(
  cartItems: string[], prevState: FormStateT, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const data = formSchema.parse(raw);
  const entries = Object.entries(data) as [keyof FormT, string][];
...

if (cart?.checkoutUrl) {
  //@ts-expect-error url is fine
  redirect(cart.checkoutUrl);
} else {
	console.log('Failed to create cart');
  // data must return back to populate form that react resets by default
	return { error: true, data: formSchema.parse(raw) } as FormStateT;
}
// SHADCN SELECT - hidden input to add data to formDAta
<input type='hidden' name='project_type' value={formSelects.project_type} />
```

# Preventing resetting form after submit via form action

By default, after form action form will be reset. But since we can return whatever we want from form action, we can
pass a form object, and use it's value as a default value to populate the fields again.

```js
const [state, formAction, pending] = useActionState(actionTest, initData);
<Input
  defaultValue={state?.company_name}
  placeholder={"Nazwa firmy / pracowni"}
  name={"company_name"}
/>;
export async function actionTest(prevState: FormT, formData: FormData) {
  if (formData) console.log(formData?.get("company_name"));
  return { company_name: "test" };
}
```

### useTransition

`Perform non-blocking updates with Actions`

```js
const [isPending, startTransition] = useTransition();
const router = useRouter();

async function handleRegister(formData: FormData) {
  startTransition(async () => {
    const res = await registerUser(initState, formData);
    console.log(res, "res");

    if (res.success === "ok") {
      toast.success(`User registered 🚀`);
      router.push(`/tickets`);
    }

    if (res.success === "failed") {
      toast.error(`Something went wrong 🚨:` + res.message);
    }
  });
}
```

### flushsync

if you have multiple state setter functions or state updates in a single event react may batch them together - it
means that it will try to update the state in a single redner pass which is good for optimization, but not
necessarily what we might want - for example if we want one state update to happen before the other. We can use
flushSync to handle such cases

```js
import { flushSync } from "react-dom";
flushSync(() => {
  setSomething(123);
});
```

Caveats: it can hurt performance and should be treated as a last resort.

flushSync lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

### Validation on the server - zod

You want to `validate data on the client to show instant feedback to the user`, but you also want to `validate data on
the server to prevent sending manipulated data to the sever` - data for exmaple, a user can manipulate client data using dev tools and bypass validation.  
That is why we are using zod.

`CUID` (Collision-Resistant Unique Identifier)

You deployed your Payload / Next.js project to Vercel from GitHub.
Vercel gave it a public URL like your-project.vercel.app.
By default, that URL is live and public, meaning search engines can find and crawl it, even if it’s not finished.

- `Crawling`: bots (like Googlebot) visit and read your site’s pages.
- `Indexing`: search engines decide to store those pages in their search results.
  You can be crawled but not indexed.

### How crawlers find sites

- Following external links → from other indexed pages, social media, GitHub readme, etc.
- Sitemaps → URLs submitted directly (e.g., /sitemap.xml).
- DNS & public records → new domains/subdomains are sometimes scanned.
- Manual submission → through Search Console or external links.
  Timeframe: anywhere from hours to weeks after deployment.

### How to check if your site was crawled or indexed

Search on Google:
site:yourdomain.com

- If results appear → indexed.
- If no results → not indexed yet (but might be crawled soon).

Use Google Search Console:

1. Go to search.google.com/search-console
2. Add property (domain or URL prefix)
3. Verify ownership with an HTML file or meta tag
4. Open Pages and Crawl Stats  
   You’ll see whether it was crawled, when, and which URLs were indexed.

Check for user agents like Googlebot, Bingbot to see if bots have visited.

### 🚫 Why you should block crawlers during development

1. Protect incomplete content – unfinished or placeholder text might be indexed.
2. Avoid duplicate content – dev and production could compete in search results.
3. Prevent data or structure leaks (e.g., admin routes).
4. Preserve brand and SEO quality until the site is ready.
5. Avoid cleanup later (removing cached dev URLs from Google can take weeks).
   In short: unfinished = private.

### 🛡️ How to block crawlers

#### Add robots.txt to /public (blocks all bots from all pages.)

```
User-agent: \*
Disallow: /
```

❌ If sitemap generates it during build this will not work.

```js
next-sitemap.config.cjs


module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [, '/pages-sitemap.xml', '/', ],
  robotsTxtOptions: {
  policies: [
    {
      userAgent: '',
      disallow: '/',
    },
  ],
  additionalSitemaps: [${SITE_URL}/pages-sitemap.xml],
},
}
```

#### Add noindex meta tags

In your Next.js layout or Payload config:

```js
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
```

Enable password protection on Vercel

### How sitemaps fit into all this

- A sitemap (usually /sitemap.xml) lists URLs for crawlers.
- It’s a roadmap, not a command — it helps search engines find your pages faster.
- You specify it in:  
  Sitemap: https://yourdomain.com/sitemap.xml  
  inside robots.txt.

During development, do not provide a sitemap or block it entirely.
In production, generate one dynamically so Google can see fresh pages.

- Vercel deployments are public — crawlers can find them fast.
- Always block crawlers in development.
- Use robots.txt + noindex + environment logic.
- Confirm status via Google Search Console.
- Publish openly only when your site is ready.
