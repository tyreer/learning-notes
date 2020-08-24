# Introduction to algorithms

- https://teamtreehouse.com/library/introduction-to-algorithms

## Search algorithms intro

- Linear/sequential/simple search
- Binary search

### Algorithm guidelines

- Clearly defined problem statement, input and output
  - What is input and what will output be
  - "Does 1–10 include 1 and 10"?

- Break down into steps that couldn't be further broken down
  - No subtasks
  - "Search until you find 10" can be interpreted in many different ways

- Algorithms must products a result

- Should complete and not run endless


Before rushing into a solution, first running through the algorithmic guidelines
- Breaking down a problem into a clear set of smaller problems
- Each of which can be defined in terms of an input and an output

### Evaluating Linear Search

- Correctness
  - Algorithm is correct every time and with every value
  - Mathematical proof through induction 

- Efficiency 
  - Balance of two measures: time and space
  - Very fast algorithm might not be helpful if it takes more memory than you have available

- Time complexity 
  - How long it takes to complete a job
  - A measure of the __running time__ of an algorithm
  - Efficiency of an algorithm measured by _time it takes_ in relation to the _size of the data set_

- Space complexity
  - Amount of memory taken up
  - A measure of the __storage__ taken up by an algorithm

- Evaluating efficiency can be done by taking the _worst case_ as an x-axis value
  - Worst-case because it can never perform worse than that
  - When the search target is the same as the max range of values, the data point reflects the size of the dataset as well as the algorithm's effort
  - Plot number of tries against number of values in the range (shortened to `n`)

### Evaluating Binary Search

- Requires a _sorted, sequential_ set of data
  - In contrast to linear search 

## Time Complexity

- Order of growth: measure of how much of an increase occurs in the time it takes to execute an operation as the the input size increases

### Big-O notation
- O = order of magnitude of complexity 
- (n) = a function of the size
  - measures complexity as the input size grows
- _Upper bounds_ = Big-O measures how an algorithm performs in the worse case scenario
- Linear search: `O(n)`
- Binary search: `O(log n)`

### Constant and Logarithmic Time

- __Constant time__: `O(1)`
> The runtime for an algorithm is independent of the size of the data set
  - e.g. Reading a value at an index will always take the same amount of time

- __Logarithmic runtime__: `O(log n)` 
> The runtime for an algorithm increases _logarithmically_ as the size of the data set increases
  - Binary search `log2 of n + 1`
  - i.e. How many times do you need to divide `n` by 2 until you get 1?  
  - Also sometimes `O(ln n)`
  - Also can be referred to as _sublinear_

### Linear and Quadratic Time

- __Linear time__: `O(n)`
> The runtime of the algorithm is directly proportional to the size of the data set
  - Reading every item sequentially
  - Interesting that linear search will be more performant than binary search up to a certain value of `n` because binary search requires the additional runtime of applying a sorting algorithm

- __Quadratic time__: `O(n^2)`
>  The runtime of the algorithm increases by a factor of n squared as the size of the data set increases
  - Expensive computationally
  - e.g. making a `n x n` board grid that provides coordinates on a map (1,1), (1,2), (1,3), (2,1) ...

### Quasilinear time

- __Quasilinear time__: `O(n log n)`
> Given a data set of size n, the algorithm executes an n number of operations where each operation runs in log n (logarithmic) time
  - Basically linear times a bit
  - Common in sorting algorithms (e.g. merge sort)

### Exponential time

- __Polynomial runtimes__: `O(n^k)` 
  - Worse case scenario is `n` to some fixed value `k`
  - Considered efficient 

- __Exponential runtimes__: `O(k^n)` 
  - As size of data set (`n`) increases, the runtime will increase to that power
  - Considered inefficient
  - Brute force algorithms

- __Combinatorial runtimes__: `O(n!)` 
- Traveling salesman
  - Factorial or combinatorial runtime 
  - `n!`, i.e. `n(n-1)(n-2)...(2)(1)`

### Determining Complexity

- Each step in an algorithm has its own efficiency
- Binary search has both
  - linear efficiency (half length + access/compare value )
  - logarithmic efficiency (number of times it would need to repeat in the worst case)
- Can measure by average or worst-case performance

## Algorithms in Code

### Linear search in code

- Not all code is an algorithm
- To be proper linear search must:
  - return same value given the same input
  - return a value every time executed
  - complete execution in a finite amount of time 

```js
function linearSearch(array, target) {
    for(let i = 0; i < array.length; i++){
        if(array[i] === target){
            return i;
        }
    }
    return -1;
}
```
- Treehouse example uses a `for-loop`

```js
function linearSearch(array, target) {
  let returnValue;
  array.forEach((item, index) => {
    if (item === target) {
      returnValue = index;
    }
  });
  return returnValue ? returnValue : -1;
}
```
- `forEach` is a pain to use here because you can't break out of it
  - Using worst-case efficiency this wouldn't affect things, but once average performance is taken into account, the `O(n)` efficiency here will be worse than either the `for-loop` or `findIndex`

```js
function linearSearch(array, target) {
    return array.findIndex(item => item === target)
}

let arrayOfValues = [1, 2, 3];

console.log(linearSearch(arrayOfValues, 2)); // 1
console.log(linearSearch(arrayOfValues, 10)); // -1
```
- Simplest via `findIndex` because the native method serves exactly this problem's input and output requirements
  - `findIndex` will also immediately return if the condition is found, saving the worse case

## Binary search in code

__Iterative binary search__

```js
function binarySearch(array, key) {
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (array[mid] === key) {
            return mid;
        }
        if (array[mid] < key) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```

- Treehouse algorithm

__Recursive binary search__

```js
function binarySearch(
  dataArray,
  target,
  startingIndex = 0,
  endingIndex = dataArray.length
) {
  const centerIndex = startingIndex + Math.floor((endingIndex - startingIndex) / 2);
  const middleValue = dataArray[centerIndex];
  const indexIsValid = centerIndex < dataArray.length && centerIndex > 0;

  if (middleValue === target) {
    return centerIndex;
  }

  if (!indexIsValid) {
    return -1;
  }

  if (middleValue > target) {
    return binarySearch(dataArray, target, startingIndex, centerIndex - 1);
  } else {
    return binarySearch(dataArray, target, centerIndex + 1, endingIndex);
  }
}

let valuesToSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(binarySearch(valuesToSearch, 1)); // 0
console.log(binarySearch(valuesToSearch, 3)); // 2
console.log(binarySearch(valuesToSearch, 6)); // 5
console.log(binarySearch(valuesToSearch, 10)); // 9
console.log(binarySearch(valuesToSearch, 11)); // -1
console.log(binarySearch(valuesToSearch, -10)); // -1
```
- My solution, Treehouse didn't provide a JS binary search. Think this does the trick
 

 ## Recursion and Space Complexity

### Recursive functions

- Stopping condition in recursive function is often called a __base case__
- __Recursive depth__: the number of times a function calls itself
- Python isn't designed for recursion and has a max recursion depth
  - So an iterative algorithm is preferable in Python
- Swift handles recursion nicely
- Different languages will lend themselves to different solutions
- Recursion is often preferred to iterative algorithms in functional programming paradigms
  - I think because iterative loops require value mutation

### Space complexity

- __Space complexity__: A measure of how much working storage, or extra storage, is needed as a  particular algorithm grows
  - Not concerned with the initial memory needed (i.e. my input is 10 vs 100)
  - Instead, space complexity measure the _additional storage_ needed as the algorithm runs and tries to find a solution
- In the iterative Python algorithm, the space complexity is constant (`O(1)`) because we only use a single list in memory and simply change the start and end values
    - As the algorithm runs it doesn't require additional memory to what it began with
- The recursive algorithm, on the other hand, creates a new list every time with a subset of values
  - Starting out with memory allocation of `n`
  - Each time the recursion occurs it will require `n/2`, `n/4`, etc. until the recursion hits a stopping condition
  - The recursive algorithm runs in _logarithmic space_ (`O(log n`))
  - In a language w/o TCO (like Java or Python), the recursive algorithm also takes _logarithmic space_
- In the Python example, both the iterative and recursive algorithms have the same time complexity, so the difference in their space complexity (constant vs. logarithmic) makes the iterative algorithms a better implementation 

- I don't _think_ that my JS recursive binary search takes _logarithmic space_ because I'm passing through the same single array rather using  `splice` to make a new array
    - `dataArray === valuesToSearch` is `true` within the algorithm, so the reference identity of the array should be consistent
    - Good to think through though 

- __Tail call__: a call inside a function to the same function that occurs as the last operation
  - I believe my binary search algorithm has tail calls
- __Tail call optimization (TCO)__: a feature some languages have to save memory when running recursive functions
  - https://stackoverflow.com/questions/310974/what-is-tail-call-optimization/310980#310980
