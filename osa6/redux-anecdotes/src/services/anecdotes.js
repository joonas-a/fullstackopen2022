import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const url = `${baseUrl}/${id}`
  const anecdoteToReplace = await axios.get(url)
  const updatedAnecdote = {
    ...anecdoteToReplace.data,
    votes: anecdoteToReplace.data.votes + 1,
  }
  await axios.put(url, updatedAnecdote)
  return getAll()
}

const anecdoteService = {
  getAll,
  createNew,
  addVote,
}

export default anecdoteService
