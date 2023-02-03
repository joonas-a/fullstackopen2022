const Country = ({
  allCountries,
  search,
  handleShowButton,
  weatherService,
  weather,
  setWeather,
  called,
  setCalled,
}) => {
  const countriesFiltered = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  if (countriesFiltered.length > 10) {
    if (called === true) {
      setCalled(false)
    }
    return <p>Please specify your search</p>
  }

  if (
    countriesFiltered.length === 1 ||
    countriesFiltered.some(
      (flag) => flag.name.common.toLowerCase() === search.toLowerCase()
    )
  ) {
    const country = countriesFiltered[0]
    const flagUrl = Object.values(country.flags)[0]

    if (called === false) {
      weatherService
        .fetchWeather(
          country.capitalInfo.latlng[0],
          country.capitalInfo.latlng[1]
        )
        .then((data) => setWeather(data.current_weather))
      setCalled(true)
    }

    return (
      <>
        <h2>{country.name.common} </h2>
        <p>Capital {country.capital} </p>
        <p>Area {country.area} </p>
        <p>
          <b>languages spoken:</b>
        </p>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={flagUrl} alt="flag of the country" />
        <p>
          <b>Weather in {country.capital}</b>
          <br></br>
          <b>Temperature</b>
          <br></br>
          {weather.temperature} °C
          <br></br>
          <b>Wind</b>
          <br></br>
          {weather.windspeed} m/s
        </p>
      </>
    )
  }

  if (called === true) {
    setCalled(false)
  }

  return countriesFiltered.map((country) => (
    <p key={country.name.common}>
      {country.name.common}
      <button onClick={() => handleShowButton(country.name.common)}>
        show
      </button>
    </p>
  ))
}

export default Country
