import FavoriteGameCard from '../../components/FavoriteGameCard/FavoriteGameCard'
import { useNavigate } from 'react-router-dom'
import Client, { BASE_URL } from '../../services/api'
import { useState } from 'react'

const FavoriteDetails = ({
  selectedFavorite,
  handleFavoriteGameSelect,
  setSelectedFavorite,
  user,
  authenticated
}) => {
  const navigate = useNavigate()
  const [updateF, toggleUpdateF] = useState(false)
  const [newFavoriteTitle, setnewFavoriteTitle] = useState(null)

  const handleUpdateFavorite = () => {
    toggleUpdateF(!updateF)
  }
  const handleReturn = () => {
    setSelectedFavorite(null)
    navigate('/profile')
  }
  const updateFavorite = async () => {
    const res = await Client.put(
      `${BASE_URL}/api/playlist/${selectedFavorite.id}`,
      { title: newFavoriteTitle }
    )
    toggleUpdateF(false)
    navigate('/profile')
  }

  const deleteFavorite = async () => {
    const res = await Client.delete(
      `${BASE_URL}/api/playlist/${selectedFavorite.id}`
    )
    setSelectedFavorite(null)
    navigate('/profile')
  }
  return (
    <div id="favoriteDetailsPage">
      <div className="favoriteButtons">
        <button className="buttonz" onClick={handleUpdateFavorite}>
          {updateF ? 'Cancel' : 'Edit Favorite Name'}
        </button>
        {updateF ? (
          <input
            placeholder="Favorite Name"
            onChange={(e) => setnewFavoriteTitle(e.target.value)}
          />
        ) : null}
        {updateFavorite ? (
          <button className="buttonz" onClick={updateFavorite}>
            Update Playlist
          </button>
        ) : null}
        <button
          className="buttonZ"
          onClick={() => deleteFavorite(selectedFavorite.id)}
        >
          Delete List
        </button>
      </div>
      <div className="gameCardHolder">
        {selectedFavorite.games?.map((game, index) => (
          <FavoriteGameCard
            key={game.id}
            game={game}
            handleFavoriteGameSelect={() => handleFavoriteGameSelect(game)}
          />
        ))}
      </div>
      <button className="buttonz" onClick={handleReturn}>
        Return to list
      </button>
    </div>
  )
}

export default FavoriteDetails
