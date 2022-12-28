function Header({title}) {
  return (
    <h1>{title}</h1>
  );
}

function Part({part}) {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

function Content({parts}) {
  return (
    <>
      {parts.map((part) => (<Part part={part} />))}
    </>
  );
}

function Total({exerciseCount}) {
  return (
    <p>Number of exercises {exerciseCount}</p>
  )
}

function App() {
  const course = 'Half Stack application development';
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];
  return (
    <div className="App">
      <Header title={course} />
      <Content parts={parts} />
      <Total
        exerciseCount={parts.reduce((total, {name, exercises}) => total + exercises, 0)}
      />
    </div>
  );
}

export default App;
