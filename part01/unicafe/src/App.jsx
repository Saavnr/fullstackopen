import { useState } from "react";

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr> 
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad;
  
  if(total===0){
    return <p>No feedback given</p>
  }

  return(
    <table>
      <tbody>     
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='All' value={total}/>
        <StatisticLine text='Average' value={(good-bad)/total}/>
        <StatisticLine text='Positive' value={(good/total * 100)+'%'}/>
      </tbody>
    </table>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>
  
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App