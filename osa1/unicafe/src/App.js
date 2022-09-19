import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = () => good + neutral + bad
  const average = () => (good + (bad * -1)) / all()
  const positive = () => (good / all()) * 100 + "%"

  if (all() === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all()} />
        <StatisticLine text="average" value={average()} />
        <StatisticLine text="positive" value={positive()} />
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = (newValue) => setGood(newValue)
  const rateNeutral = (newValue) => setNeutral(newValue)
  const rateBad = (newValue) => setBad(newValue)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => rateGood(good + 1)} text="good" />
      <Button handleClick={() => rateNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => rateBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
