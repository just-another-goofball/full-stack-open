import Course from './components/Course';

function App() {
  const courses = [
    {
      title: 'Half Stack application development',
      parts: [
        { name: 'Fundamentals of React', exercises: 10 },
        { name: 'Using props to pass data', exercises: 7 },
        { name: 'State of a component', exercises: 14 },
        { name: 'Redux', exercises: 11 },
      ],
    },
    {
      title: 'Node.js',
      parts: [
        { name: 'Routing', exercises: 3 },
        { name: 'Middlewares', exercises: 7 },
      ],
    },
  ];
  return (
    <main>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (<Course course={course}/>))}
    </main>
  );
}

export default App;
