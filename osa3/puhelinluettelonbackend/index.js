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

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
