function Search({filter, setFilter}) {
  const updateFilter = (evt) => {
    setFilter(evt.target.value);
  }
  return (
    <div>
      find countries: <input type="text" value={filter} onChange={updateFilter} />
    </div>
  )
}

export default Search;
