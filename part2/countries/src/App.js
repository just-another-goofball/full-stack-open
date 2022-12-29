import { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import CountryData from './components/Countries';

const REST_COUNTRIES_V2_BASE_URL = 'https://restcountries.com/v2';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    axios.get(`${REST_COUNTRIES_V2_BASE_URL}/all`)
      .then((res) => {
        console.log(res.data);
        setCountries(res.data);
      });
  };

  useEffect(hook, []);

  return (
    <div className="App">
      <Search filter={filter} setFilter={setFilter} />
      <CountryData
        countries={countries.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        )} setFilter={setFilter} />
    </div>
  );
}

export default App;
