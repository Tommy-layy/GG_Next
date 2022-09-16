import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard'
import UserSettings from '../../components/UserSettings/UserSettings'
import Client, { BASE_URL } from '../../services/api'
import './Profile.css'

const Profile = ({
  user,
  authenticated,
  userFavorite,
  handleFavoriteSelect,
  handleUserFavorites,
  setSelectedFavorite,
  LogOut
}) => {
  const [isFormActive, setIsFormActive] = useState(false)
  const [createNew, toggleCreateNew] = useState(false)
  const [newFavoriteTitle, setNewFavoriteTitle] = useState(null)
  const navigate = useNavigate()

  console.log(userFavorite)
  const toggleActive = (e) => {
    setIsFormActive(!isFormActive)
    if (e.target.innerHTML === 'Edit Account') {
      e.target.innerHTML = 'Cancel'
    } else {
      e.target.innerHTML = 'Edit Account'
    }
  }
  const handleCreateFavorite = () => {
    toggleCreateNew(!createNew)
  }
  const submitNewFavorite = async () => {
    await Client.post(`${BASE_URL}/favorite/${user.id}`, {
      title: newFavoriteTitle,
      image: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    toggleCreateNew(false)
    navigate('/profile')
  }
  useEffect(() => {
    if (authenticated) {
      handleUserFavorites(user)
      setSelectedFavorite(null)
    }
  }, [createNew])
  return user && authenticated ? (
    <div id="profilePage">
      <section>
        <div id="userInfo">
          {isFormActive ? <UserSettings user={user} LogOut={LogOut} /> : null}
          <button className="editAccountButton" onClick={toggleActive}>
            Edit Account
          </button>
        </div>
        <h2 className="username">{user.username}</h2>
        <div id="addFavoriteButtonAndCreateFavorite">
          <button
            className="buttonz"
            id="createF"
            onClick={handleCreateFavorite}
          >
            {createNew ? 'Cancel' : 'Create A List'}
          </button>
          {createNew ? (
            <input
              className="createFavoriteName"
              placeholder="List Name"
              onChange={(e) => setNewFavoriteTitle(e.target.value)}
            />
          ) : null}
          {createNew ? (
            <button className="buttonz" onClick={submitNewFavorite}>
              Create List
            </button>
          ) : null}
        </div>
      </section>
      <div id="userFavorite">
        <h1>Test</h1>
        <div className="favoriteCard">
          {userFavorite?.map((userFavorite, index) => (
            <div>
              <FavoriteCard
                key={userFavorite.id}
                userFavorite={userFavorite}
                handleFavoriteSelect={() => handleFavoriteSelect(userFavorite)}
              />
              <h1>Test2</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="protectedContent">
      <h4 className="needLogin">Sign in to create a favorites list</h4>
      <button className="buttonz" onClick={() => navigate('/login')}>
        Sign in
      </button>
    </div>
  )
}

export default Profile
