// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";

const CountContext = React.createContext();

function nameof(obj) {
  return Object.keys(obj)[0];
}

function CountProvider({...props}) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider {...props} value={value} />;
}

function useCount() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error(
      `${nameof({useCount})} must be used within a ${nameof({CountProvider})}`,
    );
  }

  const [count, setCount] = context;
  return [count, setCount];
}

const withCount = Component => props =>
  (
    <CountProvider>
      <Component {...props} />
    </CountProvider>
  );

function CountDisplay() {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useCount();
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      {/* <CountProvider> */}
        <CountDisplay />
        <Counter />
      {/* </CountProvider> */}
    </div>
  );
}

const AppWithCount = withCount(App);

export default AppWithCount;
