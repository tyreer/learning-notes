## What's New in React 16
https://teamtreehouse.com/library/whats-new-in-react-16

## componentDidCatch() + Error Boundaries

```JavaScript
export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render () {
    if (this.state.hasError) {
      return <h1>Error from ErrorBoundary component</h1>
    }
    return this.props.children;
  }
}
```

```JavaScript
<ErrorBoundary>
  <StudentForm />
</ErrorBoundary>
```
+ Try/catch that avoids entire app being unmounted
> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI
+ __return this.props.children;__


```JavaScript
  componentDidCatch(error, info)
```
+ Both the error and stack trace can be passed to JS error tracking software in componentDidCatch()

+ https://reactjs.org/docs/react-component.html#componentdidcatch

+ https://reactjs.org/blog/2017/09/26/react-v16.0.html#better-error-handling

+ https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html

+ https://reactjs.org/docs/error-boundaries.html

## New Return Types

+ React 16 allows us to return an array and avoid using a wrapping div around multiple components

```JavaScript
import React from 'react';
const JSTeachers = () => [
  <li key="1">Treasure</li>,
  <li key="2">Guil</li>,
  <li key="3">James</li>
];
export default JSTeachers;
```
+ _JSTeachers_ is a functional component with an implicit return

```JavaScript
import React from 'react';
import JSTeachers from './JSTeachers';
const Teachers = () =>
  <div className="teachers">
    <h1>Teacher List</h1>
    <ul>
      <li>Alena</li>
      <li>Nick</li>
      <JSTeachers />
      <li>Ben</li>
      <li>Jay</li>
    </ul>
  </div>;
export default Teachers;
```
+ _JSTeachers_ merged into existing component w/o wrapper div

```JavaScript
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Teachers />
        <Footer />
      </div>
    );
  }
}
```
+ Previous standard use of wrapping div

```JavaScript
class App extends Component {
  render() {
    return [
      <Header key="head" />,
      <Teachers key="teach" />,
      <Footer key="foot" />
    ];
  }
}
```

+ New ability to return an array (with keys) that forgoes the wrapping div

+ __Fragment__ is also relevant here, but not modelled
  + https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html

## Portals

+ __Use cases:__ Modal windows or overlays that need to be outside a context with _overflow: hidden_ or a particular _z-index_
+ Allows a component to render into any div with a corresponding ID—not just "root", which is where most React app components are rendered
+ Events will bubble up just like a regular React component regardless of where a portal situates them in the DOM tree

```html  
<body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <div id="my-portal"></div>
```
```JavaScript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Modal extends Component {
  render() {
    return (
      ReactDOM.createPortal(
        this.props.children,
        document.getElementById('my-portal')
      )
    );
  }
}
export default Modal;
```
+ __createPortal()__ takes the component to render and the target in the DOM

```JavaScript
class App extends Component {
  render() {
    return (
      <div className="App">
        <StudentForm />
        <Modal>
          <div className="modal">
            This is the Modal Window
            <button>Close x</button>
          </div>
        </Modal>
      </div>
    );
  }
}
```
## Returning null from setState

```JavaScript
class App extends Component {
  state = {
    teacher: ''
  };
  updateTeacher = teacher => {
    const newTeacher = teacher;
    this.setState(state => {
      if (state.teacher === newTeacher) {
        return null;
      } else {
        return { teacher };
      }
    });
  }
  ```
+ In setState, __state is the previous state__
+ Returning _null_ simply prevents any rerender, which in this case improves performance by avoiding any unnecessary rerenders when the currently selected teacher is clicked.

## Other updates

https://reactjs.org/blog/2017/09/26/react-v16.0.html#better-server-side-rendering

https://reactjs.org/blog/2017/09/26/react-v16.0.html#support-for-custom-dom-attributes

https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html

> The new implementation is designed from the ground up to support asynchronous rendering, which allows processing large component trees without blocking the main execution thread.

+ https://code.facebook.com/posts/1716776591680069/react-16-a-look-inside-an-api-compatible-rewrite-of-our-frontend-ui-library/
