function Input({label, value, onChangeCallback}) {
  return (
    <div>
      {label}: <input value={value} onChange={onChangeCallback} />
    </div>
  );
}

function Search({filter, setFilter}) {
  const updateFilter = (evt) => {
    setFilter(evt.target.value);
  };

  return (
    <Input label="filter names with" value={filter} onChangeCallback={updateFilter} />
  );
}

function NewEntryForm({name, number, people, setName, setNumber, setPeople}) {
  const updateName = (evt) => {
    setName(evt.target.value);
  };

  const updateNumber = (evt) => {
    setNumber(evt.target.value);
  };

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
    <>
      <h2>add new people</h2>
      <form>
        <Input label="name" value={name} onChangeCallback={updateName} />
        <Input label="number" value={number} onChangeCallback={updateNumber} />
        <div>
          <button type="submit" onClick={updatePeopleList}>add</button>
        </div>
      </form>
    </>
  );
}

function PhonebookEntries({people, filter}) {
  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {people
            .filter(({name, number}) => name.toLowerCase().includes(filter.toLowerCase()))
            .map(({name, number}) => (
              <tr key={name + number}>
                <td>{name}</td><td>{number}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  )
}

export {
  Search,
  NewEntryForm,
  PhonebookEntries,
};
