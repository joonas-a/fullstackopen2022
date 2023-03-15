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
  const [statusMessage, setStatusMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    PersonService.getPersons().then((allPersons) => {
      setPersons(allPersons)
    })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const handlePersonRemoval = (selectedId) =>
    setPersons(persons.filter((person) => person.id !== selectedId))

  const Notification = ({ message }) => {
    const notificationStyle = {
      color: "green",
      fontStyle: "italic",
      fontSize: 16,
    }
    if (message === null) {
      return null
    }
    return <div style={notificationStyle}>{message}</div>
  }

  const ErrorNotification = ({ message }) => {
    const errorStyle = {
      color: "red",
      fontStyle: "bold",
      fontSize: 16,
    }
    if (message === null) {
      return null
    }
    return <div style={errorStyle}>{message}</div>
  }

  const addNewNumber = (event) => {
    event.preventDefault()
    const entry = {
      name: newName,
      number: newNumber,
    }
    if (persons.map((p) => p.name).indexOf(newName) === -1) {
      addNewPerson(entry)
    } else {
      if (window.confirm(`Update number for ${entry.name}?`)) {
        const update = persons.find((p) => p.name === entry.name)
        updatePerson(update.id, entry)
      }
    }
  }

  const addNewPerson = (entry) => {
    PersonService.addPerson(entry)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson))
        setNewName("")
        setNewNumber("")
        setStatusMessage(`${newPerson.name} was added`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updatePerson = (id, entry) => {
    PersonService.updatePerson(id, entry)
      .then((returnedEntry) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedEntry)))
        setStatusMessage(`Number for ${returnedEntry.name} was updated`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(
          `${entry.name} has already been remved from the server!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (event, name) => {
    event.preventDefault()
    const selectedId = String(event.target.value)
    PersonService.deletePerson(selectedId)
      .then((returnedPerson) => {
        setStatusMessage(`Successfully deleted ${name}`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(`${name} has already been removed from the server!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    handlePersonRemoval(selectedId)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} />
      <ErrorNotification message={errorMessage} />
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
