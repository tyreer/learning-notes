# Notes on Data Structures and Algorithms in Javascript

Course by __Kyle Shevlin__
https://egghead.io/courses/data-structures-and-algorithms-in-javascript


### Queue Data Structure in JavaScript
https://egghead.io/lessons/javascript-queue-data-structure-in-javascript

```js
function createQueue() {
  const queue = []

  return {
    enqueue(x) {
      queue.unshift(x)
    },
    dequeue() {
      if (queue.length === 0) {
        return undefined
      }
      return queue.pop()
    },
    peek() {
      if (queue.length === 0) {
        return undefined
      }
      return queue[queue.length - 1]
    },
    get length() {
      return queue.length
    },
    isEmpty() {
      return queue.length === 0
    }
  }
}


const q = createQueue()

q.enqueue('Make an egghead lesson')
q.enqueue('Help others learn')
q.enqueue('Be happy')

q.dequeue()
q.dequeue()
console.log(q.peek())

exports.createQueue = createQueue
```

+ FIFO (first-in-first-out)
  + Elements always enter for one side and exit the other in the same order


### Priority Queue JavaScript Data Structure
https://egghead.io/lessons/javascript-priority-queue-javascript-data-structure

```js
const { createQueue } = require('../queues/index')

function createPriorityQueue() {
  const highPriorityQueue = createQueue()
  const lowPriorityQueue = createQueue()

  return {
    enqueue(item, isHighPriority = false) {
      const queue = isHighPriority ? highPriorityQueue : lowPriorityQueue
      queue.enqueue(item)
    },
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue()
      }

      return lowPriorityQueue.dequeue()
    },
    peek() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek()
      }

      return lowPriorityQueue.peek()
    },
    get length() {
      return highPriorityQueue.length + lowPriorityQueue.length
    },
    isEmpty() {
      return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty()
    }
  }
}

const q = createPriorityQueue()

q.enqueue('A fix here')
q.enqueue('A bug there')
q.enqueue('A new feature')

q.dequeue()
q.enqueue('Emergency task!', true)
console.log(q.dequeue())
console.log(q.peek())

exports.createPriorityQueue = createPriorityQueue
```
+ `highPriorityQueue` + `lowPriorityQueue` are stored __in closure__
  + Created from previous lesson's __createQueue()__ method
+ Interesting to __create an API__ that itself is using a very similar API to that used in createQueue


### Stack Data Structure in JavaScript
https://egghead.io/lessons/javascript-stack-data-structure-in-javascript


```js
function createStack() {
  const stack = []

  return {
    push(x) {
      stack.push(x)
    },
    pop() {
      if (stack.length === 0) {
        return undefined
      }
      return stack.pop()
    },
    peek() {
      if (stack.length === 0) {
        return undefined
      }
      return stack[stack.length - 1]
    },
    get length() {
      return stack.length
    },
    isEmpty() {
      return stack.length === 0
    }
  }
}

const lowerBodyStack = createStack()

lowerBodyStack.push('underwear')
lowerBodyStack.push('pants')
lowerBodyStack.push('socks')
lowerBodyStack.push('shoes')

exports.createStack = createStack
```

+ __FIFO__ first in first out
  + Example of putting on then taking off clothes
  + __callstack__ in JS

+ `get` returns a dynamically computed value
  + Without `get` the length here would always be 0, because that's the length at the time of declaration


### Linked List Data Structure in JavaScript
  