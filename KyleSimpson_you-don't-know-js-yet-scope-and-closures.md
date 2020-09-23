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