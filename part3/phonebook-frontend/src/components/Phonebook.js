import React from 'react';
import { useState } from 'react';
import PropType from 'prop-types';

import { addPerson, deleteById, updatePersonById } from '../services/phonebook.service';

function Input({label, value, onChangeCallback}) {
  return (
    <div>
      {label}: <input value={value} onChange={onChangeCallback} />
    </div>
  );
}
Input.propTypes = {
  label: PropType.string.isRequired,
  value: PropType.string.isRequired,
  onChangeCallback: PropType.func.isRequired,
};

function Search({filter, setFilter}) {
  const updateFilter = (evt) => {
    setFilter(evt.target.value);
  };

  return (
    <Input label="filter names with" value={filter} onChangeCallback={updateFilter} />
  );
}
Search.propTypes = {
  filter: PropType.string.isRequired,
  setFilter: PropType.func.isRequired,
};

function NewEntryForm({people, setPeople, setMessage, setError}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const updateName = (evt) => {
    setName(evt.target.value);
  };

  const updateNumber = (evt) => {
    setNumber(evt.target.value);
  };

  const updatePeopleList = (evt) => {
    evt.preventDefault();

    const person = people.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );

    const prompt = `${name} already exists. Do you want to replace the number with a new one?`;

    if (person && window.confirm(prompt)) {
      updatePersonById(person.id, { name: person.name, number: number })
        .then((data) => {
          setPeople(
            people
              .filter((val) => val.id !== person.id)
              .concat(data)
          );

          setError(false);
          setMessage(`Updated number for ${person.name}`);

          setTimeout(() => {
            setMessage('');
          }, 5000);
        }).catch((err) => {
          console.log(err);

          setError(true);
          setMessage(`${err.response?.data?.error ?? err}`);

          setTimeout(() => {
            setMessage('');
          }, 5000);
        });

      setName('');
      setNumber('');

      return;
    }

    addPerson({ name, number })
      .then((data) => {
        console.log(data);
        setPeople(
          people.concat(data)
        );

        setError(false);
        setMessage(`Added ${name}`);
        
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }).catch((err) => {
        console.log(err);

        setError(true);
        setMessage(`${err.response?.data?.error ?? err}`);

        setTimeout(() => {
          setMessage('');
        }, 5000);
      });

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
NewEntryForm.propTypes = {
  people: PropType.arrayOf(PropType.object).isRequired,
  setPeople: PropType.func.isRequired,
  setMessage: PropType.func.isRequired,
  setError: PropType.func.isRequired,
};

function PhonebookEntries({people, filter, setPeople, setMessage, setError}) {
  const deletePerson = (person_id) => {
    // eslint-disable-next-line no-unused-vars
    const person = people.find(({name, number, id}) => id === person_id);
    console.log(person_id, person);

    if (window.confirm(`Delete record for ${person.name}?`)) {
      deleteById(person_id)
        .then((res) => {
          console.log(res);
          setPeople(
            // eslint-disable-next-line no-unused-vars
            people.filter(({name, number, id}) => id !== person_id)
          );

          setError(false);
          setMessage(`Deleted entry ${person.name}`);

          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
    }
  };

  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {people
            // eslint-disable-next-line no-unused-vars
            .filter(({name, number, id}) => name.toLowerCase().includes(filter.toLowerCase()))
            .map(({name, number, id}) => (
              <tr key={id}>
                <td>{name}</td><td>{number}</td>
                <td><button onClick={() => deletePerson(id)}>delete</button></td>
              </tr>
            )
            )}
        </tbody>
      </table>
    </>
  );
}
PhonebookEntries.propTypes = {
  people: PropType.arrayOf(PropType.object).isRequired,
  setPeople: PropType.func.isRequired,
  filter: PropType.string.isRequired,
  setMessage: PropType.func.isRequired,
  setError: PropType.func.isRequired,
};

export {
  Search,
  NewEntryForm,
  PhonebookEntries,
};
