
const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
    ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};


const Course = ({ course }) => {
  return (
    <>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )
}

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });
  return <p>Total of {total} exercises</p>;
};

export default Course;