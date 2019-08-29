# Notes on JavaScript: The Good Parts

Notes from the [Douglas Crockford book](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/) published by O'Reilly

## Ch. 4 Functions

__Constructor Invocation Pattern__

```js
const MyConstructorFunction = function(coolParam){
    this.constructorProperty = coolParam;
}

const instance = new MyConstructorFunction("passed in param")
```

- __Not recommended__, just pointing out the _uppercase_ naming convention for constructor functions

__Closure__

- Inner functions get access to the parameters and variables of the functions they are defined within (37)

```js
const quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    }
}

// An instance of quo

const myQuo = quo("wow");
console.log(myQuo.get_status()) // "wow"
```

- Here the inner function, `get_status`, has a longer lifespan than the outer function
  - Functions have access to the context in which they were created after the execution of the function that had created the context in the first place has returned

__Modules__

- Functions and closures help make modules.
  - "A module is a function or object that presents an interface but that hides its state and implementation" (40)
  - Removes need for global variables

```js
var deentityify = (function(stringParam) {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    return function (stringParam) {
        return stringParam.replace(/&([^&;]+);/g,
        (a,b) => {
            var r = entity[b];
            return typeof r === 'string' ? r : a;
        });
    };
})();

console.log(deentityify('&lt;&quot;'));
```

- `var` variables are _function-scoped_, so the IFFE pattern prevents `entity` for being available in the global scope
- Only the `deentityify` function has access to `entity` 
- I think block scope via `const` + `let` achieves the same thing w/o the immediate invocation 
- The module patten uses function scope and closure "to create relationships that are binding and private" (41)
- "The general pattern of a module is a function that defines private variables and functions; creates privileged functions which, through closure, will have access to the private variables and functions; and that returns the privileged functions or stores them in an accessible place."
- Promotes good design practices like information hiding, effective in encapsulating applications and other singletons

```js
const serial_maker = function () {
    let prefix = '';
    let sequence = 0;

    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_sequence: function (s) {
            sequence = s;
        },
        generate: function () {
            const result = prefix + sequence;
            sequence += 1;
            return result;
        }
    };
};

const mySerialNumberGenerator = serial_maker();
mySerialNumberGenerator.set_prefix('COOL');
mySerialNumberGenerator.set_sequence(69);
const uniqueSerial  = mySerialNumberGenerator.generate();
const uniqueSerial2  = mySerialNumberGenerator.generate();

console.log(uniqueSerial) // COOL69
console.log(uniqueSerial2) // COOL70
```

- `mySerialNumberGenerator` is simply a collection of privileged functions capable of specific powers to use of modify the secret state (42)

__Memoization__

- "Functions can use objects to remember the results of previous operations, making it possible to avoid unnecessary work." (44)

## Ch. 5 Inheritance

- In `classical languages` like Java, objects are instances of classes
  - JavaScript is a `prototypal language`, so objects inherit directly from other objects

__Pseudoclassical__

- Serious design error in JS is using a constructor function without `new`
 - Without `new`, `this` in the constructor function will be bound to the global object = very bad

__Functional inheritance pattern__

```js
const mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };

    that.says = function () {
        return spec.saying || ''
    };

    return that;
};

const cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    const that = mammal(spec);

    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };

    return that;
}

const myCat = cat({name: 'Pumpkin'})
const myCatDog = cat({name: 'Pumpkin', saying: 'ruff'})

console.log(myCat.get_name()) //meow Pumpkin meow
console.log(myCatDog.get_name()) // ruff Pumpkin ruff
```

- __Functional pattern__ is flexible, requires less effort than _pseudoclassical_ (using `new`), and gives better encapsulation and information hiding. (55)
- If all of the state of an object is private, then the object is tamper-proof
- Object in the functional style above, if all methods make no use of `this` or `that`, then the object is _durable_
  - Durable object = collection of functions that act as capabilities and cannot be compromised

## Ch. 6 Arrays

- " An array is a linear allocation of memory in which elements are accessed by integers that are used to compute offsets. Arrays can ve very fast data structures. Unfortunately, JavaScript does not have anything like this kind of array." (58)
 - Instead, arrays in JS are objects with array-like characteristics

- In most languages, array elements need to be of same type, but JS allows mixture of values

- When using __splice()__, every property after the deleted property must be removed and reinserted with a new key, so large arrays might take time.
  - But I typically try to avoid mutating an array anyway and prefer __slice()__ 

- Rule to decide between array or object: property names === small sequential integers ? array : object k(61)

__Dimensions__

- JS only allows arrays of one dimension, but allows arrays of arrays (like most C languages)

```js
const matrix = [
    [0,1,2],
    [3,4,5]
];

matrix[1][2] //5
```

## Ch. 7 Regular Expressions

- Regular expressions usually have a significant performance advantage over equivalent string operations in JS (65)

- Sloppy regular expressions are a popular source of security exploits. Easier to write sloppy regex than rigorous (68)

- Try to keep regular expressions simple.
 - Complicated RegEx are likely to have portability problems between JS language processor (not sure if true still today?)
 - Nested RegEx can have horrible performance

- `(?: ___ )?` = optional noncapturing group. Usually better to use than the less-ugly capturing groups because capturing has a performance penalty (70)

- Prefer `regular expression literals` (`/xyz/g`) to the `RegExp() constructor`
)

### parse_url example

```js
const parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

const url = "http://www.ora.com:80/goodparts?q#fragment";

const result = parse_url.exec(url);
```

__Capturing group__ = value is added to results array

- `/^` + `$/`
  - Opening and closing anchors: 

- `(?:([A-Za-z]+):)?` 
  - Optional noncapturing group on outside: `(?: ___ )?`
  - Last `?` = repeat _zero or more times_
  - Capturing group on inside = any letter, `+` = _one or more times_, followed by a colon : `([A-Za-z]+):)`

- `(\/{0,3})`
  - `/` 0–3 times
  - `\` is to escape the `/` so it's not interpreted as the end of the regular expression literal

- `([0-9.\-A-Za-z]+)`
  - One or more digits, `.`, `-`, or letters
  - `\` is escaping the `-` so it's not interpreted as a range hyphen

- `(?::(\d+))?`
  - Optional noncapturing group on outside: `(?:: ___ )?`
  - The colon starts the patten, but _is not captured_ so it's not in the results array
  - What is captured is any digit one or more times: `(\d+)`
  - Could move colon inside capturing group if you wanted to capture syntax: `(?:(:\d+))?`

- `(?:\/([^?#]*))?`
  - Optional noncapturing group on outside: `(?:\/ ___ )?` excludes the `/` from capture
  - Internal capturing group has a _character class_ where `^` = all characters except ...
  - `([^?#]*)` = all characters except `?` + `#` 
  - `*` = _zero or more times_

- `(?:\?([^#]*))?`
  - Optional noncapturing group on outside: `(?:\? ___ )?` excludes the `?` from capture
  - Internal capturing group 0+ characters that aren't `#`: `([^#]*))`

- `(?:#(.*))?`
  - Optional noncapturing group on outside: `(?:# ___ )?` excludes the `#` from capture
  - Internal capturing group where `.` = _any non-line-ending character_: `(.*)`

### parse_number example

```js
const parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

parse_number.test('1') // true
parse_number.test('number')  // false
parse_number.test('98.6') // true
parse_number.test('98.6.2')  // false
parse_number.test('98.353434E-67') // true
parse_number.test('98.35533D-67')  // false
parse_number.test('98.35533E')  // false
```

- `/^` + `$/i`
    - Anchors test every character in string
    - If only `/^`, would only check if strings _start_ with a number
    - In only `$/`, would only check if strings _end_ with a number
    - No anchors just tests if there is a number anywhere in the string
    - `i` is a __flag__ that causes case to be ignored (insensitive e vs E)

- `-?` 
    - Negative symbol, which is optional because of `?`

- `\d+`
    - `\d` = any digit (same as `[0-9]`)
    - `+` = one or more times

- `(?:\.\d*)?`
    - `(?: ___ )?` = Optional noncapturing group
    - `\.` = Single decimal 
    - `\d*` = Followed by zero or more digits

- `(?:e[+\-]?\d+)?`
    - Optional noncapturing group
    - `e` = letter _e_
    - `[+\-]?` = optional negative or positive symbol for the exponent 
    - `\d+` = any digit one or more times
