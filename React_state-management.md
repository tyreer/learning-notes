# State Management in React

## Kent C. Dodds


https://kentcdodds.com/blog/application-state-management-with-react


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