# Notes on You Don't Know JS Yet: Scope and Closures

- Original text by Kyle Simpson
- https://leanpub.com/ydkjsy-scope-closures
- https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md

## [Ch 1: What's the Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md#chapter-1-whats-the-scope)

- JS is parsed/compiled in a stage _before_ execution
  - This creates a scope structure that basically doesn't change during execution
- JS functions as __first-class values__
  - Assigned and passed around just like strings or numbers
  - But because they hold and access variables, functions retain their initial scope (related to those variables), no matter where they're executed
  - ^^ = __closure__
- __Modules__ are a code organization pattern
  - Public methods with access to private variables (via closure) in the internal scope of the module
- Helpful to understand that processing JS programs always requires __2 phases__
  - Parsing / compilation
  - Execution
- This helps us understand how errors occur independent of execution context

```js
var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .
```
- Only way this error could be thrown before the `console.log` is executed is via the parsing phase
- Various other examples in this chapter showing how the processing of scopes and declarations requires parsing the entire program before execution
- Concept of __target__ and __source__ roles with variables/identifiers
  - Target of an assignment
  - Source of a value

> the key idea of "lexical scope" is that it's controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.
- Variable declared inside a function will be associated with that function's scope
- __Block-scoped__ variables (`let`/`const`) are associated with nearest block (`{..}`)
- `var`, in contrast, is scoped to its enclosing function
- Compilation creates a map of lexical scopes, but doesn't actually create the scopes
  - a plan that serves as "inserted code for use at runtime" 

- Scopes are created in runtime
- Identifiers (variables) are registered at runtime


## [Ch 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md#chapter-2-illustrating-lexical-scope)

- __Lexical__ refers to the first stage of compilation (lexing/parsing)

### Marbles/Buckets/Bubbles Metaphor

- Metaphor of 
  - marbles (variables)
  - buckets (scopes: functions and blocks)
- The color of each marble is determined by the color of the bucket it was created/declared in
  - _Independent_ of the color of the bucket it's accessed within
  - During compilation, when JS engine comes across a _variable declaration_ it asks, "What scope bucket am I in?"
  - During execution, these scope associations are used in "lookups"
- Text / repo has nice coloured illustrations like this: https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/images/fig2.png

### Friends Conversation Metaphor

- Nice granular sequence that animates how scopes are created, referenced and assigned to in two distinct phases (compilation and execution)
  - _Compiler_ is setting up the scopes
  - _Engine_ asks for the variables previously set up, initializes them (to `undefined`) then assigns them a value
- Nested scopes play out by checking the closest scope for an _identifier reference_, and if none is found moving to the next outer scope and so on

### Undefined Mess

- Note that if there is no identifier reference in any scope, there will be a confusing overlap where errors refer to the variable as `undefined` when really it's more like it's "not declared"
  - Potentially confusing because declared variables without any values are initialized to `undefined`, which makes sense, but the "not declared" variables also register as `undefined`

> "Not defined" really means "not declared"—or, rather, "undeclared," as in a variable that has no matching formal declaration in any lexically available scope. By contrast, "undefined" really means a variable was found (declared), but the variable otherwise has no other value in it at the moment, so it defaults to the undefined value.

- Interesting case of assigning to undeclared variables while _not_ in strict mode leading to the creation of a globally scoped variable


## [Ch 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md)

- __Scope chain__: The path by which a lookup goes from its immediate scope context upward/outward through other scopes to resolve a value
  - i.e. In a nested scope, the path through less nested scopes
- Nice detailed recap of how 
  - lexical scope is set during compilation (i.e. meta info about the scope a variable originates from)
  - runtime lookups benefit from having this info in an AST (runtime optimization to not need to spend time on lookups during execution)
  - some variables are "undeclared" in a given file (an "unordered marble") because they are defined in another file/module

### Shadowing

- __Shadowing__: Naming a parameter or a variable in a nested scope with the same name as a name in an outer scope  

```js
var studentName = "Suzy";

function printStudent(studentName) {
    studentName = studentName.toUpperCase();
    console.log(studentName);
}

printStudent("Frank");
// FRANK

printStudent(studentName);
// SUZY

console.log(studentName);
// Suzy
```

- Demos shadowing of `studentName` and how the look-up process will stop once it finds the first matching variable name

### Function Name Scope

__Function declaration__
```js
function myCoolFunc() {
  ..
}
```

__Function expression (anonymous)__
```js
var robsCoolFunc = function() {
  ..
}
```
- A function definition _used as a value_ instead of a standalone declaration 
- This will not __hoist__ as a function declaration will

__Function expression (named)__
```js
var robsCoolFunc = function myCoolFunc() {
  ..
}
```

```js
var askQuestion = function ofTheTeacher() {
    console.log(ofTheTeacher);
};

askQuestion();
// function ofTheTeacher()...

console.log(ofTheTeacher);
// ReferenceError: ofTheTeacher is not defined
```
- Interesting note that the identifier `ofTheTeacher` is declared _inside_ the function rather than outside

### Arrow Functions

- Arrow functions are __lexically anonymous__
- They have no declarative form

```js
var robsCoolFunc = () => {
  ..
}
```
- Similar to the anonymous function expression in the `function` keyword examples above
- Common misconception that arrow functions behave differently regarding lexical scope rules
  - In fact, they behave the same
  - Will create an inner, nested function scope with or without the optional brackets

### [Chapter summary](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md#backing-out)
- Great summary worth reviewing
  - Scope chain, specifically as it related to functions
  - Shadowing


## [Ch 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md)

- In a browser context, 3 main ways separate JS files share identifiers and cooperate with one another
  - Non-bundled ES Modules: no external scope, just `import`
  - Some build setups: single shared enclosing scope (function or UMD), "application-wide scope"
  - Multiple `<script>` tags (or some other build setups): __global scope__
- Bundled files are often concatenated into a single large file
  - These techniques are how the different files/modules register a _name_ that other code can reference
- Some nice illustrative code in the text
- Global scope is also where
  - JS exposes built-ins
  - The environment hosting the JS engine exposes built-ins (`console`, DOM, web platform APIs like `history` or `geolocation`)

### Web Workers
- Treated as an entirely separate program with its own global scope
- No access to DOM in global scope
- Web Worker global object reference is typically `self`

```js
var studentName = "Kyle";
let studentID = 42;

function hello() {
    console.log(`Hello, ${ self.studentName }!`);
}

self.hello();
// Hello, Kyle!

self.studentID;
// undefined
```
- Chapter has a couple examples of setting and accessing values in a the global scope
  - This one demos both the use of `self` and how `var` and `let` relate to global scope differently

### Node

- Every single file Node loads is treated as a module
- Variables at the top of the file are never in the global scope
  - In contrast, loading a non-module file in the browser may access and amend the global scope
- Node defines/provides `global`, which is "a reference to the real global scope object"
  - `global` is not defined by JS, but by Node as the environment hosting the JS engine

### globalThis

- Introduced in ES2020
- Funny doc around controversial naming: https://github.com/tc39/proposal-global/blob/master/NAMING.md

```js
const theGlobalScopeObject =
    (typeof globalThis != "undefined") ? globalThis :
    (typeof global != "undefined") ? global :
    (typeof window != "undefined") ? window :
    (typeof self != "undefined") ? self :
    (new Function("return this"))();
```
- Simpson and others pushed back against `globalThis` because `this` is potentially misleading
  - There's no way that `globalThis` would be used for a global/default `this` binding
  - Instead, it just allows access to the global scope object, which is how he names his mega polyfill above
  - Recommends using that over `globalThis`

## [Ch 5: The (not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)

### Function hoisting

```js
foo()
// bar

function foo(){
  console.log('bar')
}
```
- Why can we call `foo`?
- Earlier had established that "all identifiers are _registered_ to their respective scopes at compile time"
  - Identifiers are _created_ every time the scope is entered
  - But, how does the variable `foo` have a _value_ assigned to it?
- Answer: __function hoisting__
> When a function declaration's name identifier is registered at the top of its scope, it's additionally auto-initialized to that function's reference.
- This is a special characteristic of formal `function` _declarations_
- Key detail: function hoisting (and `var` variable hoisting) attaches name identifiers to the nearest _function scope_ rather than block scope
  - If no enclosing function scope, then global scope

### Hoisting: Declaration vs. Expression

```js
foo()
// TypeError bc foo === undefined

var foo = function bar(){
  console.log('baz')
}
```
- Function _expressions_ have their name identifier hoisted, but are not auto initialized to the function value
  - `TypeError` not a `ReferenceError` (i.e. the identifier is found, but it's `undefined` instead of a function)

- No actual code rearranging occurs with hoisting
  - Kind of a weird term/metaphor to use
- Better to think of hoisting as a "compile-time operation" that generates runtime instructions
- Hoisting is not a runtime behavior

- Interesting point about _multiple declarations_ being permitted with `var` but not `let` (`SyntaxError`)
  - Could have been permitted technically, but more a case of social engineering to prevent developers from sloppy re-declaration

```js
const robsVariable;
// SyntaxError
```
- `const` requires that it be initialized to a value

```js
const robsVariable = 'foo';
robsVariable = 'bar'
// TypeError
```
- Interesting distinction between `SyntaxError` and `TypeError`
  - `SyntaxError` = program will not even start executing
  - `TypeError` = program executes and will throw an error upon reaching the line

### Loops

- Each loop iteration is its own scope instance

```js
var keepGoing = true;
while (keepGoing) {
    let value = Math.random();
    if (value > 0.5) {
        keepGoing = false;
    }
}
```
- `value` is not re-declared because each loop is a new scope 
- If `value` was a `var` rather than `let`, it would be variable hoisted (to the closest containing function scope or global scope)
  - Pretty sure this was a subtle gotcha with loops when the iterator name was also used outside the loop block

### Uninitialized variables (TDZ)

```js
console.log (foo) // undefined
foo = "bar"
var foo;
```
- `var` is variable hoisted and auto initialized to `undefined`

```js
console.log (foo) // ReferenceError
let foo;
```

```js
foo = "bar" // ReferenceError
let foo;
```
- `let` and `const` are no auto initialized
- Code above can be seen as trying to access an identifier in the temporal dead zone (TDZ)
  - `foo` is hoisted and registered as an identifier, but not initialized 
- The way to initialize them is through an _assignment attached to a declaration statement_

- __Suggestion to minimize TDZ__: always put `let` and `const` declarations at the top of any scope
