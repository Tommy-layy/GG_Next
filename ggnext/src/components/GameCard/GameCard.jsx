const GameCard = ({ game, handleGameSelect }) => {
  
  return (
    <div className={`gameCard ${game.data.genre}Card`}>
      <div className="img-content">
        {game.data.title.detail.sources[0].url ? (
          <img
            className="gameCardImg"
            src={game.data.title.genre.sources[0].url}
            alt={game.data.title}
            width="300"
          />
        ) : null}
      </div>
      <div className="info-box">
        <h2 className="song">Game: {game.data.title}</h2>
      </div>
      <button className="buttonz" onClick={handleGameSelect}>
        Click for Details
      </button>
    </div>
  )
}

export default GameCard
