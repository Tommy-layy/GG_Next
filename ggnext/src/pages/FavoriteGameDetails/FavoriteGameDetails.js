import { useNavigate } from 'react-router-dom'
import Client, { BASE_URL } from '../../services/api'
import swal from 'sweetalert'

const FavoriteGameDetails = ({
  selectedFavorite,
  userFavoriteGame,
  setUserFavoriteGame,
  handleGoToSearch,
  user,
  authenticated
}) => {
  const navigate = useNavigate()

  const handleBackToFavorite = (F) => {
    setUserFavoriteGame(null)
    navigate(`/profile/Favorite/${F.id}`)
  }
  const handleRemoveFromFavorite = async (favorite_id) => {
    let game_id = userFavoriteGame.id
    let response = await Client.delete(
      `${BASE_URL}/api/favorite/addgame/${favorite_id}/${game_id}`
    )
    swal(response.data.message, 'Click OK to return!', 'warning')
    navigate(`/profile`)
  }

  return (
    <div id="gameDetailsPage">
      <h1>Game: {userFavoriteGame.name}</h1>
      <div className="img-content">
        {userFavoriteGame.image ? (
          <img
            className="gameCardImg"
            src={userFavoriteGame.image}
            alt={userFavoriteGame.name}
            width="400"
          />
        ) : null}
      </div>
      <div className="info-box">
        <h3 className="title">Title: {userFavoriteGame.name}</h3>
      </div>
      <button className="buttonz" onClick={handleGoToSearch}>
        Search Games
      </button>
      <button
        className="buttonZ"
        onClick={() => handleRemoveFromFavorite(selectedFavorite.id)}
      >
        Remove Game from Favorite
      </button>
      {selectedFavorite ? (
        <button
          className="buttonz"
          onClick={() => handleBackToFavorite(selectedFavorite)}
        >
          Back to Favorite
        </button>
      ) : (
        <p>Navigation Error! Lost knowledge of which Favorite you came from.</p>
      )}
    </div>
  )
}

export default FavoriteGameDetails
