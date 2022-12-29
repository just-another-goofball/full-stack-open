import { useState } from 'react';

function App() {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '405-9765-203' },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const updateName = (evt) => {
    setName(evt.target.value);
  };

  const updateNumber = (evt) => {
    setNumber(evt.target.value);
  };

  const updateFilter = (evt) => {
    setFilter(evt.target.value);
  }

  const updatePeopleList = (evt) => {
    evt.preventDefault();

    const matchName = people.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );

    if (matchName) {
      alert(`${name} already exists!`);
      return;
    }

    setPeople(
      people.concat({ name, number })
    );
    setName('');
    setNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter names with: <input value={filter} onChange={updateFilter} />
      </div>
      <h2>add new people</h2>
      <form>
        <div>
          name: <input value={name} onChange={updateName} placeholder="Jane Doe" />
        </div>
        <div>
          number: <input value={number} onChange={updateNumber} placeholder="355-5555-505" />
        </div>
        <div>
          <button type="submit" onClick={updatePeopleList}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {people
            .filter(({name, number}) => name.toLowerCase().includes(filter))
            .map(({name, number}) => (
              <tr key={name + number}>
                <td>{name}</td><td>{number}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
