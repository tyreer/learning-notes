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

> For example, imagine a case where an `fn` function reference could expect one, two, or three arguments, but you always want to just pass a variable `x` in the last position:

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
- Simpson likes _gather_ for the `...` operator (aka, _rest_ or _spread_)
  - I've used as _rest_ to destructure some props/parameters in a React component and capture all the remaining ones