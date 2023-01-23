import { useState, useEffect } from "react"
import axios from 'axios'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"

const App = () => {


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  const addNewNumber = (event) => {
    event.preventDefault()
    const newEntry = {
      name: newName,
      number: newNumber,
    }

    if (persons.map((p) => p.name).indexOf(newName) === -1) {
      axios
        .post('http://localhost:3001/persons', newEntry)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handler={handleSearchChange} />
      <h3>Add new entry</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNewNumber={addNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App
