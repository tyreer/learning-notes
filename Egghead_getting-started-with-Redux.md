## Getting Started with Redux
https://egghead.io/courses/getting-started-with-redux
https://github.com/tayiorbeii/egghead.io_redux_course_notes

+ __deepFreeze__ is being used to ensure no mutations and therefor pure functions
+ Michael Jackson's __expect__ package. which seems to be folded into __Jest__ now, is used for __assertion testing__

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
+ https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/02-Reducer_and_Store.md#05-writing-a-counter-reducer-with-tests

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
+ https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/05-Avoiding_Array_Mutations.md#09-avoiding-array-mutations

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
+ Object spread is used in Treehouse tutorial because they have stage: 0 Babel config
+ _Object rest spread transform_ is stage 3 in January 18
+ https://babeljs.io/docs/plugins/transform-object-rest-spread/
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

+ To model __reducer composition__, the course breaks out reducers into:
  + one that handles changes to state of individual to do items
  + one that handles changes to state in to do list
+ This is different than the Treehouse course, where state is managed for both the individual player and the players list array in one reducer

https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/08-Reducer_Composition_with_Arrays.md

### 14. Reducer Composition with Objects

+ A further model of __reducer composition__, this time with an independent reducer for each part of the application state object
+ Application state tree is very similar to Treehouse course at this point (array + string)
+ But the use of reducer composition is very different to the Treehouse course

  >What we've just done is a common Redux practice called reducer composition. Different reducers specify how different parts of the state tree are updated in response to actions. Since reducers are normal JS functions, they can call other reducers to delegate & abstract away updates to the state.
Reducer composition can be applied many times. While there's a single top-level reducer managing the overall state of the app, __it's encouraged to have reducers call each other__ as needed to manage the state tree.

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
