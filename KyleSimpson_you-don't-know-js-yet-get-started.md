# Notes on You Don't Know JS Yet: Get Started

- Original text by Kyle Simpson
- https://leanpub.com/ydkjsy-get-started
- https://github.com/getify/You-Dont-Know-JS

## [Ch 1: What _is_ JS](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch1.md)

- Official name of JS is ECMAScript (ES)
    - Since 2016 annual releases as ES2019, ES2020
- Contrary to some perceptions there are not multiple versions of JS in the wild: there is __just one__ and it's the version maintained by TC39 and ECMA

- Various JS environments (browser JS engines, Node.js, etc.) add APIs into the global scope of JS programs to give environment specific capabilities (i.e. `alert()`, `console.log`, `fs.write()`)

> Typical paradigm-level code categories include procedural, object-oriented (OO/classes), and functional (FP):
> - Procedural style organizes code in a top-down, linear progression through a pre-determined set of operations, usually collected together in related units called procedures.
> - OO style organizes code by collecting logic and data together into units called classes.
> - FP style organizes code into functions (pure computations as opposed to procedures), and the adaptations of those functions as values.

- Languages can be heavily slanted toward a paradigm
  - C: procedural
  - Java/C++: class-oriented/OO
  - Haskel: FP
- JS is a _multi-paradigm language_

### What's in an interpretation
- interpreted script or compiled program (p.21)
- JS source code is parsed before it is executed (23)
  - Spec requires early errors, statically determined (e.g. duplicate parameter names) to be reported before code starts executing
- Sensible also to consider it to be a compiled language
- Because it is compiled, we are informed of static errors before the code is executed.
  - Explained to draw a distinction with "interpreted" and "scripted" languages, which have often been regarded as less mature than "compiled" languages

### Web Assembly (WASM)
- Aims to reduce the parse and compile time of JS = performance gains
- Parsing/compilation  of WASM-targeted program happens _ahead of time_
  - JS engine is provided a _binary-packed_ program, which is ready to be executed with very little processing
- Another motivation is to bring non-JS programming languages (e.g. Go) to the web platform

- All code is automatically defaulted to _strict mode_ in ES6 modules (30)


### [Defined](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch1.md#defined) 
> JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.

> JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).

> JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.

## [Ch 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch2.md)

### Declaring and using variables

- `let` allows for more limited access to a variable than `var`
  - _block scoping_ vs _regular/function scoping_
- Common challenge that we should avoid `var` to favour the ES6 variables
  - Counterpoint: `var` usefully conveys that "this variable will be seen by a wider scope (of the whole function)"
  - That scoping may be appropriate, and the developer may want to use `var` to indicate that
- `const` = cannot be _reassigned_
  - Not, cannot be _changed_
- Advice to avoid `const` with objects because their values can be changed/mutated without the object itself being reassigned

### Functions

```js
function robsNamedFunction() {
    ...
}
```
- _function declaration_ because it appears as a statement by itself (rather than as an expression in another statement)
- Association between the identifier (`robsNamedFunction`) and the function value occurs at _compile time_ 

```js
let robsNamedFunction = function() {
    ...
}
```
- _function expression_ because the function is an expression that is _assigned_ to a variable
- Association between the identifier and the function value occurs at _run time_

> It's extremely important to note that in JS, functions are values that can be assigned and passed around. Not all languages treat functions as values, but it's essential for a language to support the functional programming pattern

- Curious about any implications of the compile vs. run phase of identifier association
  - Maybe affects static analysis? 

### Comparisons

- `===` is often considered to check both the _type_ and _value_
  - In fact, all comparisons check type and value, but `===` just doesn't allow for any type _coercion_

```js
NaN === NaN;    //false
0 === -0;       //false
```
- Two special values where the `===` _operator_ is designed to "lie"
  - "Deep historical and technical reasons"
- Can use `Number.isNaN(...)` or `Object.is(...)`

```js
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```
- `Object.is(...)` as the `====` check
- With objects, a _content-aware_ comparison is referred to as "structural equality"
  - In JS `===` provides a check of _identity equality_ for objects and NOT _structural equality_

> In JS, all object values are held by reference, are assigned and passed by reference-copy, and are compared by reference (identity) equality

- To properly cover all edge cases in structural equality is very complex, which is why it doesn't exist in JS
  - For instance, stringifying a function doesn't take into account things like closure

- __Coercive comparisons__: The `==` operator can be considered _coercive equality_
  - Simple enough to prefer `===`, but you don't have a choice with `<` or  `>=`, which will allow coercion first if types differ
  
```js
var x = "10"
var y = "5"

x < y   // true!
```

- If both values are strings, the _relational operators_ will perform an alphabetical comparison
  - Could imagine this being a sneaky case where a numeric value is passed into a context as a string and a comparison yields an unexpected result


### [How We Organize in JS](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch2.md#how-we-organize-in-js)

- Two patterns for organizing code (data and behaviour): classes and modules
> A class in a program is a definition of a "type" of custom data structure that includes both data and behaviors that operate on that data. 
- Classes define how the data structure works, but are not themselves concrete values 
 - A class must be _instantiated_ with the `new` keyword
 - Does React do this "under the hood" for class components? i.e. When I say `<MyComponent />`, is React instantiating an instance of that class?

```js
class Page {
    constructor(text) {
        this.text = text;
    }

    print() {
        console.log(this.text);
    }
}

class Notebook {
    constructor() {
        this.pages = [];
    }

    addPage(text) {
        var page = new Page(text);
        this.pages.push(page);
    }

    print() {
        for (let page of this.pages) {
            page.print();
        }
    }
}

var mathNotes = new Notebook();
mathNotes.addPage("Arithmetic: + - * / ...");
mathNotes.addPage("Trigonometry: sin cos tan ...");

mathNotes.print();
```

- Key point that the data (e.g. `text` string and `pages` array) are _organized_ alongside their behaviors (e.g. `print` and `addPage` methods)
- We can write a program without an organizing mechanism like a class, but it would be harder to reason about and maintain
  - Reminds me of some of the massive 600+ line files I've had to work with where you need multiple tabs open at various lines of the file

### [Class inheritance](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch2.md#class-inheritance)

```js
class Publication {
  constructor(title,author,pubDate) {
      this.title = title;
      this.author = author;
      this.pubDate = pubDate;
  }

  print() {
      console.log(`
          Title: ${ this.title }
          By: ${ this.author }
          ${ this.pubDate }
      `);
  }
}
```

```js
class Book extends Publication {
    constructor(bookDetails) {
        super(
            bookDetails.title,
            bookDetails.author,
            bookDetails.publishedOn
        );
        this.publisher = bookDetails.publisher;
        this.ISBN = bookDetails.ISBN;
    }

    print() {
        super.print();
        console.log(`
            Publisher: ${ this.publisher }
            ISBN: ${ this.ISBN }
        `);
    }
}

class BlogPost extends Publication {
    constructor(title,author,pubDate,URL) {
        super(title,author,pubDate);
        this.URL = URL;
    }

    print() {
        super.print();
        console.log(this.URL);
    }
}
```

- `Book` and `BlogPost` _extend_ the general `Publication` class with more specific behavior
- `super()` delegates the initialisation work to the parent class's `constructor`
- Both child classes have a `print()` method that __overrides__ the _inherited_ method 
  - _polymorphism_ = both inherited and overridden methods can have same name 
  - Inheritance allows children classes to cooperate with parent classes by accessing / using its behavior and data, while being organized in their own separate logical units (as a class)

### Classic Modules

- ES6 added a module syntax form ot native JS syntax, but another module pattern has been important and common previously

> an outer function (that runs at least once), which returns an "instance" of the module with one or more functions exposed that can operate on the module instance's internal (hidden) data

```js
function Publication(title, author) {
    var publicAPI = {
        print() {
            console.log(title, author)
        }
    };

    return publicAPI;
}

function Book(bookDetails) {
    var pub = Publication(bookDetails.title, bookDetails.author);
    
    var publicAPI = {
        print() {
            pub.print()
            console.log(bookDetails.publisher)
        }
    };

    return publicAPI;
}
```

- Similar to classes, but with methods and data accessed as _identifier variables_ in scope rather than via `this.`
- All data and methods are public with a class, but a _module factory function_ exposes public methods explicitly via the returned object, while other methods _remain private_ inside the factory function

```js 
var robsBook = Book({
    title: "Rob's cool book",
    author: "Rob"
})

robsBook.print()
```

- Usage is quite similar to a class, just that there's no `new` keyword and the module factory function is called directly

### ES Modules

- Introduced in ES6 to provide same general utility as classic modules
- Implementation is very different though 
- Instead of a wrapping context that the factory functions provided: the _file_ for the ESM is the wrapping context
  - ESMs are always module based: one file = one module 
- Use `export` keyword to add a variable or method to the ESM's _public_ API definition
  - Defined in a module, but not exported = stays hidden
- We don't "instantiate" an ES module
  - First `import` creates a single instance
  - All other `import`s just receive a reference to that same single instance
  - _singleton_ 


## [Ch.3 Digging into the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch3.md)

### Iterator-consumers

- The `...` operator 
  - Two symmetrical forms: `spread` and `rest`
- _Spread_ is an __iterator-consumer__
  - Official JS spec only allows spread into an array or a function call
    - _Array spread_
    - _Function call spread_
  - But _object spread_ is common enough (needs Babel)

```js
var myNewArray = [...previouslyDefinedIterable]
myGreatFunction(...previouslyDefinedIterable)
```

- `for...of` is another ES6 iterator-consumer

```js
for (let value of previouslyDefinedIterable){
  ...
}
```

### Iterables

> ES6 defined the basic data structure / collection types in JS as iterables
- strings, arrays, maps, sets (and others)
- Most all these will have `keys()`, `values()`, and `entries()` methods

- A `Map` data structure has a default iteration method over its _entries_ rather than its _values_
  - An entry = _tuple_ (two-element array) with both a key and a value

```js
// Given two DOM elements button1 + button2

var buttonNames = new Map();
buttonNames.set(button1, "Home")
buttonNames.set(button2, "Cart")

for (let [button, buttonName] of buttonNames) {
  button.addEventListener('click', function onClick(){
    console.log(`Clicked ${buttonName}`)
  })
}
```

### Closure

> Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.
- Closure is an aspect of _functions_
- To observe a closure, you must execute a function in a _different scope_ than where it was originally defined

```js
function giveMeAGreeting(greeting) {
  return function giveMeAName(name) {
    console.log(`${greeting}, ${name}!`)
  }
}

const hello = giveMeAGreeting("Hello")
const sup = giveMeAGreeting("Sup")

hello("Harold")
sup("Sandra")
```

- Nice higher-order function example where the `greeting` value is saved in the instance of the inner function thanks to closure
  - The inner function `giveMeAName` __closes over__ the `greeting` variable from its outer scope
  - `hello` and `sup` are functions that persist the `greeting` argument passed into `giveMeAGreeting`
> When the `giveMeAGreeting(...)` function finishes running, normally we would expect all of its variables to be garbage collected (removed from memory) 
- But because the inner function instances are still alive, being assigned to `hello` and `sup`, _their closures_ preserve the `greeting` variables

```js
function counter(step = 1) {
  let count = 0
  return function increment(){
    count = count + step;
    return count
  }
}

const add100 = counter(100)
const add1 = counter(1)

add100();
add100();
add1();

const bigMoney = add100() //300
const broke = add1() //2
```
- Instances of the inner function __close over__ both the `count` and `step` values from the outer scope
- Point here is that the __variables within a closure are not a snapshot__ and can be changed
> a direct link and preservation of the variable itself 

```js 
function getData(url) {
  ajax(url, function onResponse(response){
    console.log(`Response from ${url}: ${response}`)
  })
}
```
> Closure is most common when working with asynchronous code, such as with callbacks
- `getData` finishes right away, but the `url` parameter variable __stays alive__ as long as needed

```js
for (let [index, button] of buttons.entries()) {
  button.addEventListener('click', function onClick(){
    console.log(`Button ${index} clicked`)
  })
}
```
- Example where the outer scope isn't a function
- But the click handler is a function, and it creates the closure that preserves the `index` variable 
  - Only functions have closure 


### `this` keyword

- Common _misconceptions_
  - `this` refers to the function itself
  - `this` points to the instance that a method belongs to

- Functions have two key characteristics determining what they can access:
  - _scope_: the set of rules that controls how references to variables are resolved
    - When it is defined, a function is attached to its enclosing scope via _closure_
  - _execution context_: can be thought of as a tangible object whose properties are made available to a function while it executes
    - Exposed to the function via `this`

- Scope is static 
  - Contains fixed variables at moment and location a function is defined

- Execution context is dynamic
  - Dependant on __how a function is called__ 
  - Not a fixed characteristic, but a dynamic one determined every time a function is called

- The benefit of a _this-aware_ function is the ability to flexibly re-use a function with different data from different objects

#### No context specified

```js
function classroom(teacher) {
  return function study() {
    console.log(`${teacher} says to study ${this.topic}`)
  }
}

var assignment = classroom("Robert")
assignment() // Robert says to study undefined
```
- Here, the inner function, `study`, is __dependent on its execution context__ because it is a _this-aware_ function
- Without a context specified, the default context is the global object
  - `globalThis.topic` will equal `undefined`

#### Context via object
```js
let homework = {
  topic: "JS",
  assignment: assignment
}
homework.assignment() // Robert says to study JS
```
- A copy of the _assignment function reference_ is set on the homework object
  - `this` for the function call = homework object 

#### Context via `call()`
```js
let otherHomework = {
  topic: "slam dunks"
}

assignment.call(otherHomework) // Robert says to study slam dunks
```
- `call()` takes an object to set the `this` reference for the function call

### [Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch3.md#prototypes)  
 
 - A characteristic of __objects__
   - Provides rules for the resolution of property access

- Helpful to think of prototypes as a form of _linkage_ between objects
  - _prototype chain_ = series of objects linked together via prototypes
  
> The purpose of this prototype linkage is so that accesses against object B for properties/methods that B does not have, are delegated to object A
- Notion of __delegation__ is useful

- `Object.create()` defines a an object prototypes linkages
  - `Object.create(null)` creates a standalone object without any of the built in JS object properties or methods
- Another way to create an object with prototype linkage that used to be very common prior to ES6 is through "Prototypal 'Classes'"

#### `this` revisited

- One of the main reasons `this` is dynamic based on how a function is called is so that prototype-delegated function calls maintain the expected `this`

```js 
let homework = {
  study() {
    console.log(`Study ${this.topic}`);
  }
};

let jsHomework = Object.create(homework);
jsHomework.topic = "JS";
jsHomework.study(); // "Study JS"

let dunkHomework  = Object.create(homework);
dunkHomework.topic = "slam dunks";
dunkHomework.study(); // "Study slam dunks"
```

- Both `jsHomework` and `dunkHomework` prototype link to the same `homework` object
  - Because neither has a `study` method, they delegate up the chain to `homework`, which does
  - Cool thing to point out though is that `this` within `study` still resolves to the object which executed `study`
  - Example of dynamic `this` being determined based on _execution context_
  - Other languages may place `this` on `homework`, since that's where `study` is defined, but not JS

> Unlike may other languages, JS's `this` being dynamic is a critical component of allowing prototype delegation, and indeed `class`, to work as expected!


## [Ch.4 The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch4.md)

### Scope and Closure

- JS is lexically scoped 
- Many claim it isn't due to 2 characteristics not present in other lexically-scoped languages
  - _hoisting_: where all variables declared anywhere in the scope are treated as if they were declared at the beginning of the scope
  - _function-scope `var`_: `var` variables are function scoped even if they appear within a block
> Closure is the natural result of lexical scope when the language has functions as first-class values, as JS does.
- A function maintains access to to its original scope variables regardless of the scope it's executed in (this is closure)
