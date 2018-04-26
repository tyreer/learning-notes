## React 16 - The Complete Guide (incl. React Router 4 & Redux)
https://www.udemy.com/react-the-complete-guide-incl-redux/
_Created by Maximilian Schwarzmüller_

#### Section 1: Getting Started

__Video 2__

Components can be considered custom HTML elements. Easy to define specifically and reuse.

__Video 3: Real-World SPAs & React Web Apps__

Can think of reusable components like JS modules but extended to include markup.

__Video 5: Writing our First React Code__

+ CodePen quick add React, ReactDOM, Babel, etc.
  + https://codepen.io/anon/pen/MELQaQ
+ When writing JSX, good to note that it just gets compiled into regular JS, so the leap from JSX to vanilla JS and injecting DOM elements as strings of HTML markup isn't too far off.

__6. Why Should we Choose React?__

+ Allows UI state to be more easily managed than via vanilla JS.
  + For instance, changing the order of DOM elements targeted by querySelector might cause issues
+ React allows us to focus on __business logic__


__8. Understanding Single Page Applications and Multi Page Applications__

__Single-page app__
+ One HTML page, with content (re)rendered on client
+ Rendering on client side allows us to create reactive UX. Even if it's a loading spinner, it's designed UX.
+ One root app component is mounted to DOM
  + One _ReactDOM.render()_ call


__Multi-page app__
+ Multiple HTML pages, content is rerendered on server
+ React components might be sprinkled in to regular markup in order to allow the addition of an interactive feature
  + One _ReactDOM.render()_ call per component

#### Section 3: Understanding the Base Features & Syntax

__30. Understanding JSX__
```js
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Yo</h1>
      </div>
    );
  }
}
```
+ Although it's not actually visible, this _return_ statement is the equivalent of calling _React.createElement()_ with the appropriate parameters as below


```js
return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Yo'));
```
+ This is why we always have to import _React_, and it helps illustrate how JSX is transformed into JS, despite looking like HTML
  + It's not simply something like _innerHTML_ with a string of markup

```js
return (
```
+ The parenthesis here are just to allow us to write a __multiline return__

__31. JSX Restrictions__
+ Typically want to __return one root _div___ with all other content nested inside
+ Root _div_ would also have the name of the component as its class name

__42. Manipulating the State__

```js
this.setState()
```
+ _setState()_ is a method inherited from the react _Component_ class
+ It will __merge in__ updated component state properties rather than redefining the entire state object

__44. Passing Method References Between Components__
```js
<Person
  addSymbol={this.addSymbol.bind(this, person.symbol[0])}
/>

<Person
  addSymbol={() => this.addSymbol(person.symbol[0])}
/>
```
+ Both methods allow us to pass arguments into a callback, but using __bind__ is preferable for performance reasons

__46. Adding Styling with Stylesheets__

```js
import React from 'react';
import './Person.css';

export default function(props) { // Inside Person.js, so this is the Person component
```

+ Webpack will automatically recognise that we've imported this file and inject an autoprefixed style tag into our HTML element
  + Will these styles be included if this component is not initialised or rendered to the DOM?

#### Section 4: Understanding the Base Features & Syntax

__50. Rendering Content Conditionally__

+ Only simple expressions in JSX brackets, so no _if()_ because no blocks
+ Ternary or short circuiting are options, but might make code a bit convoluted if overused

```js
{ this.state.isExpanded ?
    <div>
      <Person />
    </div> : null
}
```

```js
{ this.state.isExpanded &&
    <div>
      <Person />
    </div>
}
```

__51. Rendering Content Conditionally__

+ __Best practice__ is to keep the returned JSX clean and avoid overloading with conditional logic
+ Because a state change will always trigger the _render()_ function, we're sure that simply using _{person}_ in the JSX will be in sync with state

```js
render() {

  let people = null;

  if(this.state.isExpanded) {
    people = (
      <div>
      { this.state.people.map((person, index) =>
        <Person
          key={person.id}
          addSymbol={this.addSymbol.bind(this, person.symbol[0])} />)}
      </div>
    );

    return (
      <div className="App">
        <button onClick={this.togglePeople}>Switch Name</button>
        {person}
        <input type="text" onChange={this.handleInputChange.bind(this)} value={this.state.textValue} />
      </div>
    );
  }
```

__56. Lists & Keys__

+ Using an _index_ from _map()_ as a key is no good because the index value will change if the data set changes, while a key should be a unique identifier that is consistently associated with a DOM element

__57. Flexible Lists__

```js
handleInputChange = (e, index) => {...};

...

<Person
  handleInputChange={(e) => {this.handleInputChange(e, index)}} />
```

+ Using an __arrow function__, the event argument is passed in the arrow function and callback, so it can be the first parameter in the callback function declaration


```js
handleInputChange = (index, e) => {...};

...

<Person
  handleInputChange={this.handleInputChange.bind(this, index)} />
```

+ Using ___bind_ prepends__ the _index_ argument, so the event parameter (here _e_) must come _after_ the other parameters in the function declaration
