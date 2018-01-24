## Building Applications with React and Redux
https://teamtreehouse.com/library/building-applications-with-react-and-redux

```JavaScript
export default function Stats(props) {}
```
```JavaScript
const Stats = props => {}
export default Stats;
```
+ Arrow function refactor of presentational component

```JavaScript
AddPlayerForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
};
```
```JavaScript
static propTypes: {
  onAdd: React.PropTypes.func.isRequired,
};
```
+ Refactor into ES7 __property initialiser__ syntax within a __logical presentational component__ (one that manages local state)
+ http://egorsmirnov.me/2015/06/14/react-and-es6-part2.html

```JavaScript
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
}
```
```JavaScript
Player.propTypes = {
  name: PropTypes.string.isRequired,
}
```
+ Removing React from before PropTypes
+ _prop-types_ is new package in React 16, so this may be dated

```JavaScript
export const addPlayer = name => {
  return {
    type: PlayerActionTypes.ADD_PLAYER,
    name
  };
};
```
+ Action creator that returns an action
+ name is metadata

```JavaScript
import { createStore } from 'redux';
import PlayerReducer from './src/reducers/player'
const store = createStore(
  PlayerReducer
);
```
+ Registers our reducer with Redux


```JavaScript
import { Provider } from 'react-redux';
render (
  <Provider store={store}>
    <Scoreboard />
  </Provider>,
  document.getElementById('root')
)
```
+ Wrapping the container component with _Provider_, which wires up the store
+ Wrapping the app in Provider creates a method for any container component to subscribe to changes from Redux
  + method is __connect()__

```JavaScript
const mapStateToProps = state => (
  {
    players: state    
  }
)
```

+ This will replace existing state in Scoreboard container

```JavaScript
state = {
  players: [
    {
      name: 'Jim Hoskins',
      score: 31,
    },
    {
      name: 'Andrew Chalkley',
      score: 20,
    },
    {
      name: 'Alena Holligan',
      score: 50,
    },
  ],
}
```

```JavaScript
export default connect(mapStateToProps)(Scoreboard);
```
+ Subscribes the container component in the second parens to the Redux store and provides a function to map state from store to props of container

```JavaScript
<a className="remove-player" onClick={props.onRemove}>✖</a>
```
Changed to
```JavaScript
<a className="remove-player" onClick={ () => props.removePlayer(props.index) }>✖</a>
```

```JavaScript
const store = createStore(
  PlayerReducer,
  window.devToolsExtension && window.devToolsExtension()
);
```

## Challenge

__Pure functions returning new state object with spread was tricky for me initially__

_Me:_

  ```JavaScript
  case PlayerActionTypes.SELECT_PLAYER:
  return {
    players: state.players,
    selectedPlayerIndex: action.index
  };
  ```

_Guil:_

  ```JavaScript
  case PlayerActionTypes.SELECT_PLAYER:
  return {
    ...state,
    selectedPlayerIndex: action.index
  };
  ```

_Me:_

  ```JavaScript
  case PlayerActionTypes.ADD_PLAYER:
    return {
      players: [
      ...state.players,
      {
        name: action.name,
        score: 0,
        created: `${month}/${day}/${year}`
      }
    ],
    selectedPlayerIndex: state.selectedPlayerIndex
  };
  ```

_Guil:_

  ```JavaScript
  case PlayerActionTypes.ADD_PLAYER: {
    const addPlayerList = [ ...state.players, {
      name: action.name,
      score: 0,
      created: `${month}/${day}/${year}`
    }];
    return {
        ...state,
        players: addPlayerList
    };
  }
  ```
+ Brackets wrapping case after colon
+ _return_ uses spread as simple keep "all the rest the same"

_Me:_

```JavaScript
case PlayerActionTypes.UPDATE_PLAYER_SCORE:
  return {
    players: state.players.map((player, index) => {
          if(index === action.index) {
            return {
              ...player,
              score: player.score + action.score,
              updated: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
            };
          }
          return player;
        }),
    selectedPlayerIndex: state.selectedPlayerIndex
  };
  ```
_Guil:_

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
  + Ditto to previous

_Me:_

  ```JavaScript
  case PlayerActionTypes.REMOVE_PLAYER:
    return {
      players: [
        ...state.players.slice(0, action.index),
        ...state.players.slice(action.index + 1)
      ],
    selectedPlayerIndex: state.selectedPlayerIndex
  }
  ```

_Guil:_

  ```JavaScript
  case PlayerActionTypes.REMOVE_PLAYER: {
    const removedPlayerList = [
      ...state.players.slice(0, action.index),
      ...state.players.slice(action.index + 1)
    ];
    return {
      ...state,
      players: removedPlayerList
    }
  }
    ```


__Readability + DRY__

_Me:_
  ```JavaScript
  created: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
  ```

_Guil:_
  ```JavaScript
  let date = new Date()
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  created: `${month}/${day}/${year}`
  ```
+ Especially since the template literal is used in two places

__Destructuring props in component declaration__

_Me:_

```JavaScript
const PlayerDetail = props => {
  if( props.selectedPlayer ){
    return (
      <div>
        <h3>{ props.selectedPlayer.name }</h3>
```

_Guil:_

```JavaScript
const PlayerDetail = ({ selectedPlayer }) => {
  if( selectedPlayer ){
    return (
      <div>
        <h3>{ selectedPlayer.name }</h3>
```
