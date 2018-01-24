## Getting Started with Redux
https://egghead.io/courses/getting-started-with-redux
https://github.com/tayiorbeii/egghead.io_redux_course_notes


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
