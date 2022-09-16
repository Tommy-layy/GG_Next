// import '.SearchBar.css'

const SearchBar = ({
  search,
  setSearch,
  gameSearchFilters,
  setGameSearchFilters,
  handleSearchSubmit
}) => {
  const handleFormChange = (e) => {
    setSearch(e.target.value)
  }

  const handleFormReset = () => {
    setGameSearchFilters({})
  }

  return (
    <div>
      <form onReset={handleFormReset} onSubmit={handleSearchSubmit}>
        <div className="searchField">
          <input
            className="searchField"
            id="search"
            onChange={handleFormChange}
            placeholder="Search For Games"
          ></input>
        </div>
        <button className="buttonZ" type="reset" value="Reset">
          Reset
        </button>
        <button className="buttonz" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar