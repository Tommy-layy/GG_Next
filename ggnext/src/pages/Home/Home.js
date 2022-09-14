import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from '../../components/GameCard/GameCard'
import './Home.css'

const Home = () => {
  return (
    <div className="page home">
      <h1>GGNext</h1>
      <h2>Free-To-Play Games</h2>
      {/* <GameCard games={games} /> */}
    </div>
  )
}

export default Home
