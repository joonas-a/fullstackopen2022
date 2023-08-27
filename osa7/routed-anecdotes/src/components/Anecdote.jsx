const Anecdote = ({ anecdote }) => {
  // console.log(anecdote)

  return (
    <div>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <p>Has {anecdote.votes} votes</p>
      <p>For more information see {anecdote.info}</p>
    </div>
  )
}

export default Anecdote
