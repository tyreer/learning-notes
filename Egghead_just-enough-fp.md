# Notes on Just Enough Functional Programming in JavaScript

- Course by [Kyle Shevlin](https://egghead.io/instructors/kyle-shevlin)
- https://egghead.io/courses/just-enough-functional-programming-in-javascript
- [Repo with course examples](https://github.com/kyleshevlin/just-enough-fp-lessons)

## Higher-order functions

```js
// A higher order function is any function that does at least one of the following
//   1. Accepts a function as an argument
//   2. Returns a new function

// Receives a function as an argument
const withCount = fn => {
  let count = 0

  // Returns a new function
  return (...args) => {
    console.log(`Call count: ${++count}`)
    return fn(...args)
  }
}

const add = (x, y) => x + y

const countedAdd = withCount(add)
```

- Augment a passed in function
- Add a bit, while allowing the parameter function to execute when invoked
- `...args` allows any arguments passed in when invoked to be passed through


## Pure functions

- Given same input, will always return same value
- No side effects outside scope of function
- Not dependent on any values outside scope of function

```js
// Impure Function ex. 1 - Output not derived solely from inputs
const COST_OF_ITEM = 19
function cartTotal(quantity) {
  return COST_OF_ITEM * quantity
}

cartTotal(2) // 38

// While this function returns the same value each time it is called
// the result is not derived _only_ from its inputs, but depends on a global state
```


```js
// Impure Function ex. 2 - Same input, different output
function generateID() {
  return Math.floor(Math.random() * 10000)
}

function createUser(name, age) {
  return {
    id: generateID(),
    name,
    age
  }
}

// If this were a pure function, calling createUser with the same
// arguments would return the same user object. 
// The generateID function is impure, 
// and its use in createUser makes that function impure as well
```

```js
// Impure Function ex. 3 - Side Effects
let id = 0
function createFoodItem(name) {
  return {
    id: ++id,
    name
  }
}

// Not only does the function impurely return a different id
// if given the same name, it has the side effect of modifying
// state outside of the function. 
// Pure functions have no effect on outside state
```

```js
// Impure Function ex. 4 - Side Effects #2
function logger(message) {
  console.log(message)
}

// Side effects are not confined to the state of our application,
// they include affecting the outside world. In this case,
// we're affecting the state of our run-time environment, be that
// a Node server or a browser
```

## Immutable data

```js
class MutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {
    this.amount = Math.max(this.amount - value, 0)
    return this
  }
}

// Taking a drink from the mutable glass returns the same glass as before
// with the amount of content mutated to the correct amount.
// We can verify this by checking the references of the first glass and
// the glass returned by `takeDrink()` and see that they are the same.
const mg1 = new MutableGlass('water', 100)
const mg2 = mg1.takeDrink(20)
console.log(mg1.amount === 80 && mg1.amount === mg2.amount) // true
console.log(mg1 === mg2) // true

// Taking a drink from the immutable glass returns an entirely new glass,
// but with the correct content and amount of it in the glass.
class ImmutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {
    return new ImmutableGlass(this.content, Math.max(this.amount - value, 0))
  }
}

// We can verify this by checking the references and seeing that they are
// _not_ equal
const ig1 = new ImmutableGlass('water', 100)
const ig2 = ig1.takeDrink(20)
console.log(ig1.amount !== ig2.amount) // true
console.log(ig1 === ig2) // false
```

- Modifying state via immutable data structures = returning a _new_ data structure that clones the previous data structure and merges in the updated state 
- The glasses are an approachable example, but seems weird that the class instance doesn't retain state/data
  - I'd expect `ig1.amount` to be `80` after `ig1.takeDrink(20)`
  - But `ig1` being immutable means, by definition, that it won't change
  - Maybe the "metaphor" is just throwing me off. `ImmutableGlass` describes something very different than a real-world glass
  - Makes the concept easy to remember though. Would be a cool sci-fi object
- Suppose this is what Redux state changes are, and why we can time travel through each state change
  - Each state change has its own reference / unique data structure have their own 
- Also can see how this follows the expectations of a pure function
  - `ig1.takeDrink(20)` will always return the same value, whereas `mg1.takeDrink(20)` will differ each time as the amount decreases 

```js
const mg2 = mg1.takeDrink(20)
...
const ig2 = ig1.takeDrink(20)
```
- This is the step that seems contrived. 
  - Setting the returned value to `mg2` seems like logic I'd never intentionally do. You'd just run `mg1.takeDrink(20)` and know `mg1` is holding an updated state value in it's `amount` property.
  - Defining `ig2` has more merit in that we're tracking the new state, but it still seems like one piece of a broader puzzle
- Makes me realize that I don't know if it's sensible to _hold state in a class instance..._
  - I suppose I've only really managed state via React/Redux or Angular APIs

## Currying 

- Idea that you may not know all the arguments needed for function at the same time, but you can lock down one or more then execute the core logic later once the remaining arguments are provided
- In FP, all functions accept a _single argument_ 

```js
// Canonical Example - ES5
function add(x) {
  // x is stored in closure here and is available in the body of our
  // returned function awaiting the y value
  return function(y) {
    return x + y
  }
}

const addFive = add(5) // returns a function awaiting a second value
addFive(4) // 9
```
- __arity__ = how many arguments a function takes
  - 1 = unary, 2 = binary, etc.
- 1+ arguments = __multivariate__
  - Currying = refactoring multivariate functions into a series of unary functions
  
```js
const addIntegers = x => y => x + y
const addIntegersWithThree = addIntegers(3)
console.log(addIntegersWithThree(10)) //13
```
- ES2015 makes this very concise 

- Course comments point to this as setting up _partial application_

```js
const curriedMap = callback => array => array.map(callback)

const getSquares = curriedMap(number => number * number)

const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

console.log(getSquares(arr1)) // [1, 4, 9]
console.log(getSquares(arr2)) // [16, 25, 36]
```
- Nice demo where we can define the callback in one place and apply it via the second curried function (`getSquares`)