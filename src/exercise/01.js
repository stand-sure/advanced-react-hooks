// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

const INCREMENT = "increment";

function incrementCount(state, action){
  return {
    ...state,
    ...action,
    count: state.count + action.step,
  }
}

function countReducer(state, action) {
  action = typeof action === "function" ? action(state) : action;

  let retVal = {...state};
  switch (action.type) {
    case INCREMENT:
      retVal = incrementCount(state, action);
      break;
    default:
      throw new Error(`Unexpected action type: ${action.type}`);
  }

  return retVal;
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const {count} = state;

  const increment = () => dispatch(() => ({type: INCREMENT, step}));
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
