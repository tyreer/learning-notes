# TypeScript Docs

## (Basic Types)[https://www.typescriptlang.org/docs/handbook/basic-types.html]

> when using the --strictNullChecks flag, null and undefined are only assignable to any and their respective types (the one exception being that undefined is also assignable to void). This helps avoid many common errors. In cases where you want to pass in either a string or null or undefined, you can use the union type string | null | undefined.

> we encourage the use of --strictNullChecks when possible,

https://www.typescriptlang.org/docs/handbook/basic-types.html#null-and-undefined



## (React 'enthusiastic hello' tutorial)[https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/tutorials/React.md]

(Deprecated sample app code)[https://github.com/microsoft/TypeScript-React-Starter]

> In general, it'd be a good idea to write a few tests for onIncrement and onDecrement being triggered when their respective buttons are clicked. Give it a shot to get the hang of writing tests for your components.

> create-react-app comes with a lot of great stuff. Much of it is documented in the default README.md that was generated for our project, so give that a quick read.

> At some point you might need routing. There are several solutions, but react-router is probably the most popular for Redux projects, and is often used in conjunction with react-router-redux.

- Run example app
- Write Jest tests 


## (React and Webpack tutorial)[https://www.typescriptlang.org/docs/handbook/react-&-webpack.html]

 - Might be worth stepping through
  - CRA sets this up for you, but worth understanding how Webpack can be configured in case we need to eject


## Functions

### Overloads
    https://www.typescriptlang.org/docs/handbook/functions.html#overloads