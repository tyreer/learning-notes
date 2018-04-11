# Notes on ES6 for Everyone

Notes from the Wes Bos course at [ES6.io](https://ES6.io)

![ES6 for Everyone](https://es6.io/images/es6-facebook-share.png?cool=yah)

### Personal highlights:
+ [Function scope vs block scope](#01---var-let-const)
+ [Block scope as replacement of IIFE](#03---let-and-const-in-the-real-world)
+ [Arrow functions don't rebind 'this'](#06---arrow-functions-introduction)
+ [Parenthesis needed around object literals for implicit return in arrow functions](#07---more-arrow-function-examples)
+ [Top-level functions on event handlers typically use non-arrow functions because rebinding 'this' is desired](#08---arrow-functions-and-this) *
  + Inside event handlers though, arrow functions are great because 'this' can usefully refer to the event triggering element
+ Default function arguments (9)
+ Ternary with conditional logic for template literal (13)
+ Render function within a template literal (13)
+ Tagged template literals (14)
+ Assembling a tagged template literal programmatically with _reduce_ (15 + 16)
+ String methods: _startsWith_, _endsWith_, _includes_ (17)
+ Destructuring, renaming while destructuring, default values (18)
+ Rest operator (19)
+ Swapping variables through destructuring (20)
+ Returning multiple values through destructuring (21) *
+ Named defaults from an empty array (21)
+ For-of loop, break, continue, _entries_ (22)
+ Second parameter of _Array.from()_ runs _map()_ (25)
+ _Array.find()_ + _Array.findIndex()_ (26)
+ Spread operators as function arguments (31)
+ Rest operators as function parameters (32)
+ Updated key syntax on object literals (33)
+ Symbols (38)
+ ESLint + Git Hooks (44)
+ Default exports vs named exports in JS modules (45)
+ Babel "env" setting in .babelrc (49)
+ Static methods on classes (52)
+ Proxies, handlers, traps (58)
+ Sets + WeakSets (61)
+ Garbage collection (63)
+ Maps used for metadata collection on an object (64)
+ Promises + async/await (69)
+ Async/await error handling with higher-order functions (70) *
+ Class properties (73)
+ _Array.includes()_ (75)
+ Trailing commas (76)
+ _Object.entries()_ + _Object.values()_ (77)
+ Curly brackets have many meanings
  + object literals
  + destructuring variables out of an object
  + importing a named export

## Module 1 - New Variables — Creation, Updating and Scoping

#### 01 - var-let-const

__var__
+ __Function scope__: Available inside function where a _var_ is created (local variable)
+ Or globally scoped if not in a function
  + Global scoped is generally not what we want. To update a variable outside a function we should __return__ from the function
  + __if{} blocks are not functions__ and will leak _var_ variable scope. This isn't intuitive and exemplifies one of the big upgrades we get with _block scope_

```js
var age = 100;
if(age > 12) {
  var dogYears = age * 7;
  console.log(`You are ${dogYears} dog years old!`);
}

console.log(dogYears) //700
```

__let__
+ __Block scope__: Available inside block where a _let_ is created
+ __if{} blocks__ will constrain scope

```js
var age = 100;
if(age > 12) {
  let dogYears = age * 7;
  console.log(`You are ${dogYears} dog years old!`);
}

console.log(dogYears) //undefined
```

#### 02 - let VS const

In contrast to var, _let_ and _const_ __cannot be redeclared__ in the same scope.

```js
let points = 50;
let winner = false;
let points = 40; // error
```

__Object.freeze()__
>The Object.freeze() method freezes an object: that is, prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed, it also prevents the prototype from being changed.

#### 03 - let and const in the Real World

__IIFE__
+ Thanks to block scope, blocks + let/const constrain scope just like an IIFE

```js
{
  const name = 'wes';
}
```
...can replace...
```js
(function(){
  const name = 'wes';
})()
```

__for loop__
+ The block scope of _let_ prevents the variable in a _for_ loop from escaping into global scope.
+ Also creates nine scopes in the example below that all retain their declared value, in contrast to _var_ which would be overridden and simply output the final value 10 times
```js
for(let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log('The number is ' + i);
  },1000);
}
```

#### 04 - Temporal Dead Zone
+ _var_ can be accessed prior to being declared, although it's value is undefined
```js
console.log(pizza); //undefined because in the TEMPORAL DEAD ZONE
var pizza = 'Deep Dish 🍕🍕🍕';
```

+ _let/const_ cannot be accessed before being declared
```js
console.log(pizza); //Error
const pizza = 'Deep Dish 🍕🍕🍕';
```

#### 05 - Is var Dead? What should I use?
+ Most familiar to me:

>+ use const by default
>+ only use _let_ if rebinding is needed
>+ (var shouldn’t be used in ES2015)

https://mathiasbynens.be/notes/es6-const

## Module 2 - Function Improvements: Arrows and Default Arguments

#### 06 - Arrow Functions Introduction

Some benefits of arrow functions
+ Concise
+ Implicit returns
```js
const fullNames4 = names.map(name => `${name} bos`);
```
vs
```js
const fullNames3 = names.map(name => {
  return `${name} bos`;
});
```
+ Doesn't __rebind__ the value of _this_

+ Arrow functions are always __anonymous functions__, but they can be declared in a variable
```js
const sayMyName = (name) => {
  alert(`Hello ${name}!`)
}
```
One benefit of a named function is that the name can be helpful in __tracking errors__ in a stack trace

#### 07 - More Arrow Function Examples
+ Implicit return with object literal
  + Removing function block braces works for other types of returned values, but gets weird with an object literal, which has its own braces

Solution: __parenthesis around object literal__:
```js
const win = winners.map((winner, i) => ({name: winner, race, place: i + 1}));
```

Nice example of implicit return of a boolean
```js
const ages = [23,62,45,234,2,62,234,62,34];
const old = ages.filter(age => age >= 60);
```

#### 08 - Arrow Functions and 'this'
+ When using an arrow function, the value of this is not rebound, so can end up with parent scope on a click event handler.

```js
const box = document.querySelector('.box');
box.addEventListener('click', () => console.log(this)) //Window NOT box!
```

+ Generally good then to have a non-arrow function at the top-level of an event handler because we want _this_ to establish a specific context relative to the element associated with triggering the event.

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {console.log(this);}) // Box!
```

+ Arrow function inherits value of _this_ from parent function, which is useful inside a callback.

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {

  this.classList.toggle('opening');
  setTimeout(() => {
    console.log(this); // Still box, but would be Window if non-arrow function! bc new context unbound to box would be created by non-arrow function
    this.classList.toggle('open');
  }, 500);
});
```

Inheriting _this_ via arrow functions allows you to achieve the same thing as
```js
var that = this;
```

#### 09 - Default Function Arguments

```js
function calculateBill(total, tax = 0.13, tip = 0.15) {
  return total + (total * tax) + (total * tip);
}

const totalBill = calculateBill(100, undefined, 0.25);
```
+ _undefined_ is still needed as a parameter in the function invocation, which seems odd to me

Can replace:

```js
tax = tax || 0.13;
```

#### 10 - When NOT to Use an Arrow Function

__(1)__ __Top level of an event handler__ callback where _'this'_ is needed

✅
```js
const button = document.querySelector('#pushy');
button.addEventListener('click', function() {
  console.log(this); //button
  this.classList.toggle('on');
});
```
⛔
```js
const button = document.querySelector('#pushy');
button.addEventListener('click', () => {
  console.log(this); //Oh no, Window!
  this.classList.toggle('on');
});
```

__(2)__ When you need a __method to bind to an object__

✅
```js
const person = {
  points: 23,
  score() {
    console.log(this); // person {...}
    this.points++; // Increments object attribute
  }
  // ^  SAME AS  ^
  // score: function() {}
}
```
⛔
```js
const person = {
  points: 23,
  score: () => {
    console.log(this); // Oh no, Window!
    this.points++; // Undefined
  }
}
```

__(3)__ When you need to add a __prototype method__

✅
```js
class Car {
  constructor(make, colour) {
    this.make = make;
    this.colour = colour;
  }
}

const beemer = new Car('bmw', 'blue');
const subie = new Car('Subaru', 'white');

Car.prototype.summarize = function() {
   return `This car is a ${this.make} in the colour ${this.colour}`;
};

beemer.summarize() //"This car is a bmw in the colour blue"
```

⛔
```js
class Car {
  constructor(make, colour) {
    this.make = make;
    this.colour = colour;
  }
}

const beemer = new Car('bmw', 'blue');
const subie = new Car('Subaru', 'white');

Car.prototype.summarize = () => {
   return `This car is a ${this.make} in the colour ${this.colour}`;
};

beemer.summarize() // "This car is a undefined in the colour undefined"
```

__(4)__ When you need __arguments object__

✅
```js
const orderChildren = function() {
  // orderChildren('beyonce', 'solange')
  console.log(arguments); // ["beyonce", "solange"]
  const children = Array.from(arguments);
  return children.map((child, i) => {
    return `${child} was child #${i + 1}`;
  })
}
```

⛔
```js
const orderChildren = () => {
  // orderChildren('beyonce', 'solange')
  console.log(arguments); // Uncaught ReferenceError: arguments is not defined
  const children = Array.from(arguments);
  return children.map((child, i) => {
    return `${child} was child #${i + 1}`;
  })
}
```
#### 11 - Arrow Functions Exercises

My answer:
```js
const videoSeconds = videoTimes.map(videoTime => {
  const [minutes , seconds] = videoTime
    .split(':')
    .map(parseFloat);

  return minutes * 60 + seconds;
});
```
+ Declaration of _minutes_ and _seconds_ is happening via destructuring since the other side of the equals operator will have an array.

Bos answer:
```js
.map(timecode => {
  const parts = timecode.split(':').map(part => parseFloat(part));
  return (parts[0] * 60) + parts[1];
})
```

## Module 3 - Template Strings

#### 13 - Creating HTML fragments with Template Literals

```js
const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'Hugo', age: 8 },
  { name: 'Sunny', age: 1 }
];

const markup = `
  <ul class="dogs">
    ${dogs.map(dog => `
      <li>
        ${dog.name}
        is
        ${dog.age * 7}
      </li>`).join('')}
  </ul>
`;
```

+ Possible to iterate and generate template literals _inside_ another template literal.

```js
const song = {
  name: 'Dying to live',
  artist: 'Tupac',
  featuring: 'Biggie Smalls'
};

const markup = `
  <div class="song">
    <p>
      ${song.name} — ${song.artist}
      ${song.featuring ? `(Featuring ${song.featuring})` : ''}
    </p>
  </div>
`;
```

+ __Ternary within template literal__ to handle string that may or may not be present

```js
const beer = {
  name: 'Belgian Wit',
  brewery: 'Steam Whistle Brewery',
  keywords: ['pale', 'cloudy', 'spiced', 'crisp']
};

function renderKeywords(keywords) {
  return `
    <ul>
      ${keywords.map(keyword => `<li>${keyword}</li>`).join('')}
    </ul>
  `;
}

const markup = `
  <div class="beer">
    <h2>${beer.name}</h2>
    <p class="brewery">${beer.brewery}</p>
    ${renderKeywords(beer.keywords)}
  </div>
`;
```

```js
${renderKeywords(beer.keywords)}
```

+ Possible to __delegate to a render function__ the work of generating a template literal 😍
+ Parallels with React patterns where a component  is designated to handle a specific bit of markup generation

#### 14 - Tagged Template Literals

```js
function highlight(strings, ...values) {
  debugger;
}
```
+ Dev tools > sources > scope > local
  + Useful way to assess a function's local scope

```js
function highlight(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += `${string} <span contenteditable class="hl">${values[i] || ''}</span>`;
  });
  return str;
}

const name = 'Snickers';
const age = 100;

const sentence = highlight`My dog's name is ${name} and he is ${age} years old`;
```
+ Pass in the string and the __tagged template literal is broken into its pieces__, which can then be manipulated as they are reassembled
  + __rest spread__ useful in accepting as many arguments as are passed in
  + Suppose this is how you could make something like "drunk-ify text"

#### 15 - Tagged Templates Exercise

```js
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

function addAbbreviations(strings, ...values) {
  const abbreviated = values.map(value => {
    if(dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`;
    }
    return value;
  });

  return strings.reduce((sentence, string, i) => {
    return `${sentence}${string}${abbreviated[i] || ''}`;
  }, '');
}

const first = 'Wes';
const last = 'Bos';
const sentence = addAbbreviations`Hello my name is ${first} ${last} and I love to code ${'HTML'}, ${'CSS'} and ${'JS'}`;
```

```js
const abbreviated = values.map(value => {
  if(dict[value]) {
    return `<abbr title="${dict[value]}">${value}</abbr>`;
  }
  return value;
});
```
+ Mapping over all values in template literal and testing if a given _value_ can serve as key in the _dict_ object
  + If not, just returning the _value_

```js
return strings.reduce((sentence, string, i) => {
  return `${sentence}${string}${abbreviated[i] || ''}`;
}, '');
```
+ __Assembling a string programmatically__ from several sources using __reduce__

#### 16 - Sanitizing User Data with Tagged Templates

+ __XXS__ = Cross-site Scripting
  + Security risk in using __innerHTML__ w/o __sanitizing__ as evil JS could get run—as in __onload__ below

```js
  function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
    return DOMPurify.sanitize(dirty);
  }

  const first = 'Wes';
  const aboutMe = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;

  const html = sanitize`
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;

  const bio = document.querySelector('.bio');
  bio.innerHTML = html;
  ```

  ```js
  const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
  ```
  + Seems the __minimal way to reconstruct__ from a tagged template using _reduce_

```js
return DOMPurify.sanitize(dirty);
```
+ __DOMPurify__ is imported

## Module 4 - Additional String Improvements

#### 17 - New String Methods
__Four new methods__
+ Largely conveniences to avoid reliance on regex
+ Case sensitivity is a bit of a drawback compared to regex

```js
const course = 'RFB2';
const flightNumber = '20-AC2018-jz';
const accountNumber = '825242631RT0001';
```

__.startsWith()__
```js
course.startsWith('RF'); //true
course.startsWith('rf'); //false
```
+ Cannot make case insensitive

__.endsWith()__
```js
flightNumber.endsWith('jz'); //true
accountNumber.endsWith('RT'); //false
accountNumber.endsWith('RT', 11); //true
```
+ Second parameter determines how much of the original string to consider
  + Here the first 11 characters

__.includes()__
```js
flightNumber.includes('AC'); //true
flightNumber.includes('ac'); //false
```
+ Backstory on _contains()_ + MooTools name space

__.repeat()__
```js
function leftPad(str, length = 20) {
  return `→ ${' '.repeat(length - str.length)}${str}`;
}
```
+ Repeats a given string as many times as specified in the parameter
+ In this case, _repeat_ is used to right align text by inserting spaces programatically

## Module 5 - Destructuring
+ Key syntax point is to match the left and right sides:

```js
const { A, B } = { A: 'value1', B: 'value2' };
```

```js
const [ A, B ] = ['value1', 'value2'];
```

In both cases:
```js
console.log(A); //"value1"
console.log(typeof(A)); //string
```

#### 18 - Destructuring Objects

__Object destructuring syntax__
```js
const person = {
  first: 'Wes',
  last: 'Bos',
  country: 'Canada',
  city: 'Hamilton',
  twitter: '@wesbos'
};

const { first, last, twitter } = person;
```

```js
const { } = person;
```
+ The __brackets here are destructuring syntax__, not a block or an object.
  + When destructuring an object, we use curly brackets. But when destructuring an array, we'll use square brackets.
  + A bit like a __type hint__
+ __Top-level variable__

__Destructuring deeply nested data__

```js
const wes = {
  first: 'Wes',
  last: 'Bos',
  links: {
    social: {
      twitter: 'https://twitter.com/wesbos',
      facebook: 'https://facebook.com/wesbos.developer',
    },
    web: {
      blog: 'https://wesbos.com'
    }
  }
};

const { twitter, facebook } = wes.links.social;
```
+ With __nested data__

__Renaming__

```js
const { twitter: tweet, facebook: fb } = wes.links.social;
```
+ Can __rename as you destructure__
+ Otherwise, we're a bit "trapped" because "twitter" is the key we need to use
  + Here the variable names are _tweet_ and _fb_

__Setting defaults__

```js
const settings = { width: 300, color: 'black' }
const { width = 100, height = 100, color = 'blue', fontSize = 25} = settings;
```
+ If the value exists in _settings_ then it will override the default

__Combined example__
```js
// Object destructuring with variable renaming & default values
const { w: width = 400, h: height = 500 } = { w: 800 }
```
+ Not necessarily a common use case, but models all concepts

#### 19 - Destructuring Arrays

__Array destructuring syntax__

```js
const details = ['Wes Bos', 123, 'wesbos.com'];
const [name, id, website] = details;
```
+ Uses __square brackets__, as opposed to curly brackets for objects

```js
const data = 'Basketball,Sports,90210,23,wes,bos,cool';
const [itemName, category, sku, inventory] = data.split(',');
```
+ Creating an array from a string with _split()_, and then immediately destructuring into the four desired variables

```js
const team = ['Wes', 'Harry', 'Sarah', 'Keegan', 'Riker'];
const [captain, assistant, ...players] = team;
console.log(players) // ['Sarah', 'Keegan', 'Riker'] ;
```
+ __Rest operator__ allows us to get all the remaining items

#### 20 - Swapping Variables with Destructuring

```js
let inRing = 'Hulk Hogan';
let onSide = 'The Rock';

console.log(inRing, onSide); // 'Hulk Hogan', 'The Rock'

[inRing, onSide] = [onSide, inRing];

console.log(inRing, onSide); // 'The Rock', 'Hulk Hogan'
```

```js
[inRing, onSide] = [onSide, inRing];
```
+ On the right, creating an array which is immediately destructured into the two assignments on the left

#### 21 - Destructuring Functions - Multiple returns and named defaults

__Multiple returns__
```js
function convertCurrency(amount) {
  const converted = {
    USD: amount * 0.76,
    GPB: amount * 0.53,
    AUD: amount * 1.01,
    MEX: amount * 13.30
  };
  return converted;
}

const { USD, GBP } = convertCurrency(100);
```
+ While we're technically still just returning the single object, this effectively allows __multiple values from a single function return__


__Named defaults__
```js
function tipCalc({ total = 100, tip = 0.15, tax = 0.13 } = {}) {
  return total + (tip * total) + (tax * total);
}

const bill = tipCalc({ tip: 0.20, total: 200 });
```
+ Versatile syntax allowed by passing an object into a function
  + Order of values passed in is not important
  + Don't need to pass in _undefined_ for a parameter value like we did in video 5
  + Empty object is a bit unintuitive as a sort of second-tier default, but needed in case no values are passed in as parameters

## Module 6 - Iterables and Looping

__Built-in JS iterables__
>String, Array, TypedArray, Map and Set are all built-in iterables, because their prototype objects all have a Symbol.iterator method.

#### 22 - The for of loop

__for-of loop__

+ Can be used with any kind of data except objects
+ Allows _break_ and _continue_

```js
const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

for (const cut of cuts) {
  if(cut === 'Brisket') {
    continue;
  }
  console.log(cut);
}
```

+ Existing methods of iterating and their drawbacks
  + _for_ loop
    + Scope issue with _var_, slightly chunky syntax
  + _forEach_
    + No way to abort a loop with something like _break_
    + No way to skip over with _continue_
  + _for-in_ loop
    + Weirdly, will also iterate over anything added to the prototype, not only the items in the iterable collection
    + 3rd party code might extend prototype (MooTools)

#### 23 - The for-of Loop in Action

```js
for (const [i, cut] of cuts.entries()) {
  console.log(`${cut} is the ${i + 1} item`);
}
```
+ __entries__ is immediately destructured into two variables

>Array.prototype.entries(): The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.

```js
function addUpNumbers() {
  let total = 0;
  for (const num of arguments) {
    total += num;
  }
  return total;
}

addUpNumbers(10,23,52,34,12,13,123);
```
+ __for-of loop with _arguments___ allows us to accept any number of parameters
  + Best practice would be to convert _arguments_ to an array, but if just iterating over then not a problem to forgo conversion

```js
const ps = document.querySelectorAll('p');
for (const paragraph of ps) {
  paragraph.addEventListener('click', function() {
    console.log(this.textContent);
  });
}
```
+ I'd typically use _forEach_ to add event listeners, but _for-of_ might be useful if you wanted to use _break_ or _continue_ to more selectively apply event handlers

#### 24 - Using for-of with Objects

+ __Object.entries()__ is standard in ES2017
  + Subject of video 77

```js
const apple = {
  color: 'Red',
  size: 'Medium',
  weight: 50,
  sugar: 10
};

for (const prop in apple) {
  const value = apple[prop];
}
```
+ Short of _Object.entries()_ Bos suggests just sticking with a _for-in_ loop

## Module 7 - An Array of Array Improvements

#### 25 - Array.from() and Array.of()
+ Neither are on the prototype, but on _Array_ itself

__Arrary.from()__

```html
<div class="people">
  <p>Wes</p>
  <p>Kait</p>
  <p>Snickers</p>
</div>
```
```js
const people = document.querySelectorAll('.people p');
const peopleArray = Array.from(people, person => person.textContent);
console.log(peopleArray); //["Wes", "Kait", "Snickers"]
```
+ __Second parameter runs map__ method 🆒

```js
function sumAll() {
  const nums = Array.from(arguments);
  return nums.reduce((prev, next) => prev + next, 0);
}

sumAll(2, 34, 23, 234, 234, 234234, 234234, 2342);
```
+ Common use case is to __convert _arguments_ to an array__ in order to use all the array methods, such as _reduce_ above
  + Note that _sumAll_ needs to be a non-arrow function since it relies on accessing _arguments_

__Arrary.of()__
```js
const ages = Array.of(12,4,23,62,34);
console.log(ages); // [12, 4, 23, 62, 34]
```
+ Pretty straightforward

#### 26 - Array.find() and Array.findIndex()

```js
const posts = [
  {
     "code":"VBgtGQcSf",
     "caption":"Trying the new Hamilton Brewery beer. Big fan.",
     "likes":27,
     "id":"1122810327591928991",
     "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12224456_175248682823294_1558707223_n.jpg"
  },
  {
     "code":"FpTyHQcau",
     "caption":"I'm in Austin for a conference and doing some training. Enjoying some local brew with my baby.",
     "likes":82,
     "id":"1118481761857291950",
     "display_src":"https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/11326072_550275398458202_1726754023_n.jpg"
  }
];
const code = 'VBgtGQcSf';
const post = posts.find(post => post.code === code);
console.log(post); // { ENTIRE OBJECT THAT MATCHES THE CONDITION }
```
+ __find()__ returns once a condition is true
  + If you wanted multiple results, then use __filter()__

```js
  const postIndex = posts.findIndex(post => post.code === code);
  console.log(postIndex); // 22
```
+ __findIndex()__: Useful if you want to do something like delete a post or apply a highlight class

#### 27 - Array .some() and .every()
+ Not a part of ES6, but included because useful and somewhat rare "in the wild"

```js
const ages = [32, 15, 19, 12];

// 👵👨 is there at least one adult in the group?
const adultPresent = ages.some(age => age >= 18);
console.log(adultPresent); / /true

// 🍻 is everyone old enough to drink?
const allOldEnough = ages.every(age => age >= 19);
console.log(allOldEnough); // false
```

## Module 8 - Say Hello to ...Spread and ...Rest

#### 28 - Spread Operator Introduction

```js
console.log([...'wes']); //["w", "e", "s"]
```

```js
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

console.log([...featured, ...specialty]);

const pizzas = [...featured, 'veg', ...specialty];
const fridayPizzas = [...pizzas];
```

+ Nice alternative to _.concat()_
+ Spread operator also allows an array to be __copied instead of referenced__
```js
const fridayPizzas = pizzas;
fridayPizzas[0] = 'Yum-1';
console.log(pizzas[0]) // 'Yum-1'  - OH NO;
```
+ _Referencing_ an array is just bad.

#### 29 - Spread Exercise

```html
  <h2 class="jump">SPREADS!</h2>
```

__Wes:__
```js
  const heading = document.querySelector('.jump');
  heading.innerHTML = sparanWrap(heading.textContent);

  function sparanWrap(word) {
    return [...word].map(letter => `<span>${letter}</span>`).join('');
  }
```

__Me:__
```js
const target = document.querySelector('.jump');
target.innerHTML = [...target.textContent].map(letter => `<span>${letter}</span>`).join('')
```

+ Separating the logic out into its own function makes Wes's solution __more reusable__ and __easier to reason about__

#### 30 - More Spread Examples

```js
  const people = Array.from(document.querySelectorAll('.people p'));
  const people = [...document.querySelectorAll('.people p')];
```
+ Fair point that __Array.from() reads more clearly__ to others

```js
const comments = [
  { id: 209384, text: 'I love your dog!' },
  { id: 523423, text: 'Cuuute! 🐐' },
  { id: 632429, text: 'You are so dumb' },
  { id: 192834, text: 'Nice work on this wes!' },
];
const id = 632429;
const commentIndex = comments.findIndex(comment => comment.id === id);
const newComments = [...comments.slice(0,commentIndex), ...comments.slice(commentIndex + 1)];
```

#### 31 - Spreading into a Function
__Spread operators__ can be useful as __arguments__ passed into functions

```js
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];
inventors.push(...newInventors);
```

```js
const name = ['Wes', 'Bos'];

function sayHi(first, last) {
  alert(`Hey there ${first} ${last}`);
}

sayHi(...name);
```
+ Simply saying, pass in all elements of the _name_ array

#### 32 - The ...rest param in Functions and destructuring
__Looks the exact same as spread__ operator but behaves differently as a function __parameter__

```js
function convertCurrency(rate, ...amounts) {
  return amounts.map(amount => amount * rate);
}

const amounts = convertCurrency(1.54, 10, 23, 52, 1, 56);
```

```js
const runner = ['Wes Bos', 123, 5.5, 5, 3, 6, 35];
const [name, id, ...runs] = runner;
console.log(name, id, runs); // Wes Bos 123 [5.5, 5, 3, 6, 35]

const team = ['Wes', 'Kait', 'Lux', 'Sheena', 'Kelly'];
const [captain, assistant, ...players] = team;
console.log(captain, assistant, players) // Wes Kait ["Lux", "Sheena", "Kelly"]
```

## Module 9 - Object Literal Upgrades

#### 33 - Object Literal Upgrades

If __key has same name as variable__ can omit colon:
```js
const first = 'snickers';
const last = 'bos';
const age = 2;
const breed = 'King Charles Cav';
const dog = {
  firstName: first,
  last,
  age,
  breed,
  pals: ['Hugo', 'Sunny']
};
```

__Simple modal syntax__ removes need for colon and _function_ keyword:
```js
const modal = {
  create(selector) {

  },
  open(content) {

  },
  close(goodbye) {

  }
}
```
+ Can pass in parameter:

Previously would need to use:

```js
const modal = {
  create: function(selector) {

  }
```

Can __dynamically set keys__ on an object:

```js
const key = 'pocketColor';
const value = '#ffc600';

const tShirt = {
  [key]: value,
  [`${key}Opposite`]: invertColor(value)
};
```

__Computed property keys__ are possible in ES6:

```js
const keys = ['size', 'color', 'weight'];
const values = ['medium', 'red', 100];

const shirt = {
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
}
```

## Module 10 - Promises

#### 34 - Promises

```js
const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');

postsPromise
  .then(data => data.json())
  .then(data => { console.log(data) })
  .catch((err) => {
    console.error(err);
  })
```
+ __fetch()__ returns a promise
+ At time of declaration _postPromise_ is like an __IOU__
+ Think of __then()__ like a callback that allows for synchronous execution (once the IOU returns)
+ __.json()__ method is key to translating returned data into useful JSON


#### 35 - Building your own Promises

Can think of a promise as: "_I don't want to stop JS from running. I just want to start this thing, and once it comes back pick it up_"

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error('Err wes isn\'t cool'));
  }, 1000);
});

myPromise
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
  ```
+ __resolve()__ + __reject()__ methods come with the promise
+ Using an __Error__ object in _reject()_ allows the stack trace to locate the line where the error was thrown

#### 36 - Chaining Promises + Flow Control

```js
const posts = [
  { title: 'I love JavaScript', author: 'Wes Bos', id: 1 },
  { title: 'CSS!', author: 'Chris Coyier', id: 2 },
  { title: 'Dev tools tricks', author: 'Addy Osmani', id: 3 },
];

const authors = [
  { name: 'Wes Bos', twitter: '@wesbos', bio: 'Canadian Developer' },
  { name: 'Chris Coyier', twitter: '@chriscoyier', bio: 'CSS Tricks and CodePen' },
  { name: 'Addy Osmani', twitter: '@addyosmani', bio: 'Googler' },
];

function getPostById(id) {
  return new Promise((resolve, reject) => {
  // using a settimeout to mimick a databse
    setTimeout(() => {
      const post = posts.find(post => post.id === id);
      (post)
      ? resolve(post)
      : reject(Error('No Post Was Found!'));
    }, 1000)
  });
}

function hydrateAuthor(post) {
  return new Promise((resolve, reject) => {
    const authorObject = authors.find(author => author.name === post.author);
    if(authorObject) {
    // "hydrate" the post object with the author object
      post.author = authorObject;
      resolve(post)
    } else {
      reject(Error('Can not find the author'));
    }
  });
}

getPostById(1)
  .then(post => {
    return hydrateAuthor(post);
  })
  .then(post => {
    console.log(post);
  })
  .catch(err => {
    console.error(err);
  });
  ```

+ __debugger__ -> sources -> scope
  + Kind of like _console.log_ but with everything in the given scope
+ I suppose __flow control__ means using promises to synchronously execute functions?
+ I'm using a ternary above, but Bos uses a plain _if-else_, which might make more sense since the second promise will use _if-else_

#### 37 - Working with Multiple Promises

```js
const weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds'});
  }, 2000);
});

const tweets = new Promise((resolve) => {
  setTimeout(() => {
    resolve(['I like cake', 'BBQ is good too!']);
  }, 500);
});

Promise
  .all([weather, tweets])
  .then(responses => {
    const [weatherInfo, tweetInfo] = responses;
    console.log(weatherInfo, tweetInfo)
  });
  ```

  + __Promise.all()__ accepts an array of promises and waits for them all to resolve

```js
const [weatherInfo, tweetInfo] = responses;
```
+ Great use case for destructuring as a means to declare _const_ variables

```js
const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()))
  })
  .then(responses => {
    console.log(responses);
  });
  ```
+ With __Promise.all()__, we still need to __convert the response to JSON__ via a __second Promise.all()__ invocation
+ Might consider global install of __Browsersync__ to get beyond the CORS limitation _fetch()_ to an actual API often will present

## Module 11 - Symbols

#### 38 - All About Symbols
+ __7th primitive__ type and a new primitive in JS
+ Previous 6: _number, string, object, boolean, null, undefined_
+ Can help avoid naming conflicts, but not really a highly demanded addition
+ Could be useful if you want to create a property in a unique way

  ```js
  const wes = Symbol('Wes');
  const person = Symbol('Wes');
  console.log(wes === person) // false;
  ```
+ Pass in a __descriptor__ (here _'Wes'_)
+ Symbol is a unique identifier
+ Actual symbol is something like a 40-character random string, and the descriptor just represents it for ease of reading

```js
  const classRoom = {
    [Symbol('Mark')] : { grade: 50, gender: 'male' },
    [Symbol('Olivia')]: { grade: 80, gender: 'female' },
    [Symbol('Olivia')]: { grade: 83, gender: 'female' },
  };

  for (const person in classRoom) {
    console.log(person); //Nothing!
  }
```
+ Symbols __cannot be iterated__ over
+ Good example since people in a group need a unique identifier but could have the same name
  + Ensures keys in an object are absolutely unique
+ Potentially useful for storing private data?


```js
const syms = Object.getOwnPropertySymbols(classRoom);
const data = syms.map(sym => classRoom[sym]);
console.log(data);
```
+ __Object.getOwnPropertySymbols()__ pass in object and returns array of symbols, which can then be iterated over
  + Weird work around

## Module 12 - Code Quality with ESLint

#### 39 - Getting Started with ESLint
```
npm install -g eslint
```
+ Globally installing ESLint

__.eslintrc__

__"env"__: what environments will you use the JS in
```json
"env": {
  "es6": true,
  "browser": true
},
```
+ Hella options:  https://eslint.org/docs/user-guide/configuring#specifying-environments

__"rules"__: overrides to the extended set of rules
```json
"rules": {
  "no-console": 0,
  "no-unused-vars": 1
},
```
+ 0 = off, 1 = warn, 2 = error

#### 40 - Airbnb ESLint Settings

https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

```
eslint bad-code.js --fix
```
+ CLI allows easy fixes to be auto corrected with ___--fix___ flag

+ _.eslintrc_ files in a project directory work well to allow each project/team its own conventions, but it's also useful to make a global _.eslintrc_ that can serve as a default

```
atom ~/.eslintrc
```
+ System file in __home directory (~)__
+ This will be overridden by a project specific _.eslintrc_
  + ESLint will use the settings in the __closest _.eslintrc_ file__. So the closest parent folder with an _.eslintrc_ will be used _before_ the settings in a file in the home directory

#### 41 - Line and File Specific Settings

```js
/* globals twttr ga */
...
ga.track();
twttr.trackConversion();
```

+ __globals__ keyword in comment block at head of file allows global variables

```js
/* eslint-disable no-extend-native */
if (!Array.prototype.includes) {
  ...
}
/* eslint-enable no-extend-native */
  ```

```js
/* eslint-disable */
if (!Array.prototype.includes) {
  ...
}
/* eslint-enable */
  ```
+ Can __disable__ and then re-__enable__ a specific rule, or all linting

#### 42 - ESLint Plugins
In _.eslintrc_
```js
"plugins": ["html", "markdown"]
```
+ These allow ESLint to run on __script tags inside HTML__ (and ignore all the HTML markup) and on __JS in markdown notes__
+ Might not be able to run _--fix_ flag in HTML or markdown


+ https://github.com/dustinspecker/awesome-eslint#plugins
  + https://www.npmjs.com/package/eslint-plugin-html
  + https://github.com/eslint/eslint-plugin-markdown

#### 44 - Only Allow ESLint Passing Code into your git repos

+ __Git hook__ = prevent code that doesn't pass a condition from being commited
  + _/.get/hooks_

```
.git/hooks/commit-msg.sample
```
+ Remove _.sample_ from file name
+ Replace sample text in that file with Bos's script in _12 - Code Quality with ESLint/commit-msg.txt_
+ This will __prevent a commit to that repo if ESLint has errors__


## Module 13 - JavaScript Modules and Using npm

#### 45 - JavaScript Modules and WebPack 2 Tooling Setup
Decent demo but Webpack and Babel versions need to be tied to earlier releases.
+ Need to look into "zero-config" Webpack 4 for current standards
+ _es6-module-instructions.md_ have packages, etc.
+ Big picture is that __modules__ are files with one or more functions that can be made available to other modules. We want to write code in modules, and Webpack provides the __bundler__ to assemble all the modules together

(1) Make __entry point__ in _app.js_

(2) Create _package.json_ + install modules + add run scripts
  + ```npm init```
  + ```npm i -s lodash```
  + ```npm i -D lodash```
    + ___--save-dev (-D)___ = tool for development and not a part of the application we ship client side

+ In _package.json_
  ```json
  "scripts": {
      "build": "webpack --progress --watch"
  },
  ```

(3) Make _webpack.config_ file

In _webpack.config.js_
```js
const webpack = require('webpack');
```
+ We use CommonJS _require_ here because __Node doesn't deal with ES6 _import_ syntax__
  + Interesting to note that Webpack is running in Node rather than in the browser. Makes sense as Webpack is bundling all the code before it is delivered to the browser

```js
const nodeEnv = process.env.NODE_ENV || 'production';
```
+ When we make a __production build__, it will be much smaller than our development build.

```js
module: {
  loaders: [
  ]
}
```
+ Knowing that it can be used to accept almost anything, __loaders__ answers: _How should Webpack handle different file types?_

#### 45 - Creating your own Modules
+ Good to note that modules like these could also be published to npm, which is what we're doing at work.
+ Also, variables are scoped to their module

_Two types of exports in ES6_

__Default exports__
```js
export default apiKey;
```
+ The main thing a module needs to export
+ Can be named anything on import

```js
import apiKey from './src/config';
```
```js
import alternateNameforApiKey from './src/config';
```

__Named exports__
```js
export const apiKey = '123';
```
+ For methods, variables, etc.

```js
import { apiKey } from './src/config';
```
+ __Names must match__ between import and export
  + The curly braces in the __syntax for importing a named export__ look like destructuring, but are not.

```js
import { apiKey as key } from './src/config';
```
+ __Renaming with _as___ is useful if you've already got a variable using a particular namespace

```js
const age = 100;
const dog = 'snickers';

export { age as old, dog };
```
+ Can export __multiple things and rename__

#### 47 - More ES6 Module Practice

```js
export default function User(name, email, website) {
  return { name, email, website };
}
```
+ Nice model of __object literal same-name key-value syntax__

```js
import User, { createURL, gravatar } from './src/user';
```
+ Importing the default export as well as some named exports

```js
import slug from 'slug';
import { url } from './config';
import md5 from 'md5';

export default function User(name, email, website) {
  return { name, email, website };
}

export function createURL(name) {
  return `${url}/users/${slug(name)}`;
}

export function gravatar(email) {
  const hash = md5(email.toLowerCase());
  const photoURL = `https://www.gravatar.com/avatar/${hash}`;
  return photoURL;
}
```
+ Nice little example of a tidy module

## Module 14 - ES6 Tooling

#### 48 - Tool-Free Modules with SystemJS (+bonus BrowserSync setup)
https://github.com/systemjs/systemjs

Nice model of a quick way to set up module bundling w/o Webpack overhead
+ Not for production because too slow, but useful for a quick exercise

```html
<script src="https://jspm.io/system@0.19.js"></script>
<script>
System.config({ transpiler: 'babel' });
System.import('./main.js');
</script>
```

```js
import { sum, kebabCase } from 'npm:lodash';
console.log(kebabCase('Wes is soooo cool ⛓⛓⛓⛓'));
```
+ Note: _npm:lodash_

```json
"scripts": {
"server": "browser-sync start --directory --server  --files '*.js, *.html, *.css'"
},
```
+ __BrowserSync start script__
+ Just need to _save-dev_ BrowserSync

#### 49 - All About Babel + npm scripts
+ If you're not using modules, can transpile via Babel w/o Webpack

```bash
npm install babel-cli@next
```
Allows use of Babel 7 features

```json
"dependencies": {
"babel-cli": "^7.0.0-beta.1",
"babel-preset-env": "^2.0.0-beta.1"
},
```

```json
"scripts": {
"babel": "babel app.js --watch --out-file app-compiled.js"
},
```

```json
"babel": {
"presets": [
  [
    "env",
    {
      "targets": {
        "browsers": [
          "last 2 versions",
          "safari >= 8"
        ]
      }
    }
  ]
]
},
```
+ The _"babel"_ property in a _package.json_ can accept all the same settings as a _.babelrc_
+ __"presets" > "env"__ allows babel to manage the scope of transpiling required to to support designated targets.
+ As browser's change, this will automatically adapt
+ Very similar to __auto-prefixer__
+ __"env" may be a wiser choice than "es2015"__ because it avoids unnecessarily transpiling JS that is already supported by most browsers
https://babeljs.io/docs/plugins/preset-env/

```json
"plugins": [
"transform-object-rest-spread"
]
```

#### 50 - Polyfilling ES6 for Older Browsers

```js
<script src="https://cdn.polyfill.io/v2/polyfill.js"></script>
```

+ Babel accounts for the __syntax__ changes in ES6, but new methods like __Arrary.from()__ are not transpiled
+ They need a polyfill

__Two options__
+ babel-polyfill
+ https://babeljs.io/docs/usage/polyfill/
+ polyfill.io
+ https://polyfill.io/v2/docs/
+ Pretty cool as it dynamically detects a browser's user agent and polyfills only as needed
+ May have less "code overhead" than the Babel polyfill since it only loads what it needs

## Module 15 - Classes


#### 51 - Prototypal Inheritance Review
ES6 brought __classes__ into JavaScript, but __prototypal inheritance__ has long been present in JS
```js
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}
```
+ Capital 'D' because this is a __constructor function__

```js
Dog.prototype.bark = function() {
  console.log(`Bark, from ${this.name}`);
}
```

```js
const duck = new Dog('Duck', 'Poodle')
```

#### 52 - Say Hello to Classes
__Class declaration__

```js
class Dog {

}
```
+ Preferred syntax

__Class expression__

```js
const Dog = class {

}
```
+ Some use cases, but generally not as common

```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  static info() {
    console.log(`This text should not be accessible on any instance`);
  }

  bark() {
    console.log(`Bark, from ${this.name}`);
  }

  get description() {
    return `${this.name} is a good dog`;
  }

  set nicknames(value) {
    this.nick = value.trim();
  }

  get nicknames() {
    return this.nick.toUpperCase();
  }
}
const duck = new Dog('Duck', 'Poodle')
```
+ __constructor__ = what happens when class is invoked and an instance is created
  + This ES6 syntax for a method without the word _function_ was earlier modelled in video 33 on object literals
+ A __static method__ is not accessible on instances
  + Kind of like it _doesn't move_ from the class to instance, but stays static or _in place_
  + __Array.of()__ is another instance of a static method that is __not inherited__ by other arrays off the prototype
```
duck.bark()   // "Bark, from Duck"
duck.info()   // Error
Dog.info()    // "This text should not be accessible on any instance"
```

+ A __getter__ is not a method but a property that is computed
+ A __setter__  allows you to assign a property

#### 53 - Extending Classes and using super()

```js
class Animal {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.belly = [];
  }
  drink() {
    this.thirst -= 10;
    return this.thirst;
  }
  eat(food) {
    this.belly.push(food);
    return this.belly;
  }
}

class Dolphasloth extends Animal {
  constructor (name, chillFactor) {
    super(name);
    this.chillFactor = chillFactor;
  }

  slobber() {
    this.thirst += 10;
    this.chillFactor -= 10;
    return this.thirst;
  }
}

const ChillDude = new Dolphasloth('Chill Dude', 100)
```

+ First need to create an instance of Animal before we can access _'this'_ in an extended classes
  + We can do this with __super()__
  + __super() will call whatever class you're extending__
    + Here _super()_ needs name passed in because _Animal()_ needs a name parameter for its constructor
  + It runs the constructor function in the extended class, which in turn establishes _this_

  ```js
  super(name)
  // equals
  Animal(name)
  ```

+ Good to note that this is happening all the time in React

```js
import React, { Component } from 'react';

export default class Battle extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }
  ...
}
```

#### 54 - Extending Arrays with Classes for Custom Collections

Can extend any built-in primitives

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }
  add(movie) {
    this.push(movie);
  }
  topRated(limit = 10) {
    return this.sort((a, b) => (a.stars > b.stars ? -1 : 1)).slice(0, limit);
  }
}

const movies = new MovieCollection('Wes\'s Fav Movies',
  { name: 'Bee Movie', stars: 10 },
  { name: 'Star Wars Trek', stars: 1 },
  { name: 'Virgin Suicides', stars: 7 },
  { name: 'King of the Road', stars: 8 }
);

movies.add({ name: 'Titanic', stars: 5 });
```

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(...items);
```
+ These three lines are pretty trippy
  + The first _...items_ is a __rest operator__ that accepts as many parameters as are passed in (here movie objects)
  + The second _...items_ is a __spread operator__ that essentially creates a new array with the items passed in (because _super_ is invoking the _Array_ primitive)
    + new _Array('1', '2', '3')_;

```js
for (const movie of movies) {
  console.log(movie);
}
```
+ The new ES6 iteration method __for...of__ is particularly useful here as the previous methods like __for...in__ are more difficult to use resultant data from

## Module 16 - Generators


#### 55 - Introducing Generators

__NOTE:__ I get the sense that __async functions__ are preferred over generators to handle promise-returning functions
+ https://developers.google.com/web/fundamentals/primers/async-functions
+ Introduced in video 20, seemingly as an update to the course

```js
function* listPeople(){
  yield 'Joe';
  yield 'Abe';
  yield 'Sam';
}

const people = listPeople();

console.log(people.next()); // {value: "Joe", done: false}
```

+ __A Generator__ has __*__, __yield__ and __next()__ syntax, which offers multiple returns
+ __done__ will be _true_ once all the _yield_ cases have been satisfied

```js
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879 },
  { first: 'Isaac', last: 'Newton', year: 1643 },
  { first: 'Galileo', last: 'Galilei', year: 1564 },
  { first: 'Marie', last: 'Curie', year: 1867 },
  { first: 'Johannes', last: 'Kepler', year: 1571 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
  { first: 'Max', last: 'Planck', year: 1858 },
];

function* loop(arr) {
  console.log(inventors);
  for (const item of arr) {
    yield item;
  }
}

const inventorGen = loop(inventors);
```
+ Here the first call of _next()_ would log all the inventors and _return/yield_ the first object ('Einstein')
+ Then we'd need to call _next()_ to step through the array.
  + It's like the _yield_ suspends within the __for...of__ loop until _done_ has a value of true

#### 56 - Using Generators for Ajax Flow Control

+ One case for generators is ability to do waterfall-like Ajax requests

```js
function ajax(url) {
  fetch(url).then(data => data.json()).then(data => dataGen.next(data))
}

function* steps() {
  console.log('fetching beers');
  const beers = yield ajax('http://api.react.beer/v2/search?q=hops&type=beer');
  console.log(beers);

  console.log('fetching wes');
  const wes = yield ajax('https://api.github.com/users/wesbos');
  console.log(wes);

  console.log('fetching fat joe');
  const fatJoe = yield ajax('https://api.discogs.com/artists/51988');
  console.log(fatJoe);
}

const dataGen = steps();
dataGen.next(); // kick it off
```

```js
.then(data => dataGen.next(data))
```
+ Calling __next()__ here automatically sets up the next fetch
  + So, you could include something returned from the first fetch in the query to a subsequent fetch assured that the first request would have returned before the second is issued

#### 57 - Looping generators with for...of

```js
function* lyrics() {
  yield `But don't tell my heart`;
  yield `My achy breaky heart`;
  yield `I just don't think he'd understand`;
}

const achy = lyrics();

for (const line of achy) {  
  console.log(line);
}
```
+ __for...of loop__ allows iteration through a generator and doesn't require _.next()_

## Module 17 - Proxies


#### 58 - What are Proxies?

```js
const person = { personName: 'Wes', age: 100 };
const personProxy = new Proxy(person, {
  get(target, name) {
    return target[name].toUpperCase();
  },
  set(target, name, value) {
    if(typeof value === 'string') {
      target[name] = `${value.trim()} (✂️'d)`;
    }
  }
});
```
+ __Proxies__ allow us to jump in between and overwrite default operations
+ First parameter is the __target__
+ Second parameter is a custom __handler__ with __traps__
  + Good to note that the single-word method (_get()_, _set()_) is an example of the ES6 reduced syntax for methods on object literals demoed in video 33
  + Prior to ES6 this syntax was _get: function(target, name) {...}_

```js
personProxy.cool = "     hella spaces here man   "
console.log(personProxy.cool) // "HELLA SPACES HERE MAN (✂️'D)";
```
+ The first dot notation above is the equivalent of calling __set__ on the Proxy, which we __trap__ in our handler and trim
+ The second dot notation is the equivalent of calling __get__, which our __trap__ transforms to uppercase

#### 59 - Another Proxy Example

```js
const phoneHandler = {
  set(target, name, value) {
    target[name] = value.match(/[0-9]/g).join('');
  },
  get(target, name) {
    return target[name].replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
  }
}

const phoneNumbers = new Proxy({}, phoneHandler);
```
+ Standardizes phone number values

```js
const phoneNumbers = new Proxy({}, phoneHandler);
phoneNumbers.test = '344222-7522';
console.log(phoneNumbers.test) //"(344)-222-7522"
```
+ Starting the proxy from an empty object "target"
+ Passing in a __handler object__ with various __traps__ that override built-in methods

#### 59 - Using Proxies to combat silly errors

```js
const safeHandler = {
  set(target, name, value) {
    const likeKey = Object.keys(target).find(k => k.toLowerCase() === name.toLowerCase());

    if (!(name in target) && likeKey) {
      throw new Error(`Oops! Looks like like we already have a(n) ${name} property but with the case of ${likeKey}.`);
    }
    target[name] = value;
  }
};

const safety = new Proxy({ id: 100 }, safeHandler);

safety.ID = 200;
```

```js
const safeHandler = {
  set(target, name, value) {
    const likeKey = Object.keys(target).find(k => k.toLowerCase() === name.toLowerCase());
```
+ The handler, _safeHandler_, grabs the keys off the _target_ object and uses the _name_ parameter to access the key being used in the _set_ operation

```js
if (!(name in target) && likeKey) {
```
+ ___(name in target)___ is new to me. Checks if an object has a key

## Module 18 - Sets and Weak Sets


#### 61 - Sets

```js
const people = new Set();
people.add('Wes');
people.add('Snickers');
people.add('Kait');

console.log(people.size); // 3
people.delete('Wes') ;
people.clear();
```

+ New primitive. Like an array, but __no indexes__ and each item is unique

>Set objects are collections of values. You can iterate through the elements of a Set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

```js  
for (const person of people) {
    console.log(person);
  }
```
+ Iterate over a set with ___for...of___
+ __values()__ will return a _SetIterator_ which has the same API as a generator, so can iterate with ___.next()___

```js
const students = new Set(['Wes', 'Kara', 'Tony']);

const dogs = ['Snickers', 'Sunny'];
const dogSet = new Set(dogs);
```
+ Can create a Set by passing in an array

#### 62 - Understanding Sets with Brunch

```js
const brunch = new Set();
brunch.add('Wes');
brunch.add('Sarah');
brunch.add('Simone');
const line = brunch.values(); //Returns a generator
console.log(line.next().value); //Steps through the generator while logging the name at the current position, which is here Wes
console.log(line.next().value); // Sarah
console.log(brunch); //Set(3) {"Wes", "Sarah", "Simone"}
console.log(line); //SetIterator {"Simone"}
````
+ When you call __next()__ against a SetIterator the value at the current position __will remove itself__ (mutation by default, weird)

#### 63 - WeakSets

+ A __WeakSet can only ever contain objects__
+ Cannot loop over a weak set (no iterator)
+ Cannot use __clear()__

```js
let dog1 = { name: 'Snickers', age: 3 };
let dog2 = { name: 'Sunny', age: 1 };

const weakSauce = new WeakSet([dog1, dog2]);

console.log(weakSauce);
dog1 = null;
console.log(weakSauce); //After waiting a few seconds, the weak set should have been garbage collected
```

+ Weak sets clean themselves up through __garbage collection__
  + By setting _dog1_ to _null_ we've given the weak set a green light to __garbage collect__ and automatically delete that value
  + A __memory leak__ is when you reference something that should not be able to be referenced but hasn't yet been garbage collected
  + Hard to say exactly when garbage collection will occur because it varies between browsers and cannot be forced
  + This may be useful in the case of removing DOM nodes that are no longer needed

> The WeakSet is weak: References to objects in the collection are held weakly. If there is no other reference to an object stored in the WeakSet, they can be garbage collected. That also means that there is no list of current objects stored in the collection. WeakSets are not enumerable.

## Module 19 - Map and Weak Map


#### 64 - Maps
+ Just as __Sets__ are similar to arrays but with a twist, __Maps__ are similar to objects (but with a twist)

```js
const dogs = new Map();

dogs.set('Snickers', 3);
dogs.set('Sunny', 2);
dogs.set('Hugo', 10);

console.log(dogs.has('Snickers')); //true
console.log(dogs.get('Snickers')); //3
```
+ Simple API
  + _has()_, _get()_

```js
dogs.forEach((val, key) => console.log(val, key));

for (const [key, val] of dogs) {
  console.log(key, val);
}
```
+ Two ways to iterate: __forEach__ + __for...of__

```js
for (const [key, val] of dogs) {
```
+ Because each element in a Map returns an _array_ with the _key_ and _value_, we can use __destructuring__ signalled by the square brackets here to declare these as variables being pulled out of the array

#### 64 - Map Metadata with DOM Node Keys

__Use case__ here is __storing metadata about an object__, but avoiding putting the data on the object itself, which is a bit _dirty_ and means all that data is erased if the object is erased. The metadata here is how many times the button has been clicked

```js
const clickCounts = new Map();
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  clickCounts.set(button, 0);
  button.addEventListener('click', function() {
    const val = clickCounts.get(this);
    clickCounts.set(this, val + 1);
  });
});
```
+ The __keys on a Map can be objects__, in this case a DOM node
  + The enhanced feature over an object literal is that the __key isn't limited to being a string__

```js
clickCounts.set(button, 0);
button.addEventListener('click', function() {
  const val = clickCounts.get(this);
  clickCounts.set(this, val + 1);
```
+ __get()__ and __set()__ used this way still feels quite weird to me
+ Because _this_ refers to __both the DOM node__ registering the click event _and_ __the Map key__, it can be seen as an accurate identifier


#### 65 - WeakMap and Garbage Collection

```js
let dog1 = { name: 'Snickers' };
let dog2 = { name: 'Sunny' };

const strong = new Map();
const weak = new WeakMap();

strong.set(dog1, 'Snickers is the best!');
weak.set(dog2, 'Sunny is the 2nd best!');

dog1 = null;
dog2 = null;
```

+ The __WeakMap__ here allows the deleted _dog2_ variable to be __garbage collected__
  + This prevents a __memory leak__, where _dog2_ might be referenced even though it's been removed from our application. The "_strong_" __Map__, on the other hand, could expose the app to such a potential memory leak
  + Bos says WeakMap is useful when you __don't want to "babysit"__ what is included in your Map
  + https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap
  + How does the browser know that a given object or DOM node __has no references__ to it and can therefor be garbage collected?

## Module 20 - Async + Await Flow Control

Also a great resource:
https://developers.google.com/web/fundamentals/primers/async-functions

#### 67 - Async Await - Native Promises Review
Two models of native promises
+ Each use __then()__ + __catch()__

__fetch__
```js
fetch('https://api.github.com/users/wesbos').then(res => {
    return res.json();
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.error('OH NOO!!!!!!!');
    console.error(err);
})
```
+ _Fetch()_ is a native method that returns a promise
  + Using __console.error__ provides more of a stack trace

__getUserMedia__
```js
const video = document.querySelector('.handsome'); //<video controls class="handsome"></video>

navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
  video.srcObject = mediaStream;
  video.load();
  video.play();
}).catch(err => {
  console.log(err);
})
```

#### 68 - Async Await - Custom Promises Review
```js
function breathe(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  });
}

breathe(1000).then(res => {
  console.log(res);
  return breathe(500);
}).then(res => {
  console.log(res);
  return breathe(600);
}).catch(err => {
  console.error(err);
})
```
+ We can write a function that __returns a custom promise__
+ __reject__ will throw an error, which needs to be caught with __catch()__

#### 69 - All About Async + Await
Almost all the time, JS is __asynchronous__, meaning the execution of code is __not blocking__ other code from executing

__Promises and Async + Await__ allow a degree of __flow control__

```js
function breathe(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  });
}

async function go() {
  console.log(`Starting`);
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(300);
  console.log(res2);
  const res3 = await breathe(750);
  console.log(res3);
  const res4 = await breathe(900);
  console.log(res4);
  console.log('end');
}

go();
```
+ Within an __async__ function, we can use __await__ which allows a __promise__ to be _resolved_ or _rejected_ prior to moving on

#### 70 - Async + Await Error Handling
__Basic try/catch__
```js
async function go(firstName, lastName) {
  try {
    console.log(`Starting for ${firstName} ${lastName}`);
    const res = await breathe(1000);
    console.log(res);
    const res2 = await breathe(100);
    console.log(res2);
    console.log('end');
  } catch(err) {
    console.error(err);
  }
}
```
+ __Use case:__ You need to handle an error unique to this function
  + For instance, in a form

__Higher-order function for error handling__
```js
function breathe(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  });
}

function catchErrors(fn) {
  return function(...args){
    return fn(...args).catch((err) => {
      console.error(err);
    });
  }
}

async function go(firstName, lastName) {
  console.log(`Starting for ${firstName} ${lastName}`);
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(100);
  console.log(res2);
  console.log('end');
}

const wrappedFunction = catchErrors(go);

wrappedFunction('Joe', 'Winner');
```
+ __Use case:__ You need a general error handler that can be reused on various functions
+ The wrapped function has error handling "sprinkled onto it" by the __higher-order function__

```js
function catchErrors(fn) {
  return function(...args){
    return fn(...args).catch((err) => {
      console.error(err);
    });
  }
}
```
+ The first _...args_ is a __rest operator__ and the second _...args_ is a __spread operator__
  + This allows us to pass in any number of parameters to the wrapped function

#### 71 - Waiting on Multiple Promises
We want multiple fetches to go out into the world rather than waiting for each one to return before the next is issued. So, this would most likely be __bad__:
```js
async function go() {
  const p1 = await fetch('https://api.github.com/users/wesbos');
  const p2 = await fetch('https://api.github.com/users/stolinski');
```

__Method one__
```js
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
  const res = await Promise.all([p1, p2]);
  const dataPromises = res.map(r => r.json());
  const [wes, scott] = await Promise.all(dataPromises);
  console.log(wes, scott);
  // const people = await Promise.all(dataPromises); // Alternative if we don't know how many people being returned  
}
go();
```
+ Need two __await Promise.all__ when handling fetched data

```js
const [wes, scott] = await Promise.all(dataPromises);
```
+ __Destructing__ two immediately declared variables from the array returned by _Promise.all()_

__Method two__

```js
async function getData(names) {
  const promises = names.map(name => fetch(`https://api.github.com/users/${name}`).then(r => r.json()));
  const people = await Promise.all(promises);
  console.log(people);
}

getData(['wesbos', 'stolinski', 'darcyclarke']);
```
+ Can chain the _fetch()_ and _then()_ calls together
  + I like 👆

Related example from Jake Archibald:

```js
async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```
https://developers.google.com/web/fundamentals/primers/async-functions

#### 72 - Promisifying Callback Based Functions

```js
// navigator.geolocation.getCurrentPosition(function (pos) {
//   console.log('it worked!');
//   console.log(pos);
// }, function (err) {
//   console.log('it failed!');
//   console.log(err);
// });

function getCurrentPosition(...args) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(...args, resolve, reject);
  });
}

async function go() {
  console.log('starting');
  const pos = await getCurrentPosition();
  console.log(pos);
  console.log('finished');
}

go();
```
+ Allows us to make a callback-oriented API work on promises
+ 3rd party options also, including a built-in Node utility

## Module 21 - ES7, ES8 + Beyond

#### 73 - Class Properties
```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  barks = 0;

  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
    this.barks = this.barks + 1;
  }
}
```
 + Declaring _barks_ outside constructor is an example of a __class property__
 + Commonly used in __React__

 ```js
 class Mouse extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }

  state = { x: 0, y: 0 }
  ...
  }
  ```
  https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce


Needs this Babel transform
https://babeljs.io/docs/plugins/transform-class-properties/

#### 74 - padStart and padEnd
> The padStart() method pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length.

```js
"1".padStart(3, 0) // 001
```
+ Useful if trying to right align text to the longest string in a series

```js
const strings = ['short', 'medium size', 'this is really really long', 'this is really really really really really really long'];
const longestString = strings.sort(str => str.length).map(str => str.length)[0];

strings.forEach(str => console.log(str.padStart(longestString)));
```

#### 75 -  ES7 Array.includes() + Exponential Operator
__Array.includes()__
```js
['a', 'b', 'c'].includes('c') //true
```

__Exponential Operator__
```js
3 ** 3 //27
```

#### 76 - Function Arguments Trailing Comma
```js
const names = [
  'wes',
  'kait',
  'lux',
  'poppy',
];

const people = {
  wes: 'Cool',
  kait: 'Even Cooler!',
  lux: 'Coolest',
  poppy: 'Smallest',
  snickers: 'Bow wow',
}

function family(
  mom,
  dad,
  children,
  dogs,
) {

}
```
+ Just as with arrays and objects, function arguments can accept __trailing commas__
+ Rationale is that someone contributing will not have a line they're not really associated with come up as their edit just because they added a comma
+ Typically best to just add rule to __ESLint__ and __Prettier__

#### 77 - Object.entries() + Object.values()
```js
const inventory = {
  backpacks: 10,
  jeans: 23,
  hoodies: 4,
  shoes: 11
};

// Make a nav for the inventory
const nav = Object.keys(inventory).map(item => `<li>${item}</li>`).join('');
console.log(nav);

// tell us how many values we have
const totalInventory = Object.values(inventory).reduce((a, b) => a + b);
console.log(totalInventory);

// Print an inventory list with numbers
Object.entries(inventory).forEach(([key, val]) => {
  console.log(key, val);
});

for (const [key, val] of Object.entries(inventory)) {
  console.log(key);
  if (key === 'jeans') break;
}
```
+ __Object.values()__ is like the other side of _Object.keys()_
+ __Object.entries()__ returns each point in the object as a two-value array
+ Benefit of __for...of__ is the ability to __break__ out of it, which cannot be done in _map_ or _forEach_
