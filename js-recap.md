
# script tag 
- You can add script tag both in the head and body element.
- if in head it is executed before rest of the HTML is parsed kicks in
- but often we need parsed DOM first before we can use js, as it is used to manipulate it, that is why we have 
  different strategies when it comes to loading scripts, we can choose what can be executed independently, and what 
  we need before anything else

# Default script tag, usually added at the end of the body tag
- The browser reads HTML line by line.
- When it finds this <script>, it stops parsing.
- It downloads and runs the script immediately.
- Then continues with the rest of the page.
- Not ideal it is blocking the page, for example downloading data etc.
🚫 Blocks the page from loading until the script finishes.
✅ Guaranteed that the script runs in order with other <script> tags.
✅ Common in older HTML for the same reason defer is useful today — added at the end of the body tag
```js
    <script src="./script.js"></script>
```

# async
- usually in head
- The script downloads in parallel with the HTML.
- As soon as it finishes downloading, it runs immediately, even if HTML is not fully loaded yet.
- ⚡ Fast loading (non-blocking).
- ⚠️ execution order is not guaranteed if you have multiple scripts, because whoever finishes downloading first 
  runs first.
*Good for: independent scripts like analytics or ads* — they don’t depend on the page’s HTML or other scripts.
```js
     <script src="app.js" async></script>
```

# defer
- usually in head
- The script downloads in parallel (non-blocking).
- It waits until the HTML is fully parsed.
- Then runs in the order they appear in your HTML.
- ✅ Doesn’t block loading.
- ✅ Keeps the right order.
- ✅ Can safely access any DOM element in the page.
- Good for: most of your application logic — basically, defer is the best choice for scripts at the bottom of your 
  <head>.
```js
    <scipt src="" defer><script/>
```

# Styles 
```js
  <link rel='stylesheet' href='./styles.css'/>
```

# ❌ Var Scoping
Var is function scoped, not block scoped
```js
  var test  = 1
  console.log(test); // 1

  // this is var problematic behavior, due to lack of scoping it has changed global variable's value
  if (true) var test = 2
  console.log(test); // 2

  // in functions it works as expected
  function testFoo() {
    var test = 3;
  }
  console.log(test); // 2 
```

# ✅ let 
```js
  let testLet  = 1
  console.log(testLet); // 1

  // works as expected, global testLet is only chaned within a block of code
  if (true) {
    let testLet = 2
    console.log(testLet) // 2
  }
  console.log(testLet); // 1

  function testFoo() {
    let testLet = 3;
  }
  console.log(testLet); // 1
```
