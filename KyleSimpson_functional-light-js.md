# Notes on Functional-Light JavaScript

- Original text by [Kyle Simpson](https://github.com/getify)
- Below are my personal learning notes, or highlights I want to remember from the text along with my learning notes

Kyle Simpson's full text available at: https://github.com/getify/Functional-Light-JS


## [Chapter 1: Why Functional Programming?](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch1.md/#chapter-1-why-functional-programming)


- "teach it later" test
> After I've written a piece of code, I leave it alone for a few hours or days, then come back and try to read it with fresh eyes, and pretend as if I need to teach or explain it to someone else. Usually, it's jumbled and confusing the first few passes, so I tweak it and repeat!

## [Chapter 2: The Nature Of Functions](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#chapter-2-the-nature-of-functions)

### Function vs Procedure

- FP asks that we treat functions the way they work in math
  - Nice example of `f(x) = 2x + 10` as a function to map x-y coordinates 
  - That function will _always return a value_ 

> A procedure is an arbitrary collection of functionality. It may have inputs, it may not. It may have an output (return value), it may not.
> A function takes input(s) and definitely always has a `return` value.
- Super interesting distinction
  - To leverage FP, plan to __avoid procedures__ wherever possible
  - Aim to write functions that take inputs and return outputs

### Function Input

```js 
function foo(x,y){..}

foo(3, 10)
```
- __Arguments__: values you pass in
  - `3, 10`  
- __Parameters__: named variables inside the function that receive those passed-in values
  - `x, y`


### Counting Inputs
  
```js
function foo(x,y,z) {..}
foo.length;             // 3
```

- Can check a function's __arity__ at runtime with `length`
 - Use case: determine where a function reference is coming from if there are multiple sources w/different argument numbers

```js
// `fn` is set to some function reference
// `x` exists with some value

if (fn.length == 1) {
    fn( x );
}
else if (fn.length == 2) {
    fn( undefined, x );
}
else if (fn.length == 3) {
    fn( undefined, undefined, x );
}
```

> For example, imagine a case where an `fn` function reference could expect one, two, or three arguments, but you always want to just pass a variable `x` in the last position

```js
function foo(x,y = 2) { .. }
function bar(x,...args) { .. }

foo.length;             // 1
bar.length;             // 1
```
- But, might not behave as expected!
  - So more advisable to use `...args`

```js
function foo(x,y,z,...args) {
    console.log( x, y, z, args );
}

foo();                  // undefined undefined undefined []
foo( 1, 2, 3 );         // 1 2 3 []
foo( 1, 2, 3, 4 );      // 1 2 3 [ 4 ]
foo( 1, 2, 3, 4, 5 );   // 1 2 3 [ 4, 5 ]
```
- Simpson likes to say `...` _gathers_ in an assignment position (e.g. a parameters list) 
  - This is sometimes also referred to as _rest_, for "all the rest" 
  - I've used as _rest_ to destructure some props/parameters in a React component into aliased variables and capture all the remaining ones

```js
function foo(...args) {
    // ..
}
```
- `args` here would be an array with __all__ passed arguments
  - `args.length` will be an accurate count of how many arguments are passed in


```js
function foo(...args) {
    console.log( args[3] );
}

var arr = [ 1, 2, 3, 4, 5 ];

foo( ...arr );                      // 4
```
- Nice simple demo how `...` behaves _symmetrically_
  - In the function declaration, `foo(...arr)` is _gathering_ all parameters into a single array (__assignment position__)
  - In the call, `foo(...arr)` is spreading the `arr` array to individually pass in each value as an argument (__value-list position__)


### Parameter destructuring

```js
function foo( [x,y,...args] = [] ) {
    // ..
}

foo( [1,2,3] );
```
- Model of naming the first elements in an array and _gathering_ all the rest as `args`
  - Left-side `[]` array brackets in parameter parenthesis indicates destructuring

### The Importance of Declarative Style

```js
function foo(params) {
    var x = params[0];
    var y = params[1];
    var args = params.slice( 2 );

    // ..
}
```
- The same operation as in the previous code sample but in an __imperative style__
- Key benefit of __declarative style__ is focusing on the _output_ or desired end state
- In contrast, in this imperative code we need to mentally execute each step to understand the outcome
  - The destructuring and `gather` operator allow readers of our code to focus on the outcome rather than _how_ the outcome is arrived at
  - It hides some of the details, which results in more focused, readable code

> Wherever possible, and to whatever degrees our language and our libraries/frameworks will let us, we should be striving for declarative, self-explanatory code.


### [Named Arguments](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#named-arguments)

```js
function foo( {x,y} = {} ) {
    console.log( x, y );
}

foo( {
    y: 3
} );  
// undefined 3
```
- At the `foo` __call-site__ we don't need to worry about `x`
  - i.e. We don't need to pass in `x: undefined` to match the destructuring order of the parameters
  - _Parameter object destructuring_ is a powerful JS tool here
  - Some other languages have __named arguments__ that allow you to label arguments with the parameter they should map to at the call-site (not JS!)
- In FP, a function that only takes in a single argument is easier to compose with another function's single output
- Also a point on __unordered parameters__
  - Order of the destructuring or object argument keys doesn't matter
> Named arguments are much more flexible, and attractive from a readability perspective, especially when the function in question can take three, four, or more inputs.
- Pretty sure this is why we can destructure props in a React component without worrying about the order
  - The `props` object will have keys and any key can be accessed via object destructuring regardless of order
