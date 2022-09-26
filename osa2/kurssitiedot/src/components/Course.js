
const Course = ( {course} ) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ name }) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  )
}

const Part = ( {name, exercises} ) => {
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}
  
const Content = ( {parts} ) =>
  <>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </>


const Total = ( {parts}) => {
  const exercisesTotal = parts.reduce((sumCount, newVal) => sumCount = sumCount + newVal.exercises, 0)
  return (
    <>
      <b>
        total of {exercisesTotal} exercises
      </b>
    </>
  )
}

const Courses = ({ courses }) => {
  return (
    <>
    {courses.map(course => 
      <Course key={course.id} course={course} />
      )}
    </>
  )
}


export default Courses
