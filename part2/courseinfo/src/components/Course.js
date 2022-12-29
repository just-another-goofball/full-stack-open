function SubHeading({title}) {
  return (
    <h3>{title}</h3>
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
    <p><b>total of {exerciseCount} exercises</b></p>
  );
}

function Course({course}) {
  return (
    <div className="App">
      <SubHeading title={course.title} />
      <Content parts={course.parts} />
      <Total
        exerciseCount={
          course.parts.reduce((total, {name, exercises}) => total + exercises, 0)
        }
      />
    </div>
  );
}

export default Course;