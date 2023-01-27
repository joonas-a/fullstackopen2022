import { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import PersonService from "./services/PersonService"

const App = () => {


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    PersonService
      .getPersons()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const handlePersonRemoval = selectedId => setPersons(
    persons.filter(person => {
      //console.log('ID nyt: ' + person.id + ' selected ID on: ' + selectedId)
      //console.log(person.id !== selectedId)
      //console.log(typeof(person.id) + '  ' + typeof(selectedId))
      return(person.id !== selectedId)
    })
  )

  const addNewNumber = (event) => {
    event.preventDefault()
    const entry = {
      name: newName,
      number: newNumber
    }
    if (persons.map((p) => p.name).indexOf(newName) === -1) {
      addNewPerson(entry)
    } else {
      if (window.confirm(`Update number for ${entry.name}?`)) {
        const update = persons.find(p => p.name === entry.name)
        updatePerson(update.id, entry)
      }
    }
  }

  const addNewPerson = (entry) => {
    PersonService
      .addPerson(entry)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName("")
        setNewNumber("")
      })
  }

  const updatePerson = (id, entry) => {
    PersonService
      .updatePerson(id, entry)
      .then(returnedEntry => {
        setPersons(persons.map(p => p.id !== id ? p : returnedEntry))
      })
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const selectedId = Number(event.target.value)
    PersonService
      .deletePerson(selectedId)
      .catch(error => {
        alert('User is already deleted!')
      })
    handlePersonRemoval(selectedId)
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
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}  
      />
    </div>
  )
}

export default App
