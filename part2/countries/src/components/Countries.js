import CapitalWeather from "./Weather";

function Countries({countries, setFilter}) {
  const updateFilter = (country) => {
    setFilter(country);
  }

  return (
    <div>
      {countries.map((country) =>
        (<p key={country.name}>
          {country.name}
          <button onClick={() => updateFilter(country.name)}>show</button>
        </p>)
      )}
    </div>
  );
}

function Country({country}) {
  return (
    <div>
      <h2>{country.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>capital</td>
            <td><em>{country.capital}</em></td>
          </tr>
          <tr>
            <td>area</td>
            <td><em>{country.area}</em></td>
          </tr>
        </tbody>
      </table>
      <h4>languages</h4>
      <ul>
        {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} width="25%" height="25%" />
      <CapitalWeather capital={country.capital} />
    </div>
  )
}

function CountryData({countries, setFilter}) {
  if (countries.length === 0) {
    return (
      <div>
        No matches found!
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    );
  }
  if (countries.length <= 10) {
    return (
      <Countries countries={countries} setFilter={setFilter} />
    );
  }

  return (
    <div>
      Too many matches, please try another keyword
    </div>
  );
}

export default CountryData;