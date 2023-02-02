const Country = ({ allCountries, search }) => {
  const countriesFiltered = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  if (countriesFiltered.length > 10) {
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
      </>
    )
  }

  return countriesFiltered.map((country) => (
    <p key={country.name.common}>{country.name.common}</p>
  ))
}

export default Country
