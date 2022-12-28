import { useState } from 'react';

function Button({text, onClickHandler}) {
  return (
    <button type="button" onClick={onClickHandler}>{text}</button>
  );
}

function Feedback({incrementGood, incrementBad, incrementNeutral}) {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClickHandler={incrementGood} text="good" />
      <Button onClickHandler={incrementNeutral} text="neutral" />
      <Button onClickHandler={incrementBad} text="bad" />
    </div>
  );
}

function StatisticLine({text, value}) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function Stats({good, bad, neutral}) {
  const total = good + bad + neutral;

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    );
  }

  const average = (good - bad) / total;
  const positive = good * 100 / total;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + " %"} />
        </tbody>
      </table>
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
