# Notes on Michael Chan's React Holiday 2018

https://react.holiday/

from: https://twitter.com/chantastic



## Code Sandboxes:

+ [React Holiday 2018: Hooks useEffect + useState](https://codesandbox.io/s/p5z1747xq7)
    + My own dabbling messing with document title 
+ [React Holiday  2018: Final](https://codesandbox.io/s/lrl4lypjw9)
    + Fork of Chan's final Sandbox



## Highlight Examples

### react-cache + suspense = "concurrent React" (not async React anymore)

```js
import { unstable_createResource as createResource } from "react-cache";

let Resource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res =>
    res.json()
  )
);
```

```js
export function Detail({ pokemonId: id }) {
  let pokemon = Resource.read(id);
  ...
}
```

```js
import React, { Suspense } from "react";
import { Detail as PokemonDetail } from "./pokemon";
...
<Suspense
    maxDuration={1000}
    fallback={"Finding your Pokemon..."}
>
    <PokemonDetail pokemonId={selectedPokemonId} />
</Suspense>
```

+ Given a __maxDuration__, the __Suspense__ component will wait to display its fallback
  + This avoids the fallback flashing into view and gives control over the loading state

### React test fixtures Img component
+ [React test fixtures source](https://github.com/facebook/react/blob/v16.6.3/fixtures/unstable-async/suspense/src/components/UserPage.js?utm_source=React+Patterns+Newsletter&utm_campaign=9f008d75e6-EMAIL_CAMPAIGN_2018_11_30_09_15_COPY_01&utm_medium=email&utm_term=0_f97aebbc64-9f008d75e6-586767405#L105-L112)


```js
import { unstable_createResource as createResource } from "react-cache";
...
const ImageResource = createResource(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    })
);

function Img({ src, alt, ...rest }) {
  return (
    <img src={ImageResource.read(src)} alt={alt} {...rest} />
  );
}
```

```js
<React.Suspense
    maxDuration={500}
    fallback="image loading..."
>
    <Img
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name} image`}
    />
</React.Suspense>
```

### Jared Palmer's Platform Img component

+ [Jared Palmer's "The Platform" source](https://github.com/palmerhq/the-platform/blob/master/src/Img.tsx)
    + And a great [Code Sandbox demo](https://codesandbox.io/s/vo3zjoq90)

```js
import { Img } from 'the-platform';

<React.Suspense
    maxDuration={300}
    fallback={
        <img
            className="image preview"
            src="https://images.unsplash.com/photo-1538691189662-1bee2dbf4e4c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=300&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=30d15c252286297006cb7706e364c7d6"
        />
    }
>
    <Img
        className="image loaded"
        src="https://images.unsplash.com/photo-1538691189662-1bee2dbf4e4c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=3000&h=2000&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=30d15c252286297006cb7706e364c7d6"
    />
</React.Suspense>
```

```css
.preview {
  filter: blur(2vw);
}
```
+ __fallback__ is same image at 300x200 (as opposed to 3000x2000) + with a blur
    + Fallback will only show if the main image takes longer than 300ms to load

### useEffect() + useContext() hooks

```js
import React, { Suspense, useState, useEffect } from "react";
...
function useWindowWidth(initialWidth = window.innerWidth) {
  let [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    let handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return function() {
      window.removeEventListener("resize", handleResize);
    };
  });

  return width;
}
```


```js
import WindowWidthContext from "./window-width-context";
...
function App() {
  let width = useWindowWidth();

  return (
    <WindowWidthContext.Provider value={width}>
        ...(whole app)
    </WindowWidthContext.Provider>
```

```js
import { createContext } from "react";

let WindowWidthContext = createContext();

export default WindowWidthContext;
```
+ Super simple export

```js
import React, { useContext } from "react";
import WindowWidthContext from "./window-width-context";
...
export function Detail({ pokemonId: id }) {
  let pokemon = Resource.read(id);
  let width = useContext(WindowWidthContext);
```
+ This _Detail_ component just uses the __useContext()__ hook and passes in the context that's exported in the super simple file above
+ The __WindowWidthContext.Provider__ wraps the instantiation of this component, so _width_ is passed in

### Error Boundary example

```js
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <div>Something went wrong</div>
      );
    }

    return this.props.children;
  }
}
```

```js
import ErrorBoundary from "./error-boundary";
...
<ErrorBoundary fallback={<PokemonListError />}>
... (basically entire app) ...
</ErrorBoundary>
```

+ Interesting lifecyles methods:
    + __componentDidCatch()__
    + __getDerivedStateFromError()__