import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import axios from 'axios'
import SignIn from './pages/SignIn/SignIn'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import GameSearch from './pages/GameSearch/GameSearch'
import GameDetails from './pages/GameDetails/GameDetails'
import FavoriteDetails from './pages/FavoriteDetails/FavoriteDetails'
import FavoriteGameDetails from './pages/FavoriteGameDetails/FavoriteGameDetails'
import Client, { BASE_URL } from './services/api'
import { CheckLogin } from './services/Auth'
import './styles/App.css'

function App() {
  const [gameSearchFilters, setGameSearchFilters] = useState({})
  const [selectedGame, setSelectedGame] = useState(null)
  const [selectedFavorite, setSelectedFavorite] = useState(null)
  const [userFavorites, setUserFavorites] = useState(null)
  const [userFavoriteGame, setUserFavoriteGame] = useState(null)
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [games, setGames] = useState([])

  let navigate = useNavigate()

  const handleGameSelect = (game) => {
    setSelectedGame(game)
    navigate(`/games/${game.id}`)
  }

  const handleFavoriteGameSelect = (game) => {
    setUserFavoriteGame(game)
    navigate(`/profile/favorite/games/${game.id}`)
  }

  const handleFavoriteSelect = (favorite) => {
    setSelectedFavorite(favorite)
    navigate(`profile/favorite/${favorite.id}`)
  }

  const handleUserFavorites = async (user) => {
    let user_id = user.id
    let favorites = await Client.get(`${BASE_URL}/favorite/${user_id}`)
    setUserFavorites(favorites.data)
  }

  const handleGoToSearch = () => {
    setUserFavoriteGame(null)
    setSelectedFavorite(null)
    navigate('/games')
  }

  const checkToken = async () => {
    const user = await CheckLogin()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    if (authenticated) {
      handleUserFavorites(user)
    }
  }, [user])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && user) {
      checkToken()
    } else if (token && !user) {
      localStorage.clear()
    }
  }, [])

  const LogOut = () => {
    setUser(null)
    setUserFavorites(null)
    setSelectedGame(null)
    setSelectedFavorite(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  return (
    <div className="App">
      <Nav LogOut={LogOut} user={user} authenticated={authenticated} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setGameSearchFilters={setGameSearchFilters}
                setSelectedGame={setSelectedGame}
                setSelectedFavorite={setSelectedFavorite}
              />
            }
          />
          <Route
            path="/games"
            element={
              <GameSearch
                setGameSearchFilters={setGameSearchFilters}
                gameSearchFilters={gameSearchFilters}
                handleGameSelect={handleGameSelect}
                setSelectedFavorite={setSelectedFavorite}
              />
            }
          />
          <Route
            path="/games/:game_id"
            element={
              <GameDetails
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
                handleGoToSearch={handleGoToSearch}
                user={user}
                authenticated={authenticated}
                userFavorites={userFavorites}
                selectedFavorite={selectedFavorite}
                setSelectedFavorite={setSelectedFavorite}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                authenticated={authenticated}
                userFavorite={userFavorites}
                handleFavoriteSelect={handleFavoriteSelect}
                handleUserFavorites={handleUserFavorites}
                setSelectedFavorite={setSelectedFavorite}
                LogOut={LogOut}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/profile/favorite/:favorite_id"
            element={
              <FavoriteDetails
                selectedFavorite={selectedFavorite}
                setSelectedFavorite={setSelectedFavorite}
                handleFavoriteGameSelect={handleFavoriteGameSelect}
                user={user}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="/profile/favorite/games/:game_id"
            element={
              <FavoriteGameDetails
                selectedFavorite={selectedFavorite}
                userFavoriteGame={userFavoriteGame}
                setUserFavoriteGame={setUserFavoriteGame}
                handleGoToSearch={handleGoToSearch}
                user={user}
                authenticated={authenticated}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
