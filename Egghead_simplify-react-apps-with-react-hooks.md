# Notes on Simplify React Apps with React Hooks

- Course by Kent C. Dodds
- https://egghead.io/courses/simplify-react-apps-with-react-hooks
- [Repo with course examples](https://github.com/kentcdodds/react-github-profile/tree/egghead-2018/refactor-00)

## Handle Deep Object Comparison in React's useEffect hook with the useRef Hook

https://github.com/kentcdodds/react-github-profile/blob/egghead-2018/refactor-03/src/screens/user/components/query.js

```js
function Query({query, variables, normalize = data => data, children}) {

    const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loaded: false,
      fetching: false,
      data: null,
      error: null,
    },
  )
```

- Nice to see `useReducer` as a basic `setState` implementation
  - Course mentions a more full-featured custom hook https://github.com/suchipi/use-legacy-state

```js
  useEffect(() => {
    if (isEqual(previousInputs.current, [query, variables])) {
      return
    }
    setState({fetching: true})
    client
      .request(query, variables)
      .then(res =>
        setState({
          data: normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        }),
      )
      .catch(error =>
        setState({
          error,
          data: null,
          loaded: false,
          fetching: false,
        }),
      )
  })

  const previousInputs = useRef()
  useEffect(() => {
    previousInputs.current = [query, variables]
  })

  return children(state)
}
```

- Interesting to see `useRef` coordinated with `useEffect` in this way

## Safely setState on a Mounted React Component through the useEffect Hook

https://github.com/kentcdodds/react-github-profile/blob/egghead-2018/refactor-04/src/screens/user/components/query.js

```js
const mountedRef = useRef(false);
useEffect(() => {
  mountedRef.current = true;
  return () => (mountedRef.current = false);
}, []);
const safeSetState = (...args) => mountedRef.current && setState(...args);
```

- Empty dependency array allows this to only run on mount and unmount, providing the desired ref values
- Note that this is generally not how you want to solve this problem (async calls setting state on unmounted components)
  - Better solution is to cancel the the request to stop the promise
  - This is solving for a case where you're unable to cancel requests

## Extract Generic React Hook Code into Custom React Hooks

https://github.com/kentcdodds/react-github-profile/blob/egghead-2018/refactor-06/src/screens/user/components/query.js

```js
function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
}

function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);
  const safeSetState = (...args) => mountedRef.current && setState(...args);

  return [state, safeSetState];
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

- Can see how you'd build up a set of these and compose new hooks with existing ones

## Refactor a render Prop Component to a Custom React Hook

https://github.com/kentcdodds/react-github-profile/blob/egghead-2018/refactor-09/src/screens/user/components/query.js

```js
function useQuery({ query, variables, normalize = (data) => data }) {
  const [state, setState] = useSafeSetState({
    loaded: false,
    fetching: false,
    data: null,
    error: null,
  });

  useDeepCompareEffect(() => {
    setState({ fetching: true });
    client
      .request(query, variables)
      .then((res) =>
        setState({
          data: normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        })
      )
      .catch((error) =>
        setState({
          error,
          data: null,
          loaded: false,
          fetching: false,
        })
      );
  }, [query, variables]);

  return state;
}

const Query = ({ children, ...props }) => children(useQuery(props));

export default Query;
export { useQuery };
```

- Probably the most valuable lesson for me here. The Hook version is so much cleaner to use compared to the render-prop version's nesting
  - Good to note that both allow for sharing cross-cutting concerns
- Good demo of the "backward compatible" export of the render prop component via `children(useQuery(props))`

## Dynamically Import React Components with React.lazy and Suspense

```js
const Home = React.lazy(() => import("./screens/home"));
const User = React.lazy(() => import("./screens/user"));

...

<Suspense
  fallback={<LoadingMessagePage>Loading Application</LoadingMessagePage>}
>
  <Router>
    <Home path="/" />
    <User path="/:username" />
  </Router>
</Suspense>
```

- Route based here, but I imagine this could also work when applied to children components within a parent component

```js
const Home = loadable({
  loader: () => import("./screens/home"),
  loading: LoadingFallback,
});

const User = loadable({
  loader: () => import("./screens/user"),
  loading: LoadingFallback,
});

function App() {
  return (
    <ThemeProvider>
      <GitHubContext.Provider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            <Home path="/" />
            <User path="/:username" />
          </Router>
        </ErrorBoundary>
      </GitHubContext.Provider>
    </ThemeProvider>
  );
}
```

- Original implementation with `react-loadable` is also interesting https://github.com/jamiebuilds/react-loadable

## Preload React Components with the useEffect Hook

```js
function Home() {
  useEffect(() => {
    // preload the next page
    import('../user')
  }, [])

  ...
}
```

- This will load the `User` page as soon as `Home` is finished rendering
  - Relies on how Webpack works (I assume the dependency graph), to only include code that's imported/required
- In the case of this example, we're highly confident the user will go to the next page from the home page
  - Lazy loading allowed us to only load `Home` initially, but then as soon as home is rendered, proactively fetch/import the JS for `User` so there wouldn't be a lag when continuing from the `Home` to `User` page

## Other notes

```js
function useDeepCompareEffect(callback, inputs) {
  const cleanupRef = useRef();
  useEffect(() => {
    if (!isEqual(previousInputs, inputs)) {
      cleanupRef.current = callback();
    }
    return cleanupRef.current;
  });
  const previousInputs = usePrevious(inputs);
}
```

- Weird one because he doesn't talk about it in the Egghead course, but it's in the course repo
- This seems strange to me since the effect returns `cleanupRef.current`
  - That will always be either the actual callback function or `undefined`. I just don't understand the need for the ref. What benefit is it bringing?

```js
export function useDeepCompareEffect(callback, inputs) {
  const previousInputs = usePrevious(inputs);
  useEffect(() => {
    if (!isEqual(previousInputs, inputs)) {
      callback();
    }
  });
}
```

- How is this code less effective?

## Demo

A demo to recreate a bug similar to the issue explored in `Handle Deep Object Comparison in React's useEffect hook with the useRef Hook`: https://codesandbox.io/s/github/tyreer/hooks-learning

### What's the bug? (answer)

The object we're passing into both query components is created during render.

```js
<BrokeQuery
  query={{
    url: `https://api.punkapi.com/v2/beers/random`,
    init: {
      init: {
        method: "GET",
      },
    },
  }}
>
```

```js
const { fetching, data, error } = useQuery({
  url: `https://api.punkapi.com/v2/beers/random`,
  init: {
    method: "GET",
  },
});
```

`useEffect` takes a [dependency array](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects). If the values of the dependencies in that array do not change between renders, then `useEffect` will not run the function we provide it as its first argument.

```js
  useEffect(() => {
    ...
 }, [query, setState]);
```

The object we pass in as a dependency will be checked for _identity equality_. `query` === `query` will always return `false` since a new _reference identity_ is created with each object created during the `WorksGreat` and `DefinitelyBroke` renders.

"JS does not provide a mechanism for structural equality comparison of object values, only reference identity comparison." ([ref](https://github.com/getify/You-Dont-Know-JS/blob/e6854d74a96761f50243f76ee46fc09c005f0919/get-started/ch2))

`DefinitelyBroke` will create a new object and pass it to its `BrokeQuery` child every time it renders. Because each text input updates the component via `props`, every key stroke will cause `useEffect` to determine `query` !== `query` and a new random beer tagline will be fetched.

`WorksGreat` avoids this because the `useQuery` custom hook outsources its comparison logic to `useDeepCompareEffect`, which in turn uses Lodash's [isEqual](https://lodash.com/docs/4.17.15#isEqual) utility to determine _structural equality_. If the inner contents of the object passed to `useQuery` are same, then the effect function that fetches the random beer tagline will not be invoked.

An alternate quick, good fix would be to move the object outside the render scope, so the `query` prop isn't created with each new render.

```js
let queryObject = {
  url: `https://api.punkapi.com/v2/beers/random`,
  init: {
    init: {
      method: "GET",
    },
  },
};

const DefinitelyBroke = ({ textInput }) => {
  return (
    <section>
      <h2>Definitely Broke</h2>
      <BrokeQuery query={queryObject}>
```

The Kent C. Dodds course seems to be solving for a case where you didn't have this kind of control. Regardless, building a custom hook on top of `useEffect` was a good learning exercise, especially as it seems to be the direction React Hooks are intended to grow into:

> [useEffect is] a low-level building block. It’s an early time for Hooks so everybody uses low-level ones all the time, especially in tutorials. But in practice, it’s likely the community will start moving to higher-level Hooks as good APIs gain momentum.

https://overreacted.io/a-complete-guide-to-useeffect/
