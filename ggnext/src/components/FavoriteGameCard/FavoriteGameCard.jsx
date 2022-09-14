const FavoriteGameCard = ({ game, handleFavoriteGameSelect }) => {
  
  return (
    <div className='gameCard'>
      <div className="img-content">
        {game.image ? (
          <img
            className="gameCardImg"
            src={game.image}
            alt={game.name}
            width="300"
          />
        ) : null}
      </div>
      <div className="info-box">
        <h2 className="game">game: {game.name}</h2>
      </div>
      <button className="buttonz" onClick={handleFavoriteGameSelect}>
        Click for Details
      </button>
    </div>
  )
}

export default FavoriteGameCard