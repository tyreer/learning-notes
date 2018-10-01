#### Section 5: Styling React Components

__63. Setting Class Names Dynamically__

```js
const style = {
  color: "green",
}

const divClassName = ['App'];

if(this.state.isExpanded) {
  ...
  style.color = 'red'
  divClassName.push('App--is-expanded');
}

return (
  <div className={divClassName.join(' ')}>
  <button style= {style}>Switch Name</button>
)
```
+ Two options for dynamically modifying styles
  + Inline style where style object itself is modified
  + Adding CSS classes

__64. Adding and Using Radium__
```js
import Radium from 'radium';
...
const style = {
  color: 'green',
  ':hover': {
    background: 'green',
    color: 'white',
  }
}

if(this.state.isExpanded) {
  style.color = 'red';
  style[':hover'] = {
    background: 'red',
    color: 'white',
  }
}
...
export default Radium(App);
```
+ __Pseudo-selectors__ with Radium
+ __Inline styles__ are __scoped to the individual component__

__65. Using Radium for Media Queries__

+ __Radium__ allows scoped styles and pseudo-selectors + media queries

```js
const Person = (props) => {
  const style= {
    '@media (min-width: 600px)': {
      color: 'white'
    }
  }

  return (
    <div className="Person" style={style}>
    ...
  )
}
```
+ Can have classes and inline styles
+ Wrap root app with _<StyleRoot>_ to allow media queries

__66. Enabling & Using CSS Modules__

Main concept with __CSS Modules__ is that Webpack exports classes with hashed names to make __classes scoped to the component that imports__ the styles

```js
import classes from './Person.css';

const Person = (props) => {
  return (
    <div className={classes.Person}>
      ...
    </div>
  )
}
```
To enable CSS Modules, we needed to __eject__ from create-react-app and modify the WebPack config files:

In webpack.config.dev.js:

```js
test: /\.css$/,
...
options: {
  importLoaders: 1,
  modules: true,
  localIdentName: '[name]__[local]__[hash:base64:5]'
},
```

```js
modules: true,
localIdentName: '[name]__[local]__[hash:base64:5]'
```
+ Adding these also to webpack.config.prod.js

__73. Finding Logical Errors by using Dev Tools & Sourcemaps__

+ Sources panel then just __debugger and hover__ to get loads of what would otherwise be console.logs
+ Source maps allow dev tools to recreate your original code, even though that's not the code that the browser recieves or runs on.
  + Kinda wild

__75. Using Error Boundaries (React 16+)__
+ Only displays error component in production
+ Most useful when you know something might fail, such as a fetch to an external endpoint
+ __Boundary__ part because other components outside the boundary can continue to function, rather than the entire app crashing.


```js
 <SickErrorBoundary>
      <div className={classes.Person}>
        <h1 onClick={props.addSymbol}>Hi my name is {props.name}{props.symbol}</h1>
        <input type="text" onChange={props.handleInputChange} value={props.name} />
        <p onClick={props.deletePerson}>Delete</p>
      </div>
    </SickErrorBoundary>
  ```

  ```js
  class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error })
    }

    render() {
        if (this.state.hasError) {
            return (
                <h1>{this.state.errorMessage}</h1>
            )   
        } else {
            return this.props.children;
        }
    }
}
```

#### Section: 7 Diving Deeper into Components & React Internals

+ __Higher or container components__ can be thought of as pages or the root app component
  + Components of mostly children components
  + Their render method should be lean and not have much JSX

__82. Understanding the Component Lifecycle__

+ __componentWillMount__ is largely legacy. Probably won't be using.
+ __componentDidMount__ is where we'd make a fetch. He says it's not a place to set state, but clearly you do set state to integrate fetched data.

__84. Component Lifecycle in Action__

+ Older code snippets may initialize state inside the __constructor__, but it may be considered a more standard modern practice to initialize state via __property initializers__
  + https://www.fullstackreact.com/articles/use-property-initializers-for-cleaner-react-components/

+ Interesting demo showing that __children components render before componentDidMount__ is triggered, which makes sense since a component mounting would entail thatthe DOM elements have all rendered.

__89. Performance Gains With Pure Components__ 

+ options > more tools > rendering > paint flashing

```js
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.people !== this.state.people ||
      nextState.isExpanded !== this.state.isExpanded
    );
  }
  ```
  + Returning boolean to determine if a render is triggered based on previous and current props
    + This is a bit of a contrived example though, since simply doing a shallow difference check across state and props is what __PureComponent__ 

> The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.

+ Suggestion is to use PureComponents sparingly but strategically. 
  + If used all the time, then a parent PureComponent will ensure its children have no need to render, but if those children are themselves pure components, then they'll perform a shallow diff against all their props and state unecessarily, which could add up to a performance hit
  + Suggestion then is to __use PureComponent on select container components__ to prevent many children from updating unecessarily

```js
  class Persons extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Stupid condition, but shows how you could prevent updates based on a partic
    // Holds onto the state change in App, but does not rerender until condition in this lifecycle hook is met
    return nextProps.peopleList.length !== this.props.peopleList.length;
  }
```
+ Because the child _<Person>_ component lifts state up to _<App>_, the state changes are made, but the components will not update until the condition above is satisfied. 
  + Could imagine something similar being useful, maybe? Like the only thing to acutually update the UI and DOM is whatever satisfies the condition in _shouldComponentUpdate_, but other interactions are updating state w/o rerenders.

__91. Understanding React's DOM Updating Strategy__
+ Nice little recap of virtual DOM diffing that occurs when render is invoked
+ Only the diffs in virtual DOM get updated to the real DOM, bc touching the real DOM is _slow_

__98. Using SetState Correctly__

>setState() __enqueues__ changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. Think of setState() as __a request rather than an immediate command__ to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately. setState() does not always immediately update the component. It __may batch or defer the update until later__. This makes __reading this.state right after calling setState() a potential pitfall__. 

+ Because _setState_ is asynchronous, should never address _this.state_ as a value within the _setState_, since it might not be an accurate value

+ __(prevState, props)__ = an updater argument

```js
 togglePeople = () => {
    this.setState((prevState, props) => {
      return {
        isExpanded: !this.state.isExpanded,
        toggleState: prevState.toggleState + 1
      };
    });
  };
  ```

__101. Using References ("ref")__

+ __ref__ places a value on the class
+ Way more the "React way" than using _document.querySelector_ within CDM
+ Mostly __controlling focus__ and media playback, and should otherwise be used rarely

```js
componentDidMount() {
  if (this.props.position === 1) {
    this.inputElement.focus();
  }
}
...
<input
  ref={inp => {
    this.inputElement = inp;
  }}
  type="text"
  onChange={handleInputChange}
  value={name}
/>
```

__102. Ref API in 16.3 createRef__

+ Cleans up the _render_ method a bit
+ https://reactjs.org/blog/2018/03/29/react-v-16-3.html#createref-api

```js
constructor(props) {
  super(props);
  this.inputRef = React.createRef();
}
  ...
<input
  ref={this.inputRef}
  type="text"
  onChange={handleInputChange}
  value={name}
/>
  ```

__124. Object.keys to run array methods on an object's values__
```js
 const ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
    }
    ```