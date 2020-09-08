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

```js
[1, 2].map(v => v.toUpperCase())
/*
TypeError: v.toUpperCase is not a function
at map.v (...)
at Array.map (<anonymous>)
*/
[1, 2].map(function mapper(v) {
  v.toUpperCase()
}) 
/*
TypeError: v.toUpperCase is not a function 
at mapper (...)
at Array.map (<anonymous>)
*/
 ```

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
- The `partial` utility here allows us to make use of the _value_ argument `map` will provide and combine it with an initial argument `3`

## [One at a Time / Currying](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#one-at-a-time)

>  currying unwinds a single higher-arity function into a series of chained unary functions

- Partial application feels suited to multiple arguments
  - You provide one or more arguments in the first call and the next call expects _all the remaining_ arguments
- Curried functions will always only expect a single argument
  - More ergonomic if working with single arguments
- Both use closure to remember arguments 

```js
function curry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){
        return function curried(nextArg){
            var args = [ ...prevArgs, nextArg ];

            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}
```
- Super interesting `curry` utility
- Good reminder that `fn.length` is not a very reliable indicator of arity, so may need to be explicitly passed in 

`curry`: 
- takes core function (`fn`) and sets it aside
- runs `nextCurried` immediately, which is indifferent to the current invocation's input
  - `nextCurried` exposes the `prevArgs` to the current invocation
- returns `curried` as the function which a program will invoke
- uses `arity` as a breaking condition to determine when the core function (`fn`) is to be invoked

```js
var curriedAjax = curry( ajax );
var personFetcher = curriedAjax( "http://some.api/person" );
var getCurrentUser = personFetcher( { user: CURRENT_USER_ID } );
getCurrentUser( function foundUser(user){ /* .. */ } );
```

### Visualizing Curried Functions

```js
// (5 to indicate how many we should wait for)
var curriedSum = curry( sum, 5 );

curriedSum( 1 )( 2 )( 3 )( 4 )( 5 );        // 15
```
- A manual currying (i.e. without the `curry()` utility) could be visualized below

```js
function curriedSum(v1) {
    return function(v2){
        return function(v3){
            return function(v4){
                return function(v5){
                    return sum( v1, v2, v3, v4, v5 );
                };
            };
        };
    };
}
```

```js
curriedSum = v1 => v2 => v3 => v4 => v5 => sum( v1, v2, v3, v4, v5 );
```
- Note that the arrow syntax version looks very similar to mathematical notation or Haskell
  - One reason people might prefer it

### [Why Currying and Partial Application?](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#why-currying-and-partial-application)

- Great section worth clicking through to

```js
sum(1)(2)(3) // curried function
partial(sum,1,2)(3) // partial application 
sum(1,2,3) // common style
```
- Why use FP techniques when the _call-site_ can become more confusing?

- 1: Frees us from needing to know all the arguments for a function call at a single point in the codebase
- 2: Composition of functions is easier with only one argument (applies to currying)
- 3: Most critically, splitting out the generalized from the specialized aspects of a function is an abstraction that improves readability

```js
ajax(
    "http://some.api/person",
    { user: CURRENT_USER_ID },
    function foundUser(user){ /* .. */ }
);
```
- Common style where everything needs to be provided at once

```js
var getCurrentUser = partial(
    ajax,
    "http://some.api/person",
    { user: CURRENT_USER_ID }
);

// later

getCurrentUser( function foundUser(user){ /* .. */ } );
```
- Partial application allows the call site of `getCurrentUser` to be focused on the specific argument that matters at that point (here the callback)
  - Avoids "cluttering-up" the call-site with irrelevant info 
  - Naming `getCurrentUser` is more informative than just calling `ajax(..)` and it abstracts the earlier arguments into a terse summary
  - Key benefit here is that the two locations are easier to reason about on their own

> That's what abstraction is all about: separating two sets of details -- in this case, the how of getting a current user and the what we do with that user -- and inserting a semantic boundary between them, which eases the reasoning of each part independently.

### [Order Maters](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#order-matters)

- __Argument ordering__ can become a pain when using partial application or currying
  - For instance, if you want to add the 3rd argument but haven't yet added the 2nd argument into the curried function

```js
function partialProps(fn,presetArgsObj) {
    return function partiallyApplied(laterArgsObj){
        return fn( Object.assign( {}, presetArgsObj, laterArgsObj ) );
    };
}

function curryProps(fn,arity = 1) {
    return (function nextCurried(prevArgsObj){
        return function curried(nextArgObj = {}){
            var [key] = Object.keys( nextArgObj );
            var allArgsObj = Object.assign(
                {}, prevArgsObj, { [key]: nextArgObj[key] }
            );

            if (Object.keys( allArgsObj ).length >= arity) {
                return fn( allArgsObj );
            }
            else {
                return nextCurried( allArgsObj );
            }
        };
    })( {} );
}
```
- Using objects as both the arguments and in parameter destructuring we can overcome ordering specificity

```js
function foo({ x, y, z } = {}) {
    console.log( `x:${x} y:${y} z:${z}` );
}

var f1 = curryProps( foo, 3 );
var f2 = partialProps( foo, { y: 2 } );

f1( {y: 2} )( {x: 1} )( {z: 3} );
// x:1 y:2 z:3

f2( { z: 3, x: 1 } );
// x:1 y:2 z:3
```

### [No Points](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#no-points)

- __Point-free style__ where _point_ refers to the function's parameter input

```js
function double(x) {
    return x * 2;
}

[1,2,3,4,5].map( function mapper(v){
    return double( v );
} );
```
- Because the `mapper` and `double` function signatures _are the same_, we can write this in point-free style

> The parameter ("point") v can directly map to the corresponding argument in the double(..) call.

```js
[1,2,3,4,5].map( double );
```

### [Summary](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#summary)
- Worth clicking through to read
- One new take away for me is that utilities (`unary(..)`, `identity(..)`, and `constant(..)`) are a key part of FP
- Seeing some of the hand-rolled utilities is great for learning

```js
function not(predicate) {
    return function negated(...args){
        return !predicate( ...args );
    };
}

// or the ES6 => arrow form
var not =
    predicate =>
        (...args) =>
            !predicate( ...args );
```
- In particular this recurring higher-order function pattern is great to become more comfortable with
- BUT I suspect that Ramda or a similar library would provide me with tried and tested utilities that I'd be happy to use rather than trying to spin my own 
  - In particular, a utility like the one converting a function to string and then using a regular expression to pull off the argument order, which would only work 80% of the time, seems like something I'd happily leave to a trusted 3rd-party library


## [Chapter 4: Composing Functions](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md)

```js
function words(str) {
    return String( str )
        .toLowerCase()
        .split( /\s|\b/ )
        .filter( function alpha(v){
            return /^[\w]+$/.test( v );
        } );
}

function unique(list) {
    var uniqList = [];

    for (let v of list) {
        if (uniqList.indexOf( v ) === -1 ) {
            uniqList.push( v );
        }
    }

    return uniqList;
}
```
- Two utility functions (or lego blocks)

```js
var wordsUsed = unique( words( text ) );
```
- Utilities used efficiently together

```js
function uniqueWords(str) {
    return unique( words( str ) );
}
```
- Functions composed into a new utility (compound lego block)

### Machine Making

```js
function compose2(fn2,fn1) {
    return function composed(origValue){
        return fn2( fn1( origValue ) );
    };
}

// or the ES6 => form
var compose2 =
    (fn2,fn1) =>
        origValue =>
            fn2( fn1( origValue ) );
```

```js
var uniqueWords = compose2( unique, words );
```

- Parameters are right to left
  - Common convention in FP libraries with a `compose` function
  - Easiest way to remember is the parameter order matches how the nested functions appear in code

### [General Composition](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md#general-composition)

```js
function compose(...fns) {
    return function composed(result){
        // copy the array of functions
        var list = [...fns];

        while (list.length > 0) {
            // take the last function off the end of the list
            // and execute it
            result = list.pop()( result );
        }

        return result;
    };
}
```
- `while` loop is an interesting little bit of logic
  - Not sure I'd agree that `result` is the best name for the parameter (why call an input a result?)
  - `result = list.pop()( result )` is a satisfying line though as it both passes a value into a function and sets the return of that operation as the value to be used in the next step

```js
function skipLongWords(list) { /* .. */ }

var filterWords = partialRight( compose, unique, words );

var biggerWords = filterWords( skipShortWords );
var shorterWords = filterWords( skipLongWords );

biggerWords( text );
// ["compose","functions","together","output","first",
// "function","input","second"]

shorterWords( text );
// ["to","two","pass","the","of","call","as"]
```
- Pretty cool to see  how useful `partialRight` is here
  - Suppose that makes sense since the first argument would be the last to be executed in the composed functions
  - Adding all the final arguments and allowing only the first one to be slotted in
- Likely wouldn't implement my own `compose` function, would use a library's
  - But good to follow the logic

### [Reordered Composition](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md#reordered-composition)

- __pipe__ = same as `compose` but left to right
  - Comes from Unix/Linux _pipe_ (`|` operator)
  - i.e. `ls -la | grep "foo" | less`

```js
var pipe = reverseArgs( compose );
```
- Can simply reverse arguments as above, or could use `shift` instead of `pop`

```js
var biggerWords = compose( skipShortWords, unique, words );
var biggerWords = pipe( words, unique, skipShortWords );
```
- Might be a bit more intuitive to read left to right the order the composed functions with execute in

```js
var filterWords = partialRight( compose, unique, words );
var filterWords = partial( pipe, words, unique );
```
- Partial application also a bit more intuitive without needing to take the mental tick to understand `partialRight`

### [Separation Enables Focus](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md#separation-enables-focus)

- Fantastic section worth sharing directly
- Abstraction separates a program into subsets
  - Contained subsets are more readable

> making it possible for the programmer to focus on a manageable subset of the program text at any particular time. 

> We're not abstracting to hide details; we're separating details to improve focus.

- Declarative code abstracts the __what__ from the __how__
  - At the call-site we can focus on the __what__
- _Destructuring_ is a good example of increased declarative ability ES6 introduced

```js
function getData() {
    return [1,2,3,4,5];
}

// imperative
var tmp = getData();
var a = tmp[0];
var b = tmp[3];

// declarative
var [ a ,,, b ] = getData();
```
- Array destructing as declarative abstraction

### Composition as Abstraction

```js
// imperative
function shorterWords(text) {
    return skipLongWords( unique( words( text ) ) );
}

// declarative
var shorterWords = compose( skipLongWords, unique, words );
```
- Abstraction and composition are often framed as something to undertake once code is repeated
  - i.e., I've used this twice, so I should abstract it
  - Often abstraction is justified by DRY
- Point that even if just using a function once, there's a lot of benefit that abstraction can bring by enabling a more declarative code style

```js
shorterWords( text );
```
- Great example where the call-site can be entirely focused on _what_ the program should do, rather than _how_ it does it

### [Revisiting Points](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md#revisiting-points)

```js
// given: ajax( url, data, cb )

var getPerson = partial( ajax, "http://some.api/person" );
var getLastOrder = partial( ajax, "http://some.api/order", { id: -1 } );

getLastOrder( function orderFound(order){
    getPerson( { id: order.personId }, function personFound(person){
        output( person.name );
    } );
} );
```
- Starting point with the aim to remove the _points_ of the `order` and `person` parameter references
  - Steps in example are worth clicking through to

```js
function prop(name,obj) {
  return obj[name];
}
```
- Utility helpful in initial aim of removing `person`

```js
var extractName = partial( prop, "name" );
```
- This will now just need to be provided an object (final argument)
  - Somewhat awkward that the argument `"name"` is coincidentally title the same thing as the parameter value in `prop`
  - `"name"` could be `"lastName"`

```js
function setProp(name,obj,val) {
    var o = Object.assign( {}, obj );
    o[name] = val;
    return o;
}
```
- Inverse utility to `prop`
  - Good model of setting a property and keeping an immutable object (New object via `Object.assign`)

```js
 output( person.name );
 // ->
 var outputPersonName = compose( output, extractName );
 ```
 - Composing the new `extractName` function 

 ```js
 function makeObjProp(name,value) {
    return setProp( name, {}, value );
}
```
- Feels like a pretty granular function, but suppose it locks in the immutable approach in `setProp`
  - This is `objOf` in __Ramda__

```js
var getPerson = partial( ajax, "http://some.api/person" );
var getLastOrder =
    partial( ajax, "http://some.api/order", { id: -1 } );

var extractName = partial( prop, "name" );
var outputPersonName = compose( output, extractName );
var processPerson = partialRight( getPerson, outputPersonName );
var personData = partial( makeObjProp, "id" );
var extractPersonId = partial( prop, "personId" );
var lookupPerson =
    compose( processPerson, personData, extractPersonId );

getLastOrder( lookupPerson );
```
- Final point-free refactor
- Uses loads of the composition techniques
  - (Didn't capture all the steps in these notes. See full chapter)

### [Summary](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md#summary)
- Function composition in JS relies on functions being unary
  - This is because JS functions can only return a single value
  - Each composed function takes a single input from the preceding functions single output
> Composition is declarative data flow
- Notion of _routing data through the program_