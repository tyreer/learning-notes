# State Management in React

## Kent C. Dodds

### Application State Management with React

https://kentcdodds.com/blog/application-state-management-with-react

> “This is the reason that I only ever used redux on one project: I consistently see developers putting all of their state into redux. Not just global application state, but local state as well. This leads to a lot of problems, not the least of which is that when you're maintaining any state interaction, it involves interacting with reducers, action creators/types, and dispatch calls, which ultimately results in having to open many files and trace through the code in your head to figure out what's happening and what impact it has on the rest of the codebase.”

> “Having all your application state in a single object can also lead to other problems, even if you're not using Redux. When a React <Context.Provider> gets a new value, all the components that consume that value are updated and have to render, even if it's a function component that only cares about part of the data.”

```js
// src/count/count-context.js
import React from 'react'

const CountContext = React.createContext()

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}

export {CountProvider, useCount}
```

- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) returns the current context value of the nearest `<AnyNameContext.Provider>` above the calling component in the tree.

- Here, `useCount` is a custom hook that just adds an `undefined` check.
    - Nice that the boilerplate logic for that check is contained in the context setup file: `count-context.js`

- Similarly, `CountProvider` isolates the provider setup 

- `useMemo` seems to prevent any re-renders of the child tree so long as `count` hasn't changed
    - The `[count]` part of its return is its array of dependencies
    - This might be overkill here (or not?), but it models a way to manage the fact that "A component calling useContext will always re-render when the context value changes."
    - [Advised pattern](https://github.com/facebook/react/issues/15156#issuecomment-474590693) is to separate out multiple contexts if one if updating expensive children too often 


 ```js
 // src/count/page.js

import {CountProvider, useCount} from './count-context'

function Counter() {
  const [count, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const [count] = useCount()
  return <div>The current counter count is {count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default CountPage
```

- Nice and clean use of context components because the setup is isolated in the other file

### How to use React Context effectively

https://kentcdodds.com/blog/application-state-management-with-react

- Main point is to separate state and dispatch into own contexts

```js
// src/count-context.js
import React from 'react'
const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()
```

> "CountDispatchContext “the simplest way to avoid problems with context (especially when you start calling dispatch in effects) is to split up the state and dispatch in context.”

- Really [nice TypeScript model](https://codesandbox.io/s/bitter-night-i5mhj) of how the a custom hook API can be made that's easy to consume by components with need to the context

```tsx
// src/count-context.tsx

type Action = {type: 'increment'} | {type: 'decrement'}
type Dispatch = (action: Action) => void
type State = {count: number}
type CountProviderProps = {children: React.ReactNode}

const CountStateContext = React.createContext<State | undefined>(undefined)
const CountDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

// ... [reducer] ...

function CountProvider({children}: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  // ... same undefined check as above ...
}

export {CountProvider, useCountState, useCountDispatch}
```

```tsx
// src/index.tsx

import {CountProvider, useCountState, useCountDispatch} from './count-context'

function CountDisplay() {
  const {count} = useCountState()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const dispatch = useCountDispatch()
  return (
    <button onClick={() => dispatch({type: 'increment'})}>
      Increment count
    </button>
  )
}

function App() {
  return (
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  )
}

```

- `CountDisplay` and `Counter` have very easy custom hook API to access context
- `CountProvider` is doing the component composition


> “At this point, you reduxers are yelling: "Hey, where are the action creators?!" If you want to implement action creators that is fine by me, but I never liked action creators. I have always felt like they were an unnecessary abstraction. Also, if you are using TypeScript or Flow and have your actions well typed, then you should not need them. You can get autocomplete and inline type errors!”

- He's saying typing actions that are provideed to `React.useReducer` provides same benefits of Redux action creators

```js
type Action = {type: 'increment'} | {type: 'decrement'}
```