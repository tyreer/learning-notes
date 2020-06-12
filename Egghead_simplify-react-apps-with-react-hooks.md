# Notes on Simplify React Apps with React Hooks

https://egghead.io/courses/simplify-react-apps-with-react-hooks

[Repo](https://github.com/kentcdodds/react-github-profile/tree/egghead-2018/refactor-00)

## Handle Deep Object Comparison in React's useEffect hook with the useRef Hook

https://github.com/kentcdodds/react-github-profile/blob/egghead-2018/refactor-03/src/screens/user/components/query.js

```js
function Query({query, variables, normalize = data => data, children}) {
...

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

### Demo

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
