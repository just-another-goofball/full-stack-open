import { setState } from 'react';

function App() {
  const [good, setGood] = setState(0);
  const [bad, setBad] = setState(0);
  const [neutral, setNeutral] = setState(0);

  return (
    <div className="App">
      code here
    </div>
  );
}

export default App;
