import { useState, useEffect } from "react"
import countryService from "./services/CountryService"
import Filter from "./components/filter"
import Country from "./components/country"

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState("")

  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    countryService.fetchAll().then((countries) => {
      setAllCountries(countries)
      console.log(countries)
    })
  }, [])

  return (
    <div>
      <h3>Country info</h3>
      <Filter searchTerm={search} handler={handleSearchChange} />
      <Country
        allCountries={allCountries}
        search={search}
        handleShowButton={setSearch}
      />
    </div>
  )
}

export default App
