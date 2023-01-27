const Persons = ({
  persons,
  searchTerm,
  deletePerson
}) => {
  if (searchTerm === "") {
    return persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
        <button
          onClick={(event) => {
            if (window.confirm('Delete ' + person.name + '?')) {
              deletePerson(event)
            }
          }}
          value={person.id}
          type="submit">
            Delete
        </button>
      </p>
    ))
  } else {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={deletePerson} value={person.id} type="submit">
            Delete
          </button>
        </p>
      ))
  }
}

export default Persons
