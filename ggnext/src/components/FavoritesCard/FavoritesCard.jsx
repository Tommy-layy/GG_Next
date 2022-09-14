const FavoritesCard = ({ userFavorite, handleFavoriteSelect }) => {
  
  return (
    <div className="favorite">
      <h2 className="favoriteName"> {userFavorite.title} </h2>
      <button className="buttonz" onClick={handleFavoriteSelect}>
        Click for Details
      </button>
    </div>
  )
}

export default FavoritesCard