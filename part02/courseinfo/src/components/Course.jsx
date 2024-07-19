const Header = ({text}) => <h1>{text}</h1>

const SubHeader = ({text}) => <h2>{text}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Sum = ({parts}) => {
    const sum = parts.reduce((sum,part) => sum+part.exercises,0)
    return <b><p>total of {sum} exercises</p></b>
} 

const Content = ({parts}) => {
  return(
    <>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <Sum parts={parts}/>
    </>
  )
}

const Course = ({courses}) => {
  return(
    <>
      <Header text={'Web developement curriculum'}/>
      {courses.map(course=> (
        <div key={course.id}>
          <SubHeader text={course.name}/>
          <Content parts={course.parts}/>
        </div>
      ))}
    </>
  )
}

export default Course