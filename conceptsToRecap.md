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
