import React from "react"

const GameCard = (games) => {
  console.log(games)
  return (
    <div>
      <div className="games">
        {games?.map((game)=>(
          <div>
            <h1>{game.title}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameCard