# Algorithms and Data Structures Track
- https://teamtreehouse.com/tracks/algorithms-and-data-structures

## Course 1: Introduction to Algorithms
- https://teamtreehouse.com/library/introduction-to-algorithms

 ### Search algorithms

- Linear/sequential/simple search
- Binary search

 #### Algorithm guidelines

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

 #### Evaluating Linear Search

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

 #### Evaluating Binary Search

- Requires a _sorted, sequential_ set of data
  - In contrast to linear search 

 ### Time Complexity

- Order of growth: measure of how much of an increase occurs in the time it takes to execute an operation as the the input size increases

 #### Big-O notation
- O = order of magnitude of complexity 
- (n) = a function of the size
  - measures complexity as the input size grows
- _Upper bounds_ = Big-O measures how an algorithm performs in the worse case scenario
- Linear search: `O(n)`
- Binary search: `O(log n)`

 #### Constant and Logarithmic Time

- __Constant time__: `O(1)`
> The runtime for an algorithm is independent of the size of the data set
  - e.g. Reading a value at an index will always take the same amount of time

- __Logarithmic runtime__: `O(log n)` 
> The runtime for an algorithm increases _logarithmically_ as the size of the data set increases
  - Binary search `log2 of n + 1`
  - i.e. How many times do you need to divide `n` by 2 until you get 1?  
  - Also sometimes `O(ln n)`
  - Also can be referred to as _sublinear_

 #### Linear and Quadratic Time

- __Linear time__: `O(n)`
> The runtime of the algorithm is directly proportional to the size of the data set
  - Reading every item sequentially
  - Interesting that linear search will be more performant than binary search up to a certain value of `n` because binary search requires the additional runtime of applying a sorting algorithm

- __Quadratic time__: `O(n^2)`
>  The runtime of the algorithm increases by a factor of n squared as the size of the data set increases
  - Expensive computationally
  - e.g. making a `n x n` board grid that provides coordinates on a map (1,1), (1,2), (1,3), (2,1) ...

 #### Quasilinear time

- __Quasilinear time__: `O(n log n)`
> Given a data set of size n, the algorithm executes an n number of operations where each operation runs in log n (logarithmic) time
  - Basically linear times a bit
  - Common in sorting algorithms (e.g. merge sort)

 #### Exponential time

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

 #### Determining Complexity

- Each step in an algorithm has its own efficiency
- Binary search has both
  - linear efficiency (half length + access/compare value )
  - logarithmic efficiency (number of times it would need to repeat in the worst case)
- Can measure by average or worst-case performance

 ### Algorithms in Code

 #### Linear search in code

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

 ### Binary search in code

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

 #### Recursive functions

- Stopping condition in recursive function is often called a __base case__
- __Recursive depth__: the number of times a function calls itself
- Python isn't designed for recursion and has a max recursion depth
  - So an iterative algorithm is preferable in Python
- Swift handles recursion nicely
- Different languages will lend themselves to different solutions
- Recursion is often preferred to iterative algorithms in functional programming paradigms
  - I think because iterative loops require value mutation

 #### Space complexity

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

- I don't _think_ that my JS recursive binary search takes _logarithmic space_ because I'm passing through the same single array rather using  `slice` to make a new array
    - `dataArray === valuesToSearch` is `true` within the algorithm, so the reference identity of the array should be consistent
    - Good to think through though 

- __Tail call__: a call inside a function to the same function that occurs as the last operation
  - I believe my binary search algorithm has tail calls
- __Tail call optimization (TCO)__: a feature some languages have to save memory when running recursive functions
  - https://stackoverflow.com/questions/310974/what-is-tail-call-optimization/310980#310980

## Course 2: Introduction to Data Structures

### Array basics

> A data structure is a collection of values and the format they are stored. Data structures model the relationships between the values in the collection as well as the operations applied on the data stored in the structure.

- Homogenous vs. heterogenous structures
  - Java requires all values stored in an array to be of the same type
  - Python and JS allow any variety of values to be stored in an array  

- Python calls data structures that are basically arrays `lists`

- Arrays in most languages are _contiguous data structures_ = all values are stored next to one another in memory
  - Easy to retrieve data 
  - Runtime more likely to be constant

- _Non contiguous data structures_ = data structure stores a value and a reference to where the next value is 
  - To retrieve next value, must follow the reference (_pointer_) to the next block of memory
  - Adds runtime overhead

- In a heterogenous data structure (e.g. Python `list`): hard for compiler to allocate contiguous memory of the correct size because different types (e.g. `string`, `number`) can require different amounts of space in memory
  - Python gets around this by allocating contiguous memory blocks with pointer references to the values (pointers are always the same size)

- Only first memory block location needs to be held in memory
  - Because of contiguous memory, the index of an array can be used to determine which block of memory stores the desired value
  - Only the first index value is stored, while the other values can be calculated at runtime using an offset
  - Starting memory block + index
  - Error if attempting to access an index outside the array / range of contiguous memory blocks

### JavaScript Arrays

- Does not have an explicit `array` type, but an `Array` object, which is a _list like_ object
  - Has special constructor and accessor methods
  - _Prototype_ has traversal and mutation operations
- Heterogenous and non-contiguous data structures

> arrays are regular JavaScript objects with syntactic sugar

### Array Search, Insert, Delete

- __Search__ in an array is a _linear time_ operation
  - Most languages will do an iterative search because it's typically less expensive than both a sort and binary search together
- __Insert__ = _linear runtime_ because every item in the array needs to be shifted one index over 
    - e.g. Adding a value to the beginning of an array
- __Appending__ = _constant time_ because we're just adding a new index to the end 
  - _Ammortized constant space complexity_ = Python has a growth pattern for its list type (e.g. 4, 8, 16), so resizing the list when adding a single value may actually have a greater than constant space complexity
  - But it averages to constant
- __Delete__ = upper bound of `O(n)` or _linear runtime_ because in the worst case, every item in the array needs to be shifted one index over 
- In sum: 
  - arrays are good at accessing and reading values takes place in constant time
  - arrays aren't great at inserting or deleting, which take place in linear time

## Building a Linked List

- Linked lists are better than arrays at insertions and deletions
  - Good for a task that requires a lot of insertion and deletion and not much searching (which they're slow at) 
- __Head and tail nodes__
  - Memory typically only keeps a reference to the head node
  - Each node has a value and a pointer to the next value
  - Except _tail_, which has no pointer
- Singly- or doubly-linked lists 
    - Reference to only next node or also the one before
- Linked lists are _non-contiguous_ data structures
  - Each node is stored in a random memory location
  - Each node had a reference to the next node's location

```js
class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class SinglyLinkedList {
  constructor(head = null) {
    this.head = head;
    this.size = 0;
  }

  isEmpty() {
    return this.head === null;
  }

  getLength() {
    let current = this.head;
    let count = 0;

    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  add(value) {
    // Adds a new node to the head
    // Takes constant time: O(1)
    const nodeToAdd = new Node(value);
    nodeToAdd.nextNode = this.head;
    this.head = nodeToAdd;
  }

  search(target) {
    // Takes linear time: O(n)
    let current = this.head;
    let foundNode = null;

    while (current && foundNode === null) {
      if (current.value === target) {
        foundNode = current;
      }
      current = current.nextNode;
    }
    return foundNode;
  }
}

const myLinkedList = new SinglyLinkedList();
myLinkedList.add(1);
myLinkedList.add(2);
myLinkedList.add(3);

console.log(myLinkedList.getLength()); // 3
console.log(myLinkedList.search(2)); // Node { value: 2, nextNode: Node { value: 1, nextNode: null } }
```
- First stab implementation mainly reproducing the Python code example from Treehouse
- Interesting to compare with an object focused JS linked list: https://github.com/tyreer/learning-notes/blob/master/Egghead_data-structures-and-algorithms-in-js.md#linked-list-data-structure-in-javascript 

### Adding Nodes to a Linked List

- Actual __insert__ is anywhere in the list
  - Focusing now on only __prepend__ and __append__
  - To insert at the end of a list, need a reference to the tail

```js
  insert(value, index) {
    let position = index;
    let current = this.head;

    if (index === 0) {
      this.add(nodeToAdd);
    }

    if (index > 0) {
      const nodeToAdd = new Node(value);

      while (position > 1) {
        position--;
        current = current.nextNode;
      }

      let previous = current;
      let next = current.nextNode;

      previous.nextNode = nodeToAdd;
      nodeToAdd.nextNode = next;
    }
  }
  ```
  - `position > 1` is key stopping condition

  ## The Merge Sort Algorithm

  - Break array into single-element arrays
  - Sort and merge arrays at the same time to build back up the original array length / members
  - Goes recursively down the left half of the original array, then the right half, finally merging the two sorted halves
  - Overall, this results in fewer sort operations than sorting the list as a whole

  - Note that in the Python example, the `slice` makes the algorithm much more expensive
    - `O(kn log n)` where `k` is the number of items in the lists being split
    - This seems true of JS also [SO ref](https://stackoverflow.com/a/22615787)
    - A non recursive, iterative solution would avoid the `k` multiplier
    - Trade off is same as earlier lesson: mutating variables vs a more functional execution

```js
// Overall runtime will be split + merge: O(n log n)
function mergeSort(values) {
  // Base case or stopping condition that will end recursion
  if (values.length <= 1) {
    return values;
  }

  const [leftValues, rightValues] = split(values)

  // Recursively break down array
  return merge(mergeSort(leftValues), mergeSort(rightValues));
}

function split(values){
  // Takes overall O(log n) time
  const middleIndex = Math.floor(values.length / 2);
  const leftValues = values.slice(0, middleIndex);
  const rightValues = values.slice(middleIndex);

  return [leftValues, rightValues];
}

function merge(left, right) {
  // Runs in overall O(n) time
  // Linear space complexity because operations are not simultaneous 
  // and only the final merge will require the memory equivalent to the initial value 

  let resultArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

const myArray = [11, 2, 44, 4, 555, 6, 7];

console.log(mergeSort(myArray)) // [ 2, 4, 6, 7, 11, 44, 555 ];
```
- This is a mix of the Treehouse Python solution and this helpful reference: https://medium.com/javascript-in-plain-english/javascript-merge-sort-3205891ac060