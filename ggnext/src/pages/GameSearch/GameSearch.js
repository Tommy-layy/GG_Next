import { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import GameCard from '../../components/GameCard/GameCard'
import './GameSearch.css'
import axios from 'axios'

const GameSearch = ({
  gameSearchFilters,
  setGameSearchFilters,
  handleGameSelect,
  setSelectedFavorite
}) => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {
      q: `${search}`,
      type: 'multi',
      offset: '0',
      limit: '21',
      numberOfTopResults: '9'
    },
    headers: {
      'X-RapidAPI-Key': '23ff26e990msh4c310288556d19ap115d19jsnb0dedeb0f45c',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  }

  const handleSearchSubmit = async (e, value) => {
    e.preventDefault()
    await axios
      .request(options)
      .then(function (response) {
        setSearchResults(response.data.titles.items)
      })
      .catch(function (error) {
        console.error(error)
      })

    setSearch(value)
  }
  useEffect(() => {
    setSelectedFavorite(null)
  }, [])

  return (
    <div id="gameSearch">
      <div id="searchOptions">
        <SearchBar
          search={search}
          setSearch={setSearch}
          gameSearchFilters={gameSearchFilters}
          setGameSearchFilters={setGameSearchFilters}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
      <h4 className="searchResults">Search Results: </h4>
      <div className="gameCardHolder">
        {searchResults?.map((game, index) => (
          <GameCard
            key={game.data.id}
            song={game}
            handleGameSelect={() => handleGameSelect(game)}
          />
        ))}
      </div>
    </div>
  )
}

export default GameSearch
