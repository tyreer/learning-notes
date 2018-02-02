## Getting Started with Redux
https://egghead.io/courses/getting-started-with-redux

### References
+ https://redux.js.org/docs/basics/ExampleTodoList.html
+ https://redux.js.org/docs/basics/UsageWithReact.html
+ https://github.com/tayiorbeii/egghead.io_redux_course_notes
+ https://css-tricks.com/learning-react-redux/

### Key concepts
+ Reducer composition
  + combineReducers({})
  + functional programming
+ Distinction between container and presentational components
+ mapDispatchToProps()
  + ownProps
  + dispatch specifying its action's argument in container components

### Questions
+ Why is __connect()__ being used in so many places?
  + Just because there are many more container components than Treehouse tutorial?

  + Answer:
  > Early Redux documentation advised that you should only have a few connected components near the top of your component tree. However, time and experience has shown that that generally requires a few components to know too much about the data requirements of all their descendants, and forces them to pass down a confusing number of props.
  The current suggested best practice is to categorize your components as “presentational” or “container” components, and extract a connected container component wherever it makes sense

    >Try to keep your presentation components separate. Create container components by connecting them when it's convenient. Whenever you feel like you're duplicating code in parent components to provide data for same kinds of children, time to extract a container. __Generally as soon as you feel a parent knows too much about “personal” data or actions of its children, time to extract a container__.

    https://redux.js.org/docs/faq/ReactRedux.html#should-i-only-connect-my-top-component-or-can-i-connect-multiple-components-in-my-tree

+ Why is __mapDispatchToProps__ not a part of the Treehouse tutorial?

  + Answer: Redux docs seems to identify it as a bit of an edge case to use __bindActionCreators()__

    https://redux.js.org/docs/api/bindActionCreators.html

    https://redux.js.org/docs/basics/Actions.html#action-creators

  + In fact, the Treehouse course designer basically acknowledges that there's little justification for using it in the course...
    > I would absolutely advocate using the mapDispatchToProps approach as it cleans up your render block and results in better performance due to the fact that the action creators are no longer created every time the container is rendered.

    https://teamtreehouse.com/community/why-is-mapdispatchtoprops-ignored-here

+ Why does the Todo onclick not involve an explicit dispatch() call?
  + The action must be dispatched to the Redux store, but why is the syntax different than AddTodo and FilterLink?
  ```JavaScript
  const mapDispatchToProps = {
      onTodoClick: toggleTodo
  }
  ```
  + Answer: The code I'm referencing is just being a bit extra
  >If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props

    https://github.com/reactjs/redux/commit/f56c18c2f6d00016014816d02cdc2f5b29a8da4c#r22674707

    https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments

  + The Redux docs have a bit more verbose and explicit syntax:
  ```JavaScript
    const mapDispatchToProps = dispatch => {
      return {
        onTodoClick: id => {
          dispatch(toggleTodo(id))
        }
      }
    }
  ```

+ In which component does each dispatch occur?
  + Answer: I'm pretty sure that only the container components ultimately dispatch actions

##### Dependencies
+ __deepFreeze__ is being used to ensure no mutations and therefor pure functions
+ Michael Jackson's __expect__ package. which seems to be folded into __Jest__ now, is used for __assertion testing__

### Notes
__Reducers__
```JavaScript
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```
+ __If initial state is undefined, we must define what we expect the default state to be__. In this case __state = 0__ sets a sensible initial state for the counter.
+ The final __default case__ in a reducer (here _counter_) handles an unknown action type by simply returning existing state

  https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/02-Reducer_and_Store.md#05-writing-a-counter-reducer-with-tests

__Spread operators + pure functions__
```JavaScript
const removeCounter = (list, index) => {
  //  (Pre-ES6)
  //  return list
  //  .slice(0, index)
  //  .concat(list.slice(index + 1));

  //  (ES6)
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};
```
+ Two spread operators with a comma replicates _concat_ between two arrays

Egghead:
```JavaScript
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};
```

Treehouse:
```JavaScript
case PlayerActionTypes.UPDATE_PLAYER_SCORE: {
   const updatedPlayerList = state.players.map((player, index) => {
     if(index === action.index) {
       return {
         ...player,
         score: player.score + action.score,
         updated: `${month}/${day}/${year}`
       };
     }
     return player;
   });
   return {
     ...state,
     players: updatedPlayerList
   };
 }
```

+ To update a value at an index, Egghead tutorial uses __spread + slice__, while Treehouse uses __map + match__
+ In Video 12 TOGGLE_TODO uses the _map + match_ as well

  https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/05-Avoiding_Array_Mutations.md#09-avoiding-array-mutations

```JavaScript
const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};
```

```JavaScript
const toggleTodo = (todo) => {
  return {
    ...todo,
      completed: !todo.completed
  };
};
```
+ Both of the above do the same, but the __object spread__ syntax on the bottom is clearly preferable
+ Object spread is used in Treehouse tutorial because they have _stage: 0_ Babel config
+ _Object rest spread transform_ is stage 3 in January 2018

  https://babeljs.io/docs/plugins/transform-object-rest-spread/

  https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/06-Avoiding_Object_Mutations.md

```JavaScript
{
  "presets": ["react", "es2015", "stage-0"]
}
```
+ __stage-0__ _.babelrc_ preset includes stages 1–3


### 11. Writing a Todo List Reducer (Adding a Todo)
```JavaScript
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
  };
  const stateAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests passed')
```
+ Interesting to see all this in a single file
+ __reducer__ function here is a nice simple example of passing in initial state and an action and returning modified state

### 13. Reducer Composition with Arrays

```JavaScript
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}
```
+ Note that in _todo_ state refers to the individual todo, and not the list of todos.

```JavaScript
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
```

+ To model __reducer composition__, the course breaks out the to-do reducers into:
  + one that handles changes to state of individual _to do items_
  + one that handles changes to state in the entire _to do list_
+ This is different than the Treehouse course, where state is managed for both the individual player and the players list array in one reducer

>What we've just done is a common Redux practice called reducer composition. Different reducers specify how different parts of the state tree are updated in response to actions. Since reducers are normal JS functions, they can call other reducers to delegate & abstract away updates to the state.

>Reducer composition can be applied many times. While there's a single top-level reducer managing the overall state of the app, __it's encouraged to have reducers call each other as needed to manage the state tree__.

+ Worth noting as a method, but also note that __this separation seems to be abandoned__ in the eventual project. The __final todos reducer__ makes a bit more sense to me, and it's basically the same as before the two reducers are broken out as modeled above:

```JavaScript
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}
```

  https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/08-Reducer_Composition_with_Arrays.md

### 14. Reducer Composition with Objects

+ A further model of __reducer composition__, this time with an independent reducer for each part of the application state object
+ Application state tree is very similar to Treehouse course at this point (array + string)
+ But the use of reducer composition is very different to the Treehouse course

  > __This pattern helps to scale Redux development__, since different team members can work on different reducers that work with the same actions, without stepping on each other's toes.


```JavaScript
const todoApp = (state = {}, action) => {
  return {
     todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};
```
+ Application reducer, _todoApp_, combines _todos_ and _visibilityFilter_ reducers
+ __Note: above syntax is replaced__ by __combineReducers()__ in next step, but in the above instance it illustrates how the one top-level reducer function calls the two other reducer functions and sets keys based on their values. Useful as a __functional programming example__
+ Initial state in this case ends up being defined by the default values in the child reducer arguments
  + const visibilityFilter = (__state = 'SHOW_ALL'__, action) => {}

```JavaScript
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
```
+ This reducer handles the _todos_ array and uses the _todo_ reducer to call for updated state for individual items
+ __Reducer composition__

```JavaScript
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
};
```
+ This reducer is super simple and is just updating the string value for _visibilityFilter_


https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/09-Reducer_Composition_with_Objects.md

### 15. Reducer Composition with combineReducers()

```JavaScript
import { combineReducers } from 'react-redux';
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
```
+ The previous section's top level reducer declaration can be replaced with much convenient utility function __combineReducers()__
+ The only argument to combineReducers() is an object that specifies the mapping between the state field names and the reducers that manage them.
  + __In this example, the state field names and their reducers have the same name__, so we can reduce _todos: todos_ to a single reference

### 16. Implementing combineReducers() from Scratch
>It's important to understand __functional programming__. Functions can take other functions as arguments, and return other functions. Knowing this will increase productivity with Redux in the long term.

+ https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/11-Implementing_combineReducers_from_Scratch.md

### 17. React Todo List Example (Adding a Todo)
```JavaScript
<input ref={node => {
  this.input = node;
}} />
<button onClick={() => {
  store.dispatch({
    type: 'ADD_TODO',
    text: this.input.value,
    id: nextTodoId++
  });
  this.input.value = '';
}}>
```

+ Course uses __ref callback on input element__ rather than managing local state as a logical presentational component. This is different than the Treehouse course, but also seems to be somewhat common as a way to handle local state on an input.
>We'll use React's callback __ref()__ API. ref() is a function that gets the node corresponding to the ref, which we'll save with the name _this.input_

### 19. Filtering todos

```JavaScript
const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         });
       }}
    >
      {children}
    </a>
  )
}
```
+ Presentational/functional component that dispatches an action
  + Note: This gets __refactored into a container component later__
+ __const FilterLink = ({filter, children}) => {...}__ destructuring the _filter_ and _children_ props here allows them to be used within the component without something like _props.filter_
+ __{children}__ allows _consumer_ to insert their own text inside anchor
+ Inline onClick function isn't the clearest to me. Weird because it's not reusable if we wanted to dispatch that action on another element.
  + I appreciate the eventual use of __mapDispatchToProps__ once this component is turned into a container component

  ```JavaScript
  const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  })
  ```

### 22. Extracting Container Components (FilterLink)

__Refactoring FilterLink to extract Link as a presentational component__

>Inside of the FilterLink definition, we don't currently specify behavior for clicking on the link. It also needs to know the current filter so it can render the item appropriately. Because of this, __we can't say FilterLink is presentational, because it is inseparable from its behavior__. The only reasonable behavior is to dispatch an action (SET_VISIBILITY_FILTER) upon clicking. This is __an opportunity to split this into a more concise presentational component, with a wrapping container component to manage the logic and the presentational component being used for rendering__.
Therefore, we will start by converting our current FilterLink into a presentational component called Link.
The new Link presentational component doesn't know anything about the filter-- it only accepts the active prop, and calls its onClick handler. Link is only concerned with rendering.
Therefore, we will start by converting our current FilterLink into a presentational component called Link.

```JavaScript
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
```
+ Interesting that _Link_ is literally just an element (span or anchor) with some attributes
+ __Presentational component__ here is just markup
+ __{children}__ allows _consumer_ to determine the text inside the component

```JavaScript
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
```
>As a __container component__, FilterLink doesn't have its own markup, and it delegates rendering to the Link presentational component.
In this case, __it calculates its active prop by comparing its own filter prop with the visibilityFilter in the Redux store's state__.

+ __ownProps__ is a little odd to me, but sensible enough

>The container component also needs to specify the behavior. In this case, the FilterLink specifies that when a particular Link is clicked, we should dispatch an action of the type 'SET_VISIBILITY_FILTER' along with the filter value that we take from the props.

>Remember, __the job of all container components is similar: connect a presentational component to the Redux store + specify the data and behavior that it needs__.

+ __connect() injects dispatch() as a prop__ coming from the store

### 23. Extracting Container Components (VisibleTodoList, AddTodo)

+ __Video has a good recap of the app__ once container and presentational components are separated out
+ _Footer_ is a presentational component with a child container component in _FilterLink_, which itself has a child presentational component of _Link_
+ Principle of separating container and presentational components is to make data flow clear.
+ Advisable, but __not a pattern that needs to be followed dogmatically__ if it doesn't achieve that aim
  + For instance, _AddTodo_ mixes presentation and logic in a component that is very small, which is fine

### 27. Generating Containers with connect() from React Redux (VisibleTodoList)

```JavaScript
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = {
  onTodoClick: toggleTodo
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

> The result of the __connect__ call is the container component (_VisibleTodoList_) that is going to render the presentational component(_TodoList_)

+ __connect() generates container components__

> __mapStateToProps__ maps the Redux store's state to the props of the TodoList component that are related to the data from the Redux store. These props will be updated any time the state changes

> To use connect(), you need to define a special function called __mapStateToProps__ that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. For example, __VisibleTodoList needs to calculate todos to pass to the TodoList, so we define a function that filters the state.todos according to the state.visibilityFilter, and use it in its mapStateToProps__

> __mapDispatchToProps__ maps the store's dispatch() method and returns the props that use the dispatch method to dispatch actions. So __it returns the callback props needed by the presentational component__. __It specifies the behavior of which callback prop dispatches which action__.

__Naming actions__:  
```JavaScript
const mapDispatchToProps = {
  onTodoClick: toggleTodo
}
...
onClick={() => onTodoClick(todo.id)}
```
+ _toggleTodo_ is the action creator, but as a prop it gets renamed to _onTodoClick_ then implemented in the target _onClick()_ method

__Passing props__:
```JavaScript
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}
```
+ The _arrayOf_ + _shape_ PropTypes help identify the props being passed into each Todo component

### 28. Generating Containers with connect() from React Redux (AddTodo)
```JavaScript
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)
```
+ We use _let_ to declare the _AddTodo_ component because the second _connect_ call (the second pair of parenthesis in the curried function) generates a container component and assigns it to _AddTodo_ (basically overriding the earlier declaration or _reassigning the let binding_)

```JavaScript
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
```
+ The _App_ component then is rendering the container component (the reassigned component that's exported), which passes dispatch into its internal presentational component (...weird)

### 29. Generating Containers with connect() from React Redux (FooterLink)

```JavaScript
const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
)
```
```JavaScript
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
```
```JavaScript
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}
Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}
```

+ Good __model of relationships between components__: _Footer_ -> _FilterLink_ -> _Link_
+ Also models the point that __container components (_FilterLink_) are not really written so much as _generated_ by _connect()___ (usually)

### 30. Extracting Action Creators

```JavaScript
let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
```
> In __addTodo__, the only information that really is passed is the text of the todo being added. We don't want to generate the id inside of the reducer because that would make it __non-deterministic__.

+ Action Creators document the software for others on the team

### Highlights

__3 forms of dispatch__

_1. AddTodo_
```JavaScript
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)
```

```JavaScript
  <form onSubmit={e => {
    e.preventDefault()
    ...
    dispatch(addTodo(input.value))
    ...
    }}
```

+ Here, __connect__ injects just __dispatch__ and doesn't listen to store, which is fine because _AddTodo_ only sends data to update the state but is otherwise unaware of existing states

>If you do not supply your own mapDispatchToProps function or object full of action creators, the default mapDispatchToProps implementation just injects dispatch into your component’s props.

+ _AddTodo_ is a bit exceptional because there's both presentation and behavior in the same small component

https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

_2. VisibleTodoList_

_A._
```JavaScript
const mapDispatchToProps = {
  onTodoClick: toggleTodo
}
```
_B._
```JavaScript
const mapDispatchToProps = dispatch => ({
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  })
```
+ Both A. + B. above are the same, just different syntax

```JavaScript
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```
+ Feels pretty standard to me. Passing in a prop that will dispatch an action with an id argument pulled off the clicked element.

_2.1 TodoList_

```JavaScript
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)
```

```JavaScript
onClick={() => onTodoClick(todo.id)}
```

_2.2 Todo_

```JavaScript
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)
```

```JavaScript
onClick={onClick}
```

_3. FilterLink_

```JavaScript
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
```

>If your mapDispatchToProps function is declared as taking two parameters, it will be called with dispatch as the first parameter and __the props passed to the connected component as the second parameter__, and will be re-invoked whenever the connected component receives new props. (The second parameter is normally referred to as __ownProps__ by convention.)

https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

+ Interesting that _setVisibilityFilter_ gets an argument inserted in the container component from props it expects to receive in its declaration
+ I guess this is the same as _onTodoClick_, where the argument is inserted in the container component as well—just two different sources of the argument (state from the store vs. a prop passed in during the component declaration)

_3.1 Link_

```JavaScript
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}
```
