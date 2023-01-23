const Persons = ({ persons, searchTerm }) => {
  if (searchTerm === "") {
    return persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
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
        </p>
      ))
  }
}

export default Persons
