import { useState, useEffect } from 'react';

import { Search, NewEntryForm, PhonebookEntries } from './components/Phonebook';
import { getAll } from './services/phonebook.service';

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    getAll()
      .then((data) => {
        console.log(data);
        setPeople(data);
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
      <PhonebookEntries people={people} filter={filter} setPeople={setPeople} />
    </div>
  );
}

export default App;
