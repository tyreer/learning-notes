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

> "CountDispatchContext: “the simplest way to avoid problems with context (especially when you start calling dispatch in effects) is to split up the state and dispatch in context.”

- Key for me is that the `useReducer` hook allows you to destructure both the `action` and `dispatch` values:

```js
const [state, dispatch] = React.useReducer(countReducer, {count: 0})
```

- These then get passed into their respective context providers:

```js
return (
  <CountStateContext.Provider value={state}>
    <CountDispatchContext.Provider value={dispatch}>
      {children}
    </CountDispatchContext.Provider>
  </CountStateContext.Provider>
)
```

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

- He's saying typing actions that are provided to `React.useReducer` provides same benefits of Redux action creators

```js
type Action = {type: 'increment'} | {type: 'decrement'}
```

## Apollo 

- Promise with Apollo Client is that you can access and update local and remote data with one tool.
- Somewhat interesting to look at a Code Sandbox like [this one](https://codesandbox.io/s/eloquent-johnson-fym98) and realize they're using the Apollo client solely to manage local state, w/o any remote data access. 
- Costs: Apollo client set up + GraphQL learning curve.
  - Need a team/org buy-in on GraphQL as nicely articulated in the Circle Engineering post below:

> "On the Circle 🛠 team, we know that our future stack includes GraphQL. In fact, in the ideal scenario, we would have a company-wide data graph at some point and access and mutate data consistently through GraphQL. However, in the short-term, we were simply looking for a low-friction way to introduce GraphQL to a piece of the stack and allow developers to wrap their heads around this technology in a low-stress way."

- Once you have that commitment to using GraphQL and accepting related learning curves, Apollo is an easy sell:

> "Our teams report that Apollo has become the library of choice when building a React application that uses GraphQL to access data from a back-end service. Although the Apollo project also provides a server framework and a GraphQL gateway, the Apollo client gets our attention because it simplifies the problem of binding UI components to data served by any GraphQL backend. Put simply, this means less code needs to be written than using REST backends and redux."
 
 - [ThoughtWorks Technology Radar, April 2019](https://www.thoughtworks.com/radar/languages-and-frameworks/apollo)


### Local State Management Docs

- https://www.apollographql.com/docs/react/data/local-state/
- https://www.apollographql.com/docs/tutorial/local-state/

Apollo cache = Redux store

- Both are just local application state maintained by the JS running the app in browsers
- Both need some technique to persist their data from the session

> "When you're using Apollo Client to work with local state, your Apollo cache becomes the single source of truth for all of your local and remote data."

> "We recommend managing local state in the Apollo cache instead of bringing in another state management library like Redux so the Apollo cache can be a single source of truth."

### Circle Engineering Blog Post

https://engineering.circle.com/https-medium-com-mattdionis-move-over-redux-apollo-client-as-a-state-management-solution-1f9325f96cdd

" in the short-term, we were simply looking for a low-friction way to introduce GraphQL to a piece of the stack and allow developers to wrap their heads around this technology in a low-stress way. GraphQL as a client-side state management solution using libraries such as apollo-client felt like the perfect way to get started."

- https://codesandbox.io/s/eloquent-johnson-fym98