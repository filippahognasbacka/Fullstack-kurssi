import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const renderCountries = (countriesToRender) => {
    if (countriesToRender.length > 10) {
      return <p>Too many matches, specify please.</p>
    } else if (countriesToRender.length > 1) {
      return (
        <ul>
          {countriesToRender.map(c => (
            <li key={c.cca3}>
              {c.name.common} <button onClick={() => setFilter(c.name.common)}>show</button>
            </li>
          ))}
        </ul>
      )
    } else if (countriesToRender.length === 1) {
      const country = countriesToRender[0]
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150"/>
        </div>
      )
    } else {
      return <p>No matches</p>
    }
  }

  return (
    <div>
      <h1>Countries</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search for a country"
      />
      {renderCountries(filteredCountries)}
    </div>
  )
}

export default App
