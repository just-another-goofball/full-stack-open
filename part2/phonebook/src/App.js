import { useState } from 'react';
import { Search, NewEntryForm, PhonebookEntries } from './components/Phonebook';

function App() {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '405-9765-203' },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

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
