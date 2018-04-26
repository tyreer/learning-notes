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