Lighthouse score focuses on technical correctness and website performance.

### Core Web Vitals

1. TTFB (Time To Firs Byte )  
   `Time between request to receiving first byte`

   - server response time
   - server location
   - dynamic rendering
   - database latency

2. FCP (First Contentful Paint)  
   `Time it takes to paint first text or image on the screen`

   - render blocking resources like CSS, JS, fonts,
   - lazy loading strategy
   - slow network

3. LCP (Largest Contentful Paint)  
   `When first main visible content is painted like hero or h1`

4. FID (First Input Delay)  
   `Time from user interaction to response`

5. INP (Interaction to Next Paint)  
    `Successor of First Input Delay `

   FID AND INP are affected by:

   - blocked main thread, for example during hydration
   - bloated JS,
   - third-party-scripts,
   - inefficient event handlers etc.
   - large React hydration times
   - heavy re-renders or layout recalculations

6. CLS (Cumulative Layout Shift)  
   `Layout movement during load`

   - Images without dimensions
   - loading fonts
   - dynamically rendered content like ads etc.

### Other factors affetcting performance score

1. Preload & Prefetch strategies

```html
<link rel="prelaoad" /> <link rel="dns-prefetch" />
```

2. Render-blocking resources

- CSS in <head>
- js without async or defer

3. HTTP caching headers

- max age
- cache / no-cache

4. Image optimization

- next gen formats like webp or .avif
- lazy loading
- responsive sizes

5. Compression

6. Code Splitting

7. Critical Rendering Path

### SEO affecting factors beyond speed

- using correct html tags like having main, h1 etc
- correct metadata (title, description)
- crawlable, logical link structure
- robots.txt and sitemap included - proper crawlers access - robots.txt and sitemap included
- accessibility - alt texts, Aria roles
- rendering strategy SSG vs SSG vs CSR

## Page Loading Cycle

### 1. Request

- user goes to a url
- browser resolves DNS -> opens `TCP Transmission Control Protocol` -> a contract between user's device and a server to establish o communication line
- If webite is using `HTTPS (HyperText Transfer Protocol)` than there is an extra encryption contract to keep the data private called `TLS (Transport Layer Security)`

🚀 TTFB happens here
In the context of next.js, it is affected by

- server boot time
- data fetching
- api round trips
- rendering html on a server

### DOM

`Live data structure representing elements and their relationships.`  
Raw html

```html
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
    <h1>Hello!</h1>
  </body>
</html>
```

DOM representation

```text
Document
└─ html
   ├─ head
   │  └─ title ("Title")
   └─ body
      └─ h1 ("Hello!")
```

While parsing, the browser incrementally adds nodes as it reads each tag — `“building the DOM”` literally means `turning raw HTML into a structured internal representation`.

### 2. Response

1. Browser receives HTML from the server
2. Starts parsing → building DOM node by node
3. Encounters <link rel="stylesheet"> in head → starts downloading CSS → build CSSOM in background
4. Keeps parsing HTML (head + body)
5. Encounters scripts
   - if blocking ⇒ pause parsing, run JS
   - if defer ⇒ keep going, run later
   - if async ⇒ download + run whenever ready
6. When HTML parsing done: DOM complete
7. When CSS finished downloading → CSSOM complete
8. DOM + CSSOM → Render Tree  
   ` The Render Tree (what gets painted) can only be created when both are ready.` So before that rendering is blocked. That is why CSS is blocking by default.
9. Layout → Paint (FCP / LCP)
10. After HTML is painted:

    - deferred scripts execute,
    - React hydrates
    - Once hydration completes, the app becomes interactive, event handlers kick in.
    - DOMContentLoaded fires

Request → TTFB → FCP → LCP → (Hydration in React) → FID/INP → CLS stabilization.  
`In performance terms, everything that delays CSSOM creation delays FCP && LCP.`

### Loading strategies

`Preload` - fetch immediately

```html
<link rel="preload" />
```

- Hero image
- Critical fonts
- Above-the-fold scripts or styles

`prefetch` - fetch it quietly when idle, for the next navigation or interaction.

```html
<link rel="prefetch" />
```

- loading data before navigation
- Browser fetches it with low priority and stores in cache → instant next page.

`dns-prefetch`

```html
<link rel="dns-prefetch" />
```

User for external resources.
The browser pings the DNS so when it eventually needs to fetch that resource, it skips DNS lookup time.

`preconnect` - Purpose: Prepare a connection (DNS + TCP + TLS) to another origin early.

```html
<link rel="preconnect" />
```

This is stronger than dns-prefetch: it actually opens the connection so the future request is instant.

When the browser parses HTML, it can’t paint anything meaningful until it has:

1. The DOM (from HTML)
2. The CSSOM (from all CSS)
3. Combined → Render Tree

- `CSS files are render-blocking by default`
- The browser must wait for all external styles to download → parse → build CSSOM.
- No paint before that, because styles affect layout and pixels.
- If you inline critical CSS or use media queries (like media="print"), those don’t block painting of visible content.

Js is also blocking by default but you can

- `defer` to load after HTML parsed, before DOMContentLoaded - run after the page is visually ready (painted), but before browser says “DOM is ready enough to interact.”`

- `async` to load when ready (can be sometimes blocking )

### Critical Rendering Path

`Minimizing steps before first paint`  
HTML parse → build DOM → download CSS → build CSSOM → render tree → paint

Optimization means:

- Cut requests on that path (inline critical CSS).
- Defer non-critical scripts.
- Preload key assets (hero image, font).

❗ There are two things happening in parallel as a page loads:

1.  `Critical Rendering Path`  
    Deals with building and painting the page (visual part).  
    → HTML → DOM → CSSOM → Render Tree → Layout → Paint

2.  `Script Loading/Execution Path`  
     Deals with when JavaScript is downloaded and executed.  
    → Depends on script attributes (async, defer, or none)

HTML text ──► DOM tree (structure)
CSS text ──► CSSOM tree (rules)
DOM + CSSOM ─► Render Tree (what’s visible)
Render Tree ─► Layout + Paint

### 🚀 Next.js context

`SSG` (Static Site Generation)`
HTML generated at build time.  
Excellent for SEO and performance (instant TTFB).

`SSR (Server-Side Rendering)`  
HTML generated for every request.  
Slightly slower TTFB but great SEO (searchable HTML).

`ISR (Incremental Static Regeneration)`  
Hybrid of SSG and SSR.
Good compromise for updating static pages periodically.

`CSR (Client-Side Rendering)`
Blank page + JS loads everything. Poor SEO unless hydrated quickly or prerendered/fallback.

OPTIMIZATIONS in next/react

- next image - lazy loading, resopnsive sizes, format
- next/script - adds defer by default
- dynamic imports (code splitting)
- critical css extraction and removing render-blocking CSS
- static assets (CDN or from public dir)
- preloads critical assets, fonts etc
- Prefetching routes
  → will load the chunk for /about in background via rel="prefetch".

### Code splitting in next.js

Next auto code-splitting

- each page is a separate chunk
- navigating between routs loads only that route's js bundle
- prefetches bundles for visible <Link> targets

Good candidates for `manual code splitting`

- Large components visible only after user interaction
- Rarely used, below the fold etc.

  ✅ You save initial JS → faster FCP/LCP → better Lighthouse and Core Web Vitals.

```js
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../components/Chart"), {
  loading: () => <Skeleton />,
});

export default function Dashboard() {
  return (
    <>
      <Header />
      <MainStats />
      {/* Chart loads only when rendered (i.e. after user clicks something) */}
      {showChart && <Chart />}
    </>
  );
}
```
