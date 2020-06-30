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
// ..
```

- Key point that the data (e.g. `text` string and `pages` array) are _organized_ alongside their behaviors (e.g. `print` and `addPage` methods)
- We can write a program without an organizing mechanism like a class, but it would be harder to reason about and maintain
  - Reminds me of some of the massive 600+ line files I've had to work with where you need multiple tabs open at various lines of the file

### (Class inheritance)[https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch2.md#class-inheritance]

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
  - Inheritance allows children classes to cooperate with parent classes by accessing / using its behavior and data

## [Ch.3 Digging into the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch3.md)

### [Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/529671508dde28147221addbf4038bf6e2f9db31/get-started/ch3.md#prototypes)