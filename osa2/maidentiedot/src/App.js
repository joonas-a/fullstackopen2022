import { useState, useEffect } from "react"
import countryService from "./services/CountryService"
import weatherService from "./services/WeatherService"
import Filter from "./components/filter"
import Country from "./components/country"

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState([])
  const [called, setCalled] = useState(false)

  const handleSearchChange = (event) => setSearch(event.target.value)
  const handleGetWeather = (data) => setWeather(data)

  useEffect(() => {
    countryService.fetchAll().then((countries) => {
      setAllCountries(countries)
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
        weatherService={weatherService}
        weather={weather}
        setWeather={handleGetWeather}
        called={called}
        setCalled={setCalled}
      />
    </div>
  )
}

export default App
