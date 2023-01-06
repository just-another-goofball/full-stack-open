import React from 'react';
import { useState, useEffect } from 'react';

import { Search, NewEntryForm, PhonebookEntries } from './components/Phonebook';
import Notification from './components/Notification';
import { getAll } from './services/phonebook.service';

function App() {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const hook = () => {
    getAll()
      .then((data) => {
        console.log(data);
        setPeople(data);
      });
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={error} />
      <Search filter={filter} setFilter={setFilter} />
      <NewEntryForm
        people={people}
        setPeople={setPeople}
        setMessage={setMessage}
        setError={setError} />
      <PhonebookEntries
        people={people}
        filter={filter}
        setPeople={setPeople}
        setMessage={setMessage}
        setError={setError} />
    </div>
  );
}

export default App;
