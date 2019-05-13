# Notes on Data Structures and Algorithms in Javascript

Course by __Kyle Shevlin__
https://egghead.io/courses/data-structures-and-algorithms-in-javascript

CodeSandbox code samples: https://codesandbox.io/s/github/eggheadio-projects/intro-to-data-structures-and-algorithms/tree/master/


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
  
>A linked list is a collection of items where each item points to the next one in the list. Because of this structure, linked lists are very slow when searching for an item at a particular index. An array, by comparison, has quick gets when searching for an index, but a linked list must start at the beginning, often called the "head", and loop through each item's next property until we arrive at the item. 

https://medium.com/basecs/whats-a-linked-list-anyway-part-1-d8b7e6508b9d
+ array = __linear data structure__
+ linked list = __non-linear data structure__

https://medium.freecodecamp.org/data-structures-101-linked-lists-254c82cf5883
> With linked lists, our primary concerns are with fast insertions and deletions, which are more performant over arrays.
>It may come to mind that unshift for arrays is the same. No, because with unshift all members of the collection must be moved one index over.
>The main advantage of linked lists is fast insertions and deletions without rearranging items or reallocation of space. When we use an array, the memory space is contiguous, meaning we keep it all together. With linked lists, we can have memory spaces all over the place, non-contiguous storage through the use of references. For arrays, that locality of references means that arrays have better caching of values for faster lookup. With linked lists, caching is not optimized and access time takes longer.

```js
function createNode(value) {
  return {
    value,
    next: null
  }
}
```
+ Single node in a linked list
 + Need `next` to point to next node
 + A `next` value of `null` means it's the `tail` (or final node)

```js
function createLinkedList() {
  return {
    head: null,
    tail: null,
    length: 0,

    push(value) {
      const node = createNode(value)

      if (this.head === null) {
        this.head = node
        this.tail = node
        this.length++
        return node
      }

      this.tail.next = node
      this.tail = node
      this.length++

      return node
    },
    
    ...
```

### JavaScript Graph Data Structure

+ __edges__ are relationships
+ __directed__ means one-way
+ __undirected__ means both ways

>Graphs are a powerful and versatile data structure that easily allow you to represent real life relationships between different types of data (nodes).
https://medium.freecodecamp.org/a-gentle-introduction-to-data-structures-how-graphs-work-a223d9ef8837

+ Facebook uses this data structure to store relationships like friends
  + TAO: The power of the graph https://www.facebook.com/notes/facebook-engineering/tao-the-power-of-the-graph/10151525983993920/

```js
function createNode(key) {
  const children = []

  return {
    key,
    children,
    addChild(node) {
      children.push(node)
    }
  }
}
```
+ A sensible way to structure a node in a graph
  + Interesting to note how different each key on the node object is
  + `key` is just a string
  + `children` is an array
  + `addChild` is a function 

```js
function createGraph(directed = false) {
  const nodes = []
  const edges = []

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find(n => n.key === key)
    },

    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key)
      const node2 = this.getNode(node2Key)

      node1.addChild(node2)

      if (!directed) {
        node2.addChild(node1)
      }

      edges.push(`${node1Key}${node2Key}`)
    },
```

### Breadth First JavaScript Search Algorithm for Graphs

>Breadth first search is a graph search algorithm that starts at one node and visits neighboring nodes as widely as possible before going further down any other path.
 + This is a common __tree traversal strategy__

https://medium.com/basecs/breaking-down-breadth-first-search-cebe696709d9
> Breadth-first search involves search through a tree one level at a time.
> We traverse through one entire level of children nodes first, before moving on to traverse through the grandchildren nodes. And we traverse through an entire level of grandchildren nodes before going on to traverse through great-grandchildren nodes.

```js
bfs(startingNodeKey, visitFn) {
  const startingNode = this.getNode(startingNodeKey)
  const visitedHash = nodes.reduce((acc, cur) => {
    acc[cur.key] = false
    return acc
  }, {})
  const queue = createQueue()
  queue.enqueue(startingNode)

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue()

    if (!visitedHash[currentNode.key]) {
      visitFn(currentNode)
      visitedHash[currentNode.key] = true
    }

    currentNode.children.forEach(node => {
      if (!visitedHash[node.key]) {
        queue.enqueue(node)
      }
    })
  }
},
```
+ Method fot visiting every node in the graph

```js
const visitedHash = nodes.reduce((acc, cur) => {
  acc[cur.key] = false
  return acc
}, {})
```
+ Interesting use of `reduce()` to build an object

```js
const graph = createGraph(true)
const nodes = ['a', 'b', 'c', 'd', 'e', 'f']
const edges = [
  ['a', 'b'],
  ['a', 'e'],
  ['a', 'f'],
  ['b', 'd'],
  ['b', 'e'],
  ['c', 'b'],
  ['d', 'c'],
  ['d', 'e']
]

nodes.forEach(node => {
  graph.addNode(node)
})

edges.forEach(nodes => {
  graph.addEdge(...nodes)
})

graph.bfs('a', node => {
  console.log(node.key)
})
```

+ Note how parameters of `bfs()` line up to its signature: `bfs(startingNodeKey, visitFn)`
+ Interesting to see nodes and edges illustrated like this

### Write a Depth First Search Algorithm for Graphs in JavaScript

https://medium.com/basecs/demystifying-depth-first-search-a7c14cccf056
+ Another common __tree traversal strategy__

```js
dfs(startingNodeKey, visitFn) {
  const startingNode = this.getNode(startingNodeKey)
  const visitedHash = nodes.reduce((acc, cur) => {
    acc[cur.key] = false
    return acc
  }, {})

  function explore(node) {
    if (visitedHash[node.key]) {
      return
    }

    visitFn(node)
    visitedHash[node.key] = true

    node.children.forEach(child => {
      explore(child)
    })
  }

  explore(startingNode)
}
```
+ Goes down through each `child` of a given node before moving onto the next node (which ultimately is a child of the `startingNode`)