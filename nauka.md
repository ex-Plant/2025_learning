## MAP ##
let issuesMap = new Map()
currentlySelectedIssues.forEach(i => {
if (issuesMap.has(i.status)) {
issuesMap.get(i.status).push(i)
} else {
issuesMap.set(i.status, [i])
}
return issuesMap
})
issuesMap.set(`dummKey`, currentlySelectedIssues)
const issuesByStatus = Array.from(issuesMap)
const issuesByStatus: IssuesByStatusT = Array.from(issuesByStatusMap.entries())


## REDUCE + MAP ##

 const testArr = currentlySelectedIssues.reduce((acc, issue) => {
   if (!acc.has(issue.status)) {
     acc.set(issue.status, [issue])
   } else {
     acc.get(issue.status).push(issue)
   }
   return acc
 }, new Map()
 const numbersArr = [1, 2, 3, 4]

 const newArr = numbersArr.reduce((acc, item) => acc + item, 0)

.map(...) always returns an array of the same length as the original. If you did currentlySelectedIssues.map(...), you’d end up with an array of intermediate results rather than a single aggregated result.
.reduce(...) is designed to accumulate or fold the entire array into one result—like summing numbers, building objects, or in this case, grouping items into a Map.

## How .reduce(...) works ##

Purpose: .reduce(...) iterates over each item in the array (currentlySelectedIssues) and builds up a single “accumulated” result—in this case, a Map.
Parameters:
A callback function: (acc, currentItem) => { /* logic */ }
An initial value for the accumulator: new Map()
On each iteration, the acc (short for accumulator) starts off as the initial value (an empty Map) and becomes whatever you return from the callback.



## search params ##
const [searchParams, setSearchParams] = useSearchParams()

## GETTING PARAMS ##
industry: searchParams.get(`industry`) || '',

## SETTING PARAMS ##
function handleTabChange(val: string) {
setSearchParams(params => {
const newParams = Object.fromEntries(params)
newParams.view = val
return newParams
})
}

## CHECK IF VALUE IS OF CERTAIN TYPE ##
function isTargetFilter(val: string): val is IssuesTargetFilterT {
return val === 'all_issues' || val === 'my_issues' || val === 'created_by_me'
}



## SORT ##
const sortedIssues = [...issues].sort((a, b) => {
if (!a.dueDate) return 1       // (1)
if (!b.dueDate) return -1      // (2)
return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() // (3)
})

[...issues] creates a shallow copy of the issues array so that the original array isn't modified.
The sort function uses a comparison function that takes two elements (a and b) and determines their order.
In a comparison function:
Returning a positive number (like 1) means "a" should come after "b"
Returning a negative number (like -1) means "a" should come before "b"
Returning 0 means they are equal in terms of sorting

Now, let's look at the logic:

(1) if (!a.dueDate) return 1:

If "a" doesn't have a due date, we return 1.
This means "a" should come after "b", effectively pushing items without due dates towards the end of the array.
(2) if (!b.dueDate) return -1:

If "b" doesn't have a due date, we return -1.
This means "a" should come before "b", again pushing items without due dates towards the end.
(3) If both items have due dates, we compare them normally:

We convert both due dates to timestamps and subtract them.
If the result is positive, "a" is later and should come after "b".
If the result is negative, "a" is earlier and should come before "b".
The key point is that by returning 1 when "a" has no due date and -1 when "b" has no due date, we ensure that items without due dates always get pushed to the end of the sorted array, regardless of which item ("a" or "b") is being compared.

This approach effectively sorts the issues in this order:

Issues with due dates, from earliest to latest.
Issues without due dates at the end.


`JAK TO DZIAŁA`
B - A -> jeśli z takiego równania uzyskamy liczbę dodatnia to B będzie posortowane wyżej
Jeśli z takiego działania uzyskamy liczbę negatywna, oznacza to, że a jest większe od b i dlatego będzie w arrayu 
jako pierwsze. 

a - b (ascending order):

If result is positive (a > b), a goes after b
If result is negative (a < b), a goes before b
If result is 0 (a = b), order remains unchanged
b - a (descending order):

If result is positive (b > a), b goes before a
If result is negative (b < a), b goes after a
If result is 0 (b = a), order remains unchanged
Here's a practical example:

javascript

const numbers = [3, 1, 4, 1, 5];

// Ascending order (a - b)
console.log(numbers.sort((a, b) => a - b));
// Output: [1, 1, 3, 4, 5]

// Descending order (b - a)
console.log(numbers.sort((a, b) => b - a));
// Output: [5, 4, 3, 1, 1]

// Let's break down what happens in ascending sort (a - b):
// When comparing 3 and 1:
// 3 - 1 = 2 (positive) -> 3 goes after 1
// When comparing 4 and 1:
// 4 - 1 = 3 (positive) -> 4 goes after 1
// etc.

// In descending sort (b - a):
// When comparing 3 and 1:
// 1 - 3 = -2 (negative) -> 3 goes before 1
// When comparing 4 and 1:
// 1 - 4 = -3 (negative) -> 4 goes before 1
// etc.
The key thing to remember is:

a - b: smaller numbers first (ascending)
b - a: larger numbers first (descending)

The exact comparison sequence depends on the sorting algorithm implementation (which varies by browser), but let's break down a simple example using a basic sorting approach

## sorting stings ## 
const months = ["March", "Jan", "Feb", "Dec"];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

- when sorting strings there is no need for comparison updateStores
  If comparision updateStores is omitted (no callback), the array elements are converted to strings, then sorted according to 
  each character's Unicode code point value.


## React.cloneElement ##
- przydatne, jeśli dostajemy jakiś komponent w propsach, i chcemy mu dorzucić dodatkowe props
const customPopoverTrigger = customTrigger
? cloneElement(customTrigger as ReactElement, {
handleClick: () => handleOpenChange(popoverOpen),
})
: null

## check if date is valid ##

function safeParseDate(dateStr: string): Date | undefined {
const date = new Date(dateStr)
// Check if `date` is invalid
if (isNaN(date.getTime())) {
return undefined
}
// Could add more checks here if needed (e.g., must be in the future)
return date
}


%2F to / w query stringu


option cmnd  [ - blok kodu


## for of ##

const { issuesByStatusMap, issuesAssignedToMe, issuesCreatedByMe } = useMemo(() => {
const map = new Map<string, IssueT[]>()
const assignedTo: IssueT[] = []
const createdBy: IssueT[] = []
const userId = `/users/${user?.id}`

    for (const issue of currentlySelectedIssues) {
      if (issue.createdBy === userId) {
        createdBy.push(issue)
      }
      if (issue.recipient === userId) {
        assignedTo.push(issue)
      }

      if (!issue.status) continue

      if (!map.has(issue.status)) {
        map.set(issue.status, [issue])
      } else {
        map.get(issue.status)!.push(issue)
      }
    }

- zamiana continue na return kończy loopa, w tym wypadku byłby to bład


## optional function execution ##

function updateStores() {
foo2 && foo2()
}


function updateStores() {
foo2?.()
}

## ZUSTAND RE-RENDERS ##

**DEFAULT**
- `Trggers rerender only whenever anything within the store changes`
const myStore = useMyStore()
const count = myStore.count

**USING GRANULAR SELECTORS**
- `Trggers rerender only when a particular selector changes`
const count = myStore(state => state.count)
**RERENDER ACTION**
- setCount = myStore(state => state.setCount)
- `It will never trigger re-renders, it has a stable identity`


## Array.isArray([]) ##
if (!Array.isArray(statusesArr)) {
console.error(`statuses is not an array`)
return true
}

## MAP ENTRIES ##
const issuesByStatus: [string, IssueT[]][] = Array.from(
issuesByStatusMap.entries(),
)
- returns an array of tuples [key, value]


## CSS HEIGHT ##

Parent Height Constraint: The h-full class on the <div> makes its height 100% of its parent. However, if the parent <main> element does not have a defined height, the child’s h-full will not have any reference height to base itself on, resulting in a height of 0.


## MATCH MEDIA API ##

`matchMedia api` - The Window interface's matchMedia() method returns a new MediaQueryList object that can then be 
used to determine if the document matches the media query  string, as well as to monitor the document to detect when it matches (or stops matching) that media query.

// this is more optimal than checking for window width, as it would trigger on every pixel
// change and here it is only triggered if the condition (match) changes

export default function useMediaQuery(query: string) {xz
// example query - const isMobile = useMediaQuery('(max-width: 768px)');

const [matches, setMatches] = useState(window.matchMedia(query).matches)

useEffect(() => {
const media = window.matchMedia(query)

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Listener callback to update state on media change
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
}, [matches, query])

return matches
}


## changing state and rerenders ##
- changinq the state triggers a rerender of a whole component!!! not


## UPVOTE ##
<button onClick((prev) => prev += 1)>
<button onClick((prev) => prev++)> // will not work
<button onClick((prev) => ++prev)> // will work


## prevent bubbling  ##
`e.stopPropagation()`


## e.target vs e.currentTarget ##
- e.target is the element that triggered the event, while e.currentTarget is the element that the event listener is attached to


## avoid prop drilling with children pattern ##


## fetch response ##
- `response.json().then((data) => console.log(data))`
- response.ok - `response.status >= 200 && response.status < 300`
Why would you do something like 

if (!response.ok) {
 throw new Error('Network response was not ok')
}
otherwise it will not result in an error and will just be ignored
if we throw an error it will be catched in catch block

## fetch ##

## CONTEXT API - NO SELECTORS ##
-


## ZUSTAND GET## 


useEffect(() => {
    

return () => {}
})


`USE EFFECT RUNS AFTER THE RENDDER` - when component is mounted
return () => {} - when component is unmounted


## TYPING ID OF AN ENTITY ##
- instead of using string on  number you can use an actual type of an object, so that if it changes later on you 
  dont have to manually change this in multiple places 
    function Example(is: User[`id`]) {
- return <></>


## IT IS OK TO REFRACTOR CODE TO CUSTOM HOOKS EVEN IF IT'S USED ONLY ONCE - FOR CLARITY


- PROS OF RETURNING ARRAY INSTEAD OF OBJECT FROM A FOO - YOU CAN CHANGE THE NAMES OF THAT RETURED VALUES, SIMILAR 
  LIKE IN USE STATE 


## AS CONST ## (TUPLE)
-  useful type if we want to narrow down the type of an array, if we know that the array is always going to be the 
   same (order, items etc) we can use that to get better tips
   as const can be used to mark a value as deeply readonly - i.e., it can't be mutated in any way

const obj = {
updateStores: {
bar: 42,
},
} as const;

// Error!
obj.updateStores.bar = 43;
Cannot assign to 'bar' because it is a read-only property.
## READING DATA FROM URL ##
 to add param  to a url we can for example use anchor tag 

- <a href="https://www.example.com?param=value">Link</a>

Lets say we want to add an id as a param after clicking a
<a href=`${url}?id=${id}`>              
If we don't want the page to reload we can add # 

- <a href={`#${url}?id=${id}`}>Link</a>

Now we can read it using window.location.hash 

- const id = window.location.hash.split('=')[1]
In order for it to be updated when it's changing we have to use USE EFFECT

## HASH CHANGE EVENT ##

window.addEventListener('hashchange', () => {
    
})

- remember to remove the listener when the component is unmounted `GOOD PRACTICES`
  It's important to remove event listeners added in useEffect when a component unmounts for several reasons:

Prevent memory leaks: If listeners aren't removed, they can continue to exist and consume memory even after the component is no longer needed.
Avoid unexpected behavior: Unmounted components shouldn't trigger updates or cause side effects.
Performance optimization: Unnecessary listeners can impact performance, especially in larger applications.

## Component unmounting: ##
When we say a component "unmounts", it means the component is being removed from the DOM (Document Object Model). This can happen for various reasons:

The component's parent decides not to render it anymore (e.g., conditional rendering).
The user navigates away from a page containing the component.
The app's state changes in a way that no longer requires the component.
When a component unmounts, React calls the cleanup functions from its effects (if any). This is why it's crucial to include cleanup logic in useEffect for subscriptions, timers, or event listeners that need to be cleared when the component is no longer needed.


## FETCH API ## 
response.json is awaiting for all the data, it can come in chunks.
I was thinking about it wrong - you dont always get a promise when you simply need to  convert data from json to a 
plain object.


## MAPS UNIQUE KEYS ##
- index is ok when we are mapping over a list of items that won't change order of it's members. However if the order 
  does change, we should use unique keys so that React can keep track of the items correctly. 
- Using new Date().getTime() or something similar like Math.random() will not be persistent in between re-renders, 
  that is why we need to be careful with that

## truncate tailiwnd class ##
- use to make text go ...
.truncate {    
overflow: hidden;    
text-overflow: ellipsis;
white-space: nowrap; 
}



## FOR EACH L0OP ## 
-  doesn't work with async code 
- you can use a for...of loop or a traditional for loop, which can handle await correctly. 

const filesArr = Array.from(files);

for (const file of filesArr) {
const isImage = file.type.startsWith('image/');
if (!isImage) {
await uploadFile({ file, owningProjectStage: projectStageIri });
} else {
const compressedFile = await compressImage(file);
await uploadFile({
file: compressedFile,
owningProjectStage: projectStageIri,
});
}
}


## CRATING IMG PREVIEW ##
- <img src={URL.createObjectURL(file)} alt="" />


## MEASURING TIME ##
- console.timeEnd('FileUploadTime')
- console.time('FileUploadTime')
  performance.now()


## ERROR HANDLING ## 
Most libraries used typically to fetch data, in case of error returns an Error object - new, special object in JS 
world, that you can actually create yourself by creating it using constructor 
const err = new Error()
But they can also return something else, that is why you would typically see pieces of code like 
if (error instanceof Error) do something

If it is instanceof error than you can use things like description etc on it.
But you can throw anything as an error, even a string or a number. 
That is also why err is initially typed as unknown - you do not know what it is. 

Throwing an error when response is not ok (outside 200 http responses range) is beneficial because you can deal with 
that in a catch block, or in case of for example react query you can actually take advantage of that in onError methog 


## OPTIMIZING COMPONENTS - INITIALIZER FUNCTION ##
- adding a updateStores as an initial value to setState will make this function run only once - when component mounts.
- It will not run every time the components render 
- Component rendering basically means running every line of code from within the component function body
- FOR EXAMPLE to get data from local storage and set it as the initial value we can do something like this, and it 
  is actually a quite common scenario - we only want to get these stored data once and than rely on the state

const [test, setTest] = useState(()=> localStorage.getItem(`key`))


## ZUSTAND PERSISTS ##
- useful middelware to automaticaly get and set data from local storage etc
`syntax`
const useLocallyStoredFilters = create(persist<any>((set, get) => ({})))


## CREATE PORTAL ##

## CUSTOM HOOKS ## 
- important thing - custom hooks are recreated whenever they arey usesed, so they should not be a replacement for 
  using store !!! 
- 


## CONTEXT API AND CHILDREN PATTERN ##
- to be confirmed: if state within context changes, it doesn't trigger re-rendering of the children so this is a way 
  to avoid unnecessary re-rendering - simply put a state inside a context, and wrap the children in a context provider.

## optimizing context ## 
- further optimization includes memoizing object containing values of the context provider 

## useCallback ##
- how does re-rendering work in React? Well re-rendering means executing everything within the function body of a 
  componet and this means that if we have a function definition inside a component body, we are creating a new one 
  on every render, we are creating a new reference. We dony want to do that, and we need to memoize the function 
  definition. This is optimization but also it is necessary to avoid infinite loops when we are passing this 
  function as an argument to a dependency array in useEffect or useCallback. 
- useCallback is a hook that allows you to memoize a function definition so that it is not recreated on every render.

## ADDING STATE SETTERS TO DEPENDENCIES ARRAY ##
- setter functions are not required to be added to dep arrays - react guarantees that setters are actually stable, 
  but still you will see a lot of linter warnings about this and you can add them anyway.


## RECREATING OBJECTS WITH EVERY RERENDER ##
- functions and objects are recreated on every render simply becuase of how javascript works. objects are created 
  with pointers to a certain place in memory. When component is re-rendered and everything within is executed this 
  means also created new pointers or references to memory location. 

## OBJECT.FREEZE ## 
- freezes the object preventing it from being modified. This means no properties can be added or removed, their 
  writability, mutability etc. can not be changed, values can not be updated, object's prototype can not be 
  re-assigned. 
const obj = { prop: 42 }

Object.freeze(obj)
obj.prop = 44 
// Throws an error in strict mode

console.log(obj.prop) 
// 42



## TYPESCRIPT UTILITY TYPES ##


## Awaited ##
The Awaited<> utility type is helpful in TypeScript when you need to "unwrap" the type of a Promise (or nested Promises) to get the type of the resolved value. This can be especially useful when working with asynchronous functions or when you want to write types that automatically adjust based on whether a value is wrapped in a Promise.

Below is a simple example:

ts

// A function that returns a Promise<string>
async function fetchData(): Promise<string> {
return "Hello, world!";
}

// using Awaited to infer the resolved type
type Data = Awaited<ReturnType<typeof fetchData>>;
// Data is now of type 'string'

// Example using the type in another function
function processData(data: Data) {
console.log(data.toUpperCase());
}

// Main execution
fetchData().then(processData);
Explanation

Function fetchData:
An asynchronous function that returns a Promise<string>. When you call fetchData(), TypeScript knows it returns a promise which eventually resolves with a string.

Using Awaited:
We use Awaited<ReturnType<typeof fetchData>> to extract the resolved value type from the promise returned by fetchData. Here’s what happens:

ReturnType<typeof fetchData> gives Promise<string>
Awaited<Promise<string>> results in string
Usage:
The resolved type (string) is then used more directly in our function processData, which receives a string.

When to Use Awaited<>

Type Extraction for Async Functiogit pns:
When writing helper types or utilities that interact with asynchronous functions, Awaited<> allows you to work with the underlying type of the resolved value rather than dealing with Promise<T> everywhere.

Handling Nested Promises:
If you have functions that may return nested promises (e.g., Promise<Promise<T>>), Awaited<> will "flatten" them, giving you the final resolved type.

Generic Programming:
When writing generic code that consumes functions returning promises, you might not know ahead of time what the resolved type is. Using Awaited<> can help you extract the correct type without manual annotations.

Overall, Awaited<> enhances type safety and makes your asynchronous code cleaner and easier to maintain by automatically extracting the promise's value type.


## pulling latest commits from repo ##
- git fetch origin master git rebase origin/master
this is equivalent of git pull --rebase origin/master
  git pull --no-rebase vs git pull --rebase


  Use git fetch without rebase if you want to keep your local commits intact and decide later how to integrate the remote changes.
  Use git fetch with rebase if you want to maintain a clean, linear commit history by rebasing your local commits onto the remote branch.

1. git pull --no-rebase (Default Behavior)

What it does: This command fetches the latest changes from the remote repository and merges them into your current branch. It creates a merge commit that combines your local changes with the remote changes.

Commit History:

Creates a merge commit, resulting in a non-linear history.
Preserves the commit history from both the local and remote branches.
Use Case:

When you want to maintain a record of the merge, especially when working in a team or when you need to track where changes came from.
When you want to avoid rewriting commit history.
Workflow Implications:

If you later decide to have a linear history, you would need to rebase your branch, which involves rewriting the commit history.
You might need to resolve merge conflicts during the pull.

2. git pull --rebase

What it does: This command fetches the latest changes from the remote repository and rebases your local branch onto the updated remote branch. It moves your local commits on top of the remote commits, creating a linear history.

Commit History:

Results in a linear commit history.
Rewrites your local commit history to appear as if they were made on top of the remote commits.
Use Case:

When you want a clean, linear commit history without merge commits.
When you're working alone on a branch and want to keep your commits in a straight line.
Workflow Implications:

Avoids the need for a separate merge commit, simplifying the history.
If you need to share your branch with others, rebasing can make the history cleaner but may cause confusion if others have based their work on the old history.


3. When to Use Each

Use git pull --no-rebase:

When you want to preserve the merge commit for tracking purposes.
When working in a team where maintaining the merge history is important.
When you prefer not to rewrite commit history.
Use git pull --rebase:

When you want a linear and clean commit history.
When you're working alone on a branch and want to simplify the history.
When you prefer to avoid merge commits.



## second option that i never use is 

##create url obj ## 

export default function findDefaultIssueTLink(
projectStageIssuesLinks: NavigationItemT[],
issueType: IssueTypeT,
) {
const defaultLink =
projectStageIssuesLinks.find(link => {
return link.issueTypeIri === issueType?.['@id']
})?.link ?? ''

const isRelativePath = !defaultLink.includes(`http`)

if (isRelativePath) return defaultLink

// create relative path so that useNavigate works
const url = new URL(defaultLink)
const pathWithQuery = url.pathname + url.search

return pathWithQuery
}


## MAP SIZE ##
- map.entries() map.values() map.keys() - same as with normal object!!
- map.size () // 4


## PROMISIFYING CALLBACK-BASED APIS ##

- callback based standard 
function getCurrentPositionCallback() {
return navigator.getCurrentPosition(onSuccess, onError) () => {}

-promisified
async function getCurrentPositionPromise() {
return new Promise((resolve, reject) => {
return navigator.getCurrentPosition(resolve, reject)
)

await getCurrentPositionPromise() {
try {
const position = await getCurrentPositionPromise()
console.log(position)
} catch (error) {
    console.log(error)
}

`this is useful when we need better readabilility`
- }


## PROMISIFYING TIMEOUTS ##
function timerPromise() {
return new Promise((resolve, reject) => {
setTimeout(() => {
resolve('resolved')
}, 1000)
})
})}



## scroll to top built into React ##

// Handle scroll using React's onScroll prop
const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
// The event target is the scrollable element
const scrollTop = event.currentTarget.scrollTop
console.log(`scrolling, position: ${scrollTop}`)

    // Update swipe down state based on scroll position
    setSwipeDownDisabled(scrollTop > 5)
}

## timeout id ##
const timeoutId = useRef<TimeoutId | null>(null)
 ## debounce within foo ##

function handleSearch(val: string) {
if (timeoutId.current) clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(async () => {
      setSearch(val)
      timeoutId.current = null
    }, 500)
}
