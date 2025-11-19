### truncate tailiwnd class

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### h-full

Parent Height Constraint: The h-full class on the child makes its height 100% of its parent. However, if the parent of the parent element does not have a defined height, the child’s h-full will not have any reference height to base itself on, resulting in a height of 0.

### controling grid items position

```css
/*  place-items-center  */
.grid {
  place-items: center; /* Both horizontal and vertical */
}
/* justify-items-center  */
.grid {
  justify-items: center; /* Horizontal centering */
}
/* items-center */
.grid {
  align-items: center; /* Vertical centering */
}
```

### place-items-end // place-items-start

```html
<section
  className="grid place-items-start md:place-items-center lg:place-items-end"
>
  {/* Responsive centering */}
</section>
```

### tailwind v4

Importujemy talwind do global.css

- @import "tailwindcss";

Rozszerzamy klasy taliwinda uywając @theme w global.css
To od razu tworzy nam tez css'ową zmienną, nie musimy już tworzyć jej w .root  
Nadal mozemy to zrobic jeśli chcemy mieć dostęp do zmiennej ale nie chcemy tworzyć klasy tailwindowej.

Aktualnie tak samo dodajemy jak i nadpisujemy istniejące utility classes

```css
@theme {
    --color-nowy-kolor: rgba(fff)
    --font-poppins: Poppins, sans-serif;
}
```

```html
<div className="font-poppins" style="background-color: var(--nowy-kolor)">
  <!-- ... -->
</div>

<!-- lub-->
<div className="bg-nowy-kolor">
  <!-- ... -->
</div>
```

Namespace Utility classes
--color-_ Color utilities like bg-red-500, text-sky-300, and many more  
--font-_ Font family utilities like font-sans  
--text-_ Font size utilities like text-xl  
--font-weight-_ Font weight utilities like font-bold  
--tracking-_ Letter spacing utilities like tracking-wide  
--leading-_ Line height utilities like leading-tight  
--breakpoint-_ Responsive breakpoint variants like sm:_  
--container-_ Container query variants like @sm:_ and size utilities like max-w-md  
--spacing-_ Spacing and sizing utilities like px-4, max-h-16, and many more  
--radius-_ Border radius utilities like rounded-sm  
--shadow-_ Box shadow utilities like shadow-md  
--inset-shadow-_ Inset box shadow utilities like inset-shadow-xs  
--drop-shadow-_ Drop shadow filter utilities like drop-shadow-md  
--blur-_ Blur filter utilities like blur-md  
--perspective-_ Perspective utilities like perspective-near  
--aspect-_ Aspect ratio utilities like aspect-video  
--ease-_ Transition timing function utilities like ease-out  
--animate-_ Animation utilities like animate-spin

❗ Defaultowa paleta kolorów, wszystkie utility klasy etc w tailiwnd 4 znajduje się w node_modules/tailiwnd/theme.css ❗

### Animacje 🦀 keyframes

```css
@import "tailwindcss";
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;

  @keyframes fade-in-scale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

### @layer base

- Dostosowywanie stylów bazowych

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
  h2 {
    font-size: var(--text-xl);
  }
}
```

### @layer utilities

Mozemy chciec stworzyć klasę taliwindową zamiast normalnej klasy, np. po to zeby móc jej uzywać w połaczeniu z innymi klasami z tailwinda np. hover

```css
@utility content-auto {
  content-visibility: auto;
}
```

```html
<div class="content-auto">
  <!-- ... -->
</div>

<div class="hover:content-auto">
  <!-- ... -->
</div>
```

### @layer components

Klasy z warstwy komponentów mogą być nadpisywane przez utility classes

```css
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-xl);
  }
}
```

```html
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

### Hidden scrollbar

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
```

### Custom variant

```css
@custom-variant theme-midnight {
  &:where([data-theme="midnight"] *) {
    @slot;
  }
}

# Wersja skrócona
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

### Disabling dark

If you want your dark theme to be driven by a CSS selector instead of the prefers-color-scheme media query, override the dark variant to use your custom selector:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Now instead of dark:\* utilities being applied based on prefers-color-scheme, they will be applied whenever the dark class is present earlier in the HTML tree:

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

### Detecting system dark mode and combinig it with custom themes

On page load or when changing themes, best to add inline in `head` to avoid FOUC

```js
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
);
// Whenever the user explicitly chooses light mode
localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

### FOUC - Flash of unstyled content

Krótki moment, błysk, w którym user widzi nieostylowany fragment drzewa HTML
Powody:

- style CSS ładująsię asynchronicznie, lub po załadowaniu HTML
- css się nie załadował, fonty się nie załadowały
- CSS in JS - hydration
- ładowanie stylów zewnętrznych przy użyciu import

### Example

```html
<!-- Raw HTML appears first -->
<h1>Welcome to my site</h1>
<p>This text appears without styles</p>

<!-- Then CSS loads and styles are applied -->
<link rel="stylesheet" href="styles.css" />
```

How to prevent it

```html
<head>
  <style>
    /* Critical styles inline */
    body {
      opacity: 0;
    }
    body.loaded {
      opacity: 1;
      transition: opacity 0.3s;
    }
  </style>
  <link
    rel="preload"
    href="styles.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
</head>
<body class="loaded"></body>
```

```css
@font-face {
  font-display: swap; /* Shows fallback font, then swaps to web font */
  font-display: optional; /* Prevents invisible text during font load */
}
```

### DEFER

Adding defer to script tag lets html to load in parallel but execute after HTML parsing ❗
HTML and CSS can render before JS exectues

### Modern strategies

```js
<head>
  <style>
    /* Critical CSS inline */
    .header { background: blue; }
  </style>
  <link rel="preload" href="full-styles.css" as="style">
</head>
<body>
  <script src="load-styles.js" defer></script>
</body>
```

### Key takeaways:

defer prevents FOUC by allowing CSS to load before JS executes  
Without defer, JS blocks CSS parsing, causing FOUC  
Use defer for non-critical JS that doesn't need to run immediately  
Use async for truly independent scripts (but may cause different issues)

### React context

In the context of React FOUC can happen due to hydration.
Server parses html and css but than it is changed by javascript immediately. The solution for this is correct initial state if possible, or hiding content that relays on js.

### CONTAINER QUERIES

Use the **@container** class to mark an element as a container, then use variants like @sm and @md to style child elements based on the size of the container:

```html
div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>

<div class="@container">
  <div class="w-[50cqw]">
    <!-- ... -->
  </div>
</div>
```

The container query length units are:

- cqw: 1% of a query container's width
- cqh: 1% of a query container's height

- cqmin: The smaller value of either cqi or cqb
- cqmax: The larger value of either cqi or cqb

```css
/* Responsive typography */
.text {
  font-size: clamp(1rem, 3cqw, 2rem); /* Scales with container width */
}
```

### Outline i nesting wszystkich elementów na stronie - visual aid

```css
*,
*::before,
*::after {
  outline: 2px solid lime;
  background: hsl(0 100% 50% / 0.1);
}
```

### grid-cols + repeat

Available space: (100% - 140px)
Divide by 8 columns: (100% - 140px) / 8
Repeat 23 times: Creates 23 columns of equal width

```html
<!-- Dashboard with 140px sidebar -->
<div class="grid md:grid-cols-[repeat(23,calc((100%-140px)/8))]">
  <div class="sidebar">140px wide</div>
  <div class="content col-span-22">Uses remaining space</div>
</div>
```

### HIDE ELEMENTS WITH ANIMATION TO 0

```html
<div class="{`open" ? grid-rows-[1fr] : grid-rows-[0fr]`}>
  <p class="overflow-hiddnen"></p>
</div>
```

### Animations

**Simple slide in animation**

```css
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide {
  animation: slideUp 0.6s ease-in forwards;
  animation-delay: 0.2s;
}
```

### animation-fill-mode

animation-fill-mode: forwards; /_ Keep last keyframe after animation _/  
animation-fill-mode: backwards; /_ Apply first keyframe before animation starts _/  
animation-fill-mode: both; /_ Both forwards and backwards _/  
animation-fill-mode: none; /_ Default, no retention _/

### animation-direction

normal (default): Animation plays from start to end (from 0% to 100% keyframes).  
reverse: Animation plays from end to start (from 100% to 0% keyframes).  
alternate: Animation alternates direction each cycle—first forward (0% to 100%), then backward (100% to 0%), and so on.  
alternate-reverse: Animation alternates direction each cycle, but starts in reverse—first backward (100% to 0%), then forward (0% to 100%), etc.

### animation property values\*

animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];
