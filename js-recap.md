
**<script><script/>**
You can add script tag both in the head and body element. A*dding it to the head tag will have a benefit that it will
be executed before the rest of the HTML content is parsed*. This can sometimes be a desired behavior, however if the
scripts are to manipulate the DOM it must be added after the HTML is present, therefore usually in the past it was
added at the end of the body tag.

`Script tag is blocking the page!!`

This is also not ideal because we want our javascript to be executed as fast as possible, so that we dont have to
wait for example to fetch some data.

That is why we can add a special attribute to the script tag.
*<scipt src="" defer><script/>*
Defers tells the browser that it is safe to continue parsing the HTML content even before script ends execution.

**Adding styles**
<link rel='stylesheet' href='./styles.css'/>

**Adding javascript**
<script src="./script.js"></script>

*VAR*
Var will be scoped inside a function but only there!

var test  = 1
console.log(test); // 1


if (true) {
var test = 2
}
console.log(test); // 2

function testFoo() {
var test = 3;
}

console.log(test); // 2
console.log('test');


let testLet  = 1
console.log(testLet); // 1


if (true) {
let testLet = 2
}
console.log(testLet); // 1

function testFoo() {
let testLet = 3;
}

console.log(testLet); // 1


const test = () => {}
function test() {}


**el selecting**
const testEl = document.querySelector(`body > div > div`);
testEl.style.fontSize = `100px`;
