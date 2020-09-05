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

### Function Output
- In FP, our functions should have an output
  - Functions should explicitly return a value
- If not otherwise stated, all JS functions will just return `undefined`, but that default output is more aligned with JS that conducts _procedures_, which we're trying to avoid
- To return multiple values, we can use an object or an array
  - Consider if there needs to be multiple returned objects though, or if small, simple unary functions would be an option

> Collecting multiple values into an array (or object) to return, and subsequently destructuring those values back into distinct assignments, is a way to transparently express multiple outputs for a function.

### [Early returns](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#early-returns)
- Caution to avoid multiple `return`s that impose an implicit logic to a function
  - Suggestion to be as _explicit_ as possible
  - Code sample where multiple `return`s make tracing the function's output tricky
  - Refactored code is more verbose, but has clear, explicit _flow control_ via `if` statements
- Point that `return` as a means of flow control isn't always clear

### Functions of functions 
- __Higher order functions__ are functions that treat other functions as values

### Keeping Scope

```js
function formatter(formatFn) {
    return function inner(str){
        return formatFn( str );
    };
}

var lower = formatter( function formatting(v){
    return v.toLowerCase();
} );

var upperFirst = formatter( function formatting(v){
    return v[0].toUpperCase() + v.substr( 1 ).toLowerCase();
} );

lower( "WOW" );             // wow
upperFirst( "hello" );      // Hello
```
- Various examples of closure in this section, but this one is nice
  - This would be simpler without the `formatter` higher-order function, but this example helps me see how the pattern could be useful given more involved logic

### [Syntax](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#syntax)

- Three arguments for naming functions
```js
function foo(fn) {
  console.log( fn.name );
}

var x = function(){};

foo( x );               // x
foo( function(){} );    //
foo(() => {});          //
```

1: Stack-trace debugging
- Anonymous function expressions don't receive any name inference when passed as function arguments
  - This is a common use case, and the lack of a function name means stack traces will only identify this as a "anonymous function"

2: Reliable self-reference
- Besides debugging, giving a function a syntactic or lexical name is also useful for internal self-reference
  - Examples with recursion and event binding 

3: Readability

```js
people.map( function getPreferredName(person){
    return person.nicknames[0] || person.firstName;
} )
```
- Could easily imagine this being an anonymous arrow function, but Simpson's point is that the name gives a sense of what the mapping function does that will be a helpful clue for future devs

```js
(function IIFE(){

    // You already knew I was an IIFE!

})();
```
> You virtually never see IIFEs using names for their function expressions, but they should.

- While it's always a bit of work to find a good name for a function, if we don't we're "trading ease-of-writing for pain-of-reading"

### `this` keyword

- Good to avoid `this` in FP because it operates within functions as an implicit parameter
  - Nice comparison code below
  - Prefer explicit inputs
  - In particular this helps when _wiring multiple functions together_, which is very hard if the functions rely on `this`

```js
function sum() {
    return this.x + this.y;
}

var context = {
    x: 1,
    y: 2
};

sum.call( context );        // 3

context.sum = sum;
context.sum();              // 3

var s = sum.bind( context );
s();                        // 3
```
- Implicit parameter

```js
function sum(ctx) {
    return ctx.x + ctx.y;
}

var context = {
    x: 1,
    y: 2
};

sum( context );
```
- Explicit parameter

### [Summary](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#summary)
- Great summary, worthing clicking over to for recap
- Functions aren't just a set of things that happen (procedures)
  - Functions should have explicit input and output
- Functions within functions can hold a memory of values from their outer scope (_closure_)
> This is one of the most important concepts in all of programming, and a fundamental foundation of FP.
- Ask if anonymous functions are actually beneficial 
- Don't use `this` in FP


## [Chapter 3: Managing Function Input](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md)

### All For One

```js
function unary(fn) {
    return function onlyOneArg(arg){
        return fn( arg );
    };
}
```
- Interesting simple utility function that will ignore all but the first argument
- Good example also where "many FPers" would prefer arrow syntax
  - Argument that the terseness is at the cost of readability + clear closure boundaries (via brackets) 

```js
["1","2","3"].map( parseInt );
// [1,NaN,NaN]

["1","2","3"].map( unary( parseInt ) );
// [1,2,3]
```
- Nice model of why `unary` could be useful
  - In the first, erroneous case, `map` is providing the index as a second (radix) argument to `parseInt`
  - The `unary` utility helps to avoid this by ensuring only the first argument (the array value) is passed to `parseInt`

### One on One

```js
function identity(v) {
    return v;
}

// or the ES6 => arrow form
var identity =
    v =>
        v;
```
- Key idea is that functions that seem so simple they could be useless can in fact be useful in FP

```js
var words = "   Now is the time for all...  ".split( /\s|\b/ );
words;
// ["","Now","is","the","time","for","all","...",""]

words.filter( identity );
// ["Now","is","the","time","for","all","..."]
```
- This is using _coercion_ to make the empty stings return `false` and hence be filtered out
- Side note: good little regex example:
  - `\s` = white space
  - `\b` = word boundary
- A function like `identity` might be also be used as a default parameter value in case a function isn't passed in
  - Pretty sure we've got plenty of this in work code base
  - Also useful as default function for `map` or `reduce` 

### Unchanging One

```js
function constant(v) {
    return function value(){
        return v;
    };
}

// or the ES6 => form
var constant =
    v =>
        () =>
            v;
```
- Useful utility when an API requires a function as a parameter
  - Good example: `.then()` with JS promises

```js
p1.then( foo ).then( constant( p2 ) ).then( bar );
```
- A warning against simply using an anonymous arrow function to return a value in the second `then`

> The arrow function [would be] returning a value from outside of itself, which is a bit worse from the FP perspective 

### [Adapting arguments to parameters](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#adapting-arguments-to-parameters)

- If you can't change a function's signature, utilities can either gather or spread arguments as needed

```js
function foo(x,y) {
    console.log( x + y );
}

function bar(fn) {
    fn( [ 3, 9 ] );
}

bar( foo );         // fails
```
- `foo` expects two parameters in its signature, but the `[3, 9]` argument will only provide `x`

```js
function spreadArgs(fn) {
    return function spreadFn(argsArr){
        return fn( ...argsArr );
    };
}

bar( spreadArgs( foo ) );           // 12
```
- Takes me a minute to wrap my head around this
- `spreadFn` intercepts the `[3, 9]` argument from `bar` (helpfully named `argsArr`) 
- Then it spreads to into its `fn` parameter (here `foo`)
- The sequencing of what happens when feels quite zig-zag
  - But I can see how this could be a powerful utility
- In __Ramda__ `spreadArgs` is called `apply`

```js
function gatherArgs(fn) {
    return function gatheredFn(...argsArr){
        return fn( argsArr );
    };
}
```
- You've got a function you want to run, `fn`
- `gatherArgs` takes that function and says, "Cool, I'll run that function..." 
  - "BUT I'm going to modify the arguments it receives before running it"

```js
function combineFirstTwo([ v1, v2 ]) {
    return v1 + v2;
}

[1,2,3,4,5].reduce( gatherArgs( combineFirstTwo ) );
// 15
```
- Nice use case for `gatherArgs`
- `reduce()` will always provide two arguments (`acc, cur`), and `gatherArgs` allows us to use a single argument callback

### [Some now, some later](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#some-now-some-later)

```js
function partial(fn,...presetArgs) {
    return function partiallyApplied(...laterArgs){
        return fn( ...presetArgs, ...laterArgs );
    };
}
```
- Super interesting and elegant
- __Partial application__ utility that holds onto a core function in closure and any number of arguments initially passed in
- Then returns a function that will accepts any subsequent arguments, combine them with the initial ones and call the core function 

```js
var getPerson = partial( ajax, "http://some.api/person" );
```
- Straightforward enough, we've added an endpoint URL and `getPerson` will execute `ajax` with that initial argument and any subsequent ones

```js
// version 1
var getCurrentUser = partial(
    ajax,
    "http://some.api/person",
    { user: CURRENT_USER_ID }
);

// version 2
var getCurrentUser = partial( getPerson, { user: CURRENT_USER_ID } );
```
- Pretty interesting, version 2 adds to an already partially applied function
- By reusing something already defined, version 2 is more of an FP approach

```js
var getCurrentUser = function outerPartiallyApplied(...outerLaterArgs){
    var getPerson = function innerPartiallyApplied(...innerLaterArgs){
        return ajax( "http://some.api/person", ...innerLaterArgs );
    };

    return getPerson( { user: CURRENT_USER_ID }, ...outerLaterArgs );
}
```
- Unpacked version 2 looks a bit like the above
  - Think `...innerLaterArgs` is `{ user: CURRENT_USER_ID }`
- Simpson notes that the extra layer of wrapping may seem weird and wrong, but it's the kind of thing we'll want to get comfortable with in FP

```js
function add(x,y) {
    return x + y;
}

[1,2,3,4,5].map( partial( add, 3 ) );
// [4,5,6,7,8]
```
- The `partial` utility here allows us to make use of the value argument `map` will provide and combine it with an initial argument `3`