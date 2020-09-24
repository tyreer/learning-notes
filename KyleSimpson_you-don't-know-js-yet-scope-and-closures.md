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