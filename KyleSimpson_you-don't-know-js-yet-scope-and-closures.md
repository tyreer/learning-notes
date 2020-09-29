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

## [Ch 6: Limiting Scope Exposure ](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)

- Principle of Least Exposure (POLE), typically referenced in a security context, also worth applying to variable scope
- Several points about hazards that might occur from allowing variables to be used liberally throughout an application
  - __Unintended dependency__ is a highlight: exposing variables/function unnecessarily invites other developers to use and depend on those _private_ pieces. At first this may seem like no problem, but later refactoring can be made hard if other corners of the code base are dependent on exposed values
- Advice following POLE for variable scoping:
  - default to exposing the bare minimum necessary
  - declare variables in as small and deeply nested scopes as possible

```js
function diff(x,y) {
  if (x > y) {
    let tmp = x;
    x = y;
    y = tmp;
  }
  return y - x;
}
```
- Simple example to illustrate how `tmp` is scoped to the smallest block possible (rather than declared at the top of `diff`)

### Private values in function scope

```js
function hideTheCache() {
  // "middle scope" created by hideTheCache function just to make this variable private
  var cache = {};

  return factorial;

  // ************* Think this comment line is just to organise private (above) from public (below)
  
  function factorial(x) {
    // inner scope
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x-1);
    }
    return cache[x];
  }
}

var factorial = hideTheCache();

factorial(6);
//720
```
- Interesting function that maintains `cache` values in closure to prevent calculating more than once
  - Key idea is that `cache` should be private, and a wrapping function's scope can limit scope exposure
  - Using `var` because it indicates function-level scoping 
  - `in` operator also worth noting
  - Nice recursion example too

```js
var factorial = (function hideTheCache() {
  ...
})()
```
- Improved design limits `hideTheCache` to within its own function scope
  - Recap of earlier point that function expressions place their function's name scope _inside_ their own function scope (ch.3, pg. 52) 
  - This means `hideTheCache` isn't in any outer scope
  - Useful role for an IIFE to play
  - But, a warning that "if the code you need to wrap a scope around has `return`, `this`, `break`, or `continue` in it" create the scope with a block rather than an IIFE to avoid messing with those values

### Scoping with Blocks

- `{}` are always blocks, but only become _scopes_ once a `let/const` declaration is involved

```js
function getNextMonthStart(dateStr) {
    var nextMonth, year;

    {
        let curMonth;
        [ , year, curMonth ] = dateStr.match(
                /(\d{4})-(\d{2})-\d{2}/
            ) || [];
        nextMonth = (Number(curMonth) % 12) + 1;
    }

    if (nextMonth == 1) {
        year++;
    }

    return `${ year }-${
            String(nextMonth).padStart(2,"0")
        }-01`;
}
console.log(getNextMonthStart("2019-12-25"));   // 2020-01-01
```
- Feels odd, but brackets for solely creating a scope are valid
- As a POLE model, premise is that `curMonth` is not needed outside the block we created
  - As a design principle, even if the decision seems insignificant at the outset, it may later support maintaining tightly contained scope exposure as a program grows
  - Idea is to get into the habit as a default
- Nice regex example also
  - First space in destructuring is full string match and then the capturing groups
  - `match` here returns `["2019-12-25", "2019", "12"]`

### `var` and `let`
- Simpson's is not the most common opinion here
- Use `var` to clearly signal that a value has function scope as distinct from any block-scoped variables
- Use `let` when you want block scoping
- Don't use `var` as the iterator in a loop
- Curious little note about `catch` creating a block scope since ES3 (1999)

### Function declarations in blocks (FiBs)
```js
if(false) {
   function ask(){
     ...
   }
}
ask()
```
- Somewhat niche explanation as to why this is a liability and can behave inconsistently

```js
if (typeof Array.isArray != "undefined") {
    function isArray(a) {
        return Array.isArray(a);
    }
}
else {
    function isArray(a) {
        return Object.prototype.toString.call(a)
            == "[object Array]";
    }
}
```
- Temptation here is to try to declare the function only once

- __Advice:__ Avoid FiB entirely
  - "Never place a function _declaration_ directly inside any block"
  - Function _expressions_ inside blocks are fine

## [Ch 7: Using Closures ](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)
- Only _functions_ have closure
  - Not objects, not classes (though its functions/methods might)
- For a closure to be observed, a function must be invoked in a different branch of the scope chain from where it was originally defined
  - Callback functions are a good example

```js
  // outer/global scope: RED(1)

function lookupStudent(studentID) {
    // function scope: BLUE(2)

    var students = [
        { id: 14, name: "Kyle" },
        { id: 73, name: "Suzy" },
        { id: 112, name: "Frank" },
        { id: 6, name: "Sarah" }
    ];

    return function greetStudent(greeting){
        // function scope: GREEN(3)

        var student = students.find(
            student => 
            // function scope: ORANGE(4)
            student.id == studentID
        );

        return `${ greeting }, ${ student.name }!`;
    };
}

var chosenStudents = [
    lookupStudent(6),
    lookupStudent(112)
];

// accessing the function's name:
chosenStudents[0].name;
// greetStudent

chosenStudents[0]("Hello");
// Hello, Sarah!

chosenStudents[1]("Howdy");
// Howdy, Frank!
```
- IF JS didn't have closure, `students` and `studentID` would be garbage collected after `lookupStudents`'s invocation

```js
function adder(num1) {
  return function addTo(num2) {
    return num1 + num2;
  };
}

var add10To = adder(10);
var add200To = adder(10);
add10To(5);     // 15;
add200To(5);     // 205;
```
- Classic example of closure
- Illustrating that closure is associated with an __instance of a function__ rather than its definition

### Live Link, Not a Snapshot

```js
var keeps = [];

for (var i = 0; i < 3; i++) {
    keeps[i] = function keepI(){
        // closure over `i`
        return i;
    };
}

keeps[0]();   // 3 -- WHY!?
keeps[1]();   // 3
keeps[2]();   // 3
```

- Common mistake to think of closure as _value oriented_ rather than _variable oriented_ 
  - Avoid thinking the closure _preserves_ a value from a moment in time w/o it being susceptible to update/reassignment
  - Above, because `i` is a `var` and function scoped, the variable `i` inside each of the 3 closures are all updated along with the variable
  - Using `let` will create 3 new `i` variables, one in each loop's scope instance

### Common Closures: Ajax and Events

```js
function lookupStudentRecord(studentID) {
    ajax(
        `https://some.api/student/${ studentID }`,
        function onRecord(record) {
            console.log(
                `${ record.name } (${ studentID })`
            );
        }
    );
}

lookupStudentRecord(114);
// Frank (114)
```
- Callback `onRecord` executes well after `lookupStudentRecord` has completed, but still persists a privileged access to `studentID` via closure

```js
function listenForClicks(btn,label) {
    btn.addEventListener("click",function onClick(){
        console.log(
            `The ${ label } button was clicked!`
        );
    });
}

var submitBtn = document.getElementById("submit-btn");

listenForClicks(submitBtn,"Checkout");
```

> Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn't be accessible.

### [Closure Lifecycle and GC](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#the-closure-lifecycle-and-garbage-collection-gc)

- Closure can _prevent GC_ on variables your program is otherwise finished with
  - This can lead to __run away memory usage__
  - Important to discard of function references when they're no longer needed
- Longish example in section where `removeEventListener` frees up the function references
  - Otherwise cannot be GC while event handlers are subscribed


```js
function manageStudentGrades(studentRecords) {
    var grades = studentRecords.map(getGrade);

    return addGrade;

    // ************************

    function getGrade(record){
        return record.grade;
    }

    function sortAndTrimGradesList() {
        // sort by grades, descending
        grades.sort(function desc(g1,g2){
            return g2 - g1;
        });

        // only keep the top 10 grades
        grades = grades.slice(0,10);
    }

    function addGrade(newGrade) {
        grades.push(newGrade);
        sortAndTrimGradesList();
        return grades;
    }
}

var addNextGrade = manageStudentGrades([
    { id: 14, name: "Kyle", grade: 86 },
    // ..many more records..
    { id: 6, name: "Sarah", grade: 91 }
]);

addNextGrade(81);
addNextGrade(68);
```
- Most JS engines will run an optimization to trim down the persisted closure variables to only those actually closed over
  - But on older and lower-end devices this optimization may not take effect
  - Therefore, it's safer memory usage to _manually discard_ a large value anywhere in the closure scope rather than relying on closure optimization/GC

```js
function manageStudentGrades(studentRecords) {
    var grades = studentRecords.map(getGrade);

    // unset `studentRecords` to prevent unwanted
    // memory retention in the closure
    studentRecords = null;

    return addGrade;
    // ..
}
```
- Here, `studentRecords` could be a large array, and setting it to `null` once we've extracted the values we need via `map` ensures it won't end up consuming memory as long as `addNextGrade` is a function that can be invoked and need to access it's closure values  


```js
function defineHandler(requestURL,requestData) {
    return function makeRequest(evt){
        ajax(requestURL,requestData);
    };
}

function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    var handler = defineHandler(
        APIendpoints[recordKind],
        data[recordKind]
    );
    btn.addEventListener("click",handler);
}
```
- FP partial application 
  - `makeRequest` is a partially applied function that defines its required arguments ahead of time
  - `evt` is the other part of the "partial" application, even though it's just ignored here
  - Explicitly limit the closure scope to just the two variables we need
- DOM `kind` value only needs to be read once per button
  - Then it's remembered in closure

### [Summary](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#closer-to-closure)
- One takeaway: we can bound "scope exposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use"
  - Narrow, specialized functions are then cleaner to interact with (don't need to pass in repeat arguments every time)
