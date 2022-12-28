import { useState } from 'react';

function Feedback({incrementGood, incrementBad, incrementNeutral}) {
  return (
    <div>
      <h1>give feedback</h1>
      <button type="button" onClick={incrementGood}>good</button>
      <button type="button" onClick={incrementNeutral}>neutral</button>
      <button type="button" onClick={incrementBad}>bad</button>
    </div>
  );
}

function Stats({good, bad, neutral}) {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const incrementReview = (func, count) => {
    return () => func(count + 1);
  };

  return (
    <div className="App">
      <Feedback
        incrementGood={incrementReview(setGood, good)} 
        incrementBad={incrementReview(setBad, bad)}
        incrementNeutral={incrementReview(setNeutral, neutral)} />
      <Stats good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
