import { useState, useEffect } from 'react';
import axios from 'axios';

import { Search, NewEntryForm, PhonebookEntries } from './components/Phonebook';

const BASE_URL = 'http://localhost:3001';

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    axios.get(`${BASE_URL}/persons`)
      .then((res) => {
        console.log(res.data);
        setPeople(res.data);
      });
  }

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={filter} setFilter={setFilter} />
      <NewEntryForm
        name={name}
        number={number}
        people={people}
        setName={setName}
        setNumber={setNumber}
        setPeople={setPeople} />
      <PhonebookEntries people={people} filter={filter} />
    </div>
  );
}

export default App;
