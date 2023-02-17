const express = require("express")
const app = express()

app.use(express.json())

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 1,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 2,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 3,
  },
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 4,
  },
]

app.get("/", (request, response) => {
  response.send("<h2>Hello World!</h2>")
})

app.get("/info", (request, response) => {
  let time = Date()
  let count = persons.length
  response.send(`<p>Phonebook has info for ${count} people</p> ${time}`)
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (!person) {
    return response.status(404).json({
      error: "person not found",
    })
  }
  response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
