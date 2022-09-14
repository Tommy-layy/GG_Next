import { Link } from 'react-router-dom'
import React from 'react'
import "./Nav.css"
const url = require('./Crown.png')

const Nav = ( { user, authenticated, handleLogOut}) => {
  return user && authenticated ? (
      <header>
          <nav>
            <div className='navbar'>
              <div className="homelogo">
              <Link to="/">
              <img className="logoH" src={url} alt=""></img>
              </Link>
              </div>
              <div>
              <Link to = '/'>Home</Link>
              <Link to = '/profile'>Profile</Link>
              <Link to ='' onClick={() => handleLogOut()}>LogOut</Link>
              </div>
            </div>            
          </nav>
      </header>
  ) : (
    <header>
      <div className='navbar'>
      <div className="homelogo">
          <Link to="/">
            <img className="logoH" src={url} alt=""></img>
          </Link>
        </div>
        <a>
        <Link to="/">Home</Link>
        </a>
        <a>
        <Link to='games'>Search</Link>
        </a>
        <a>
        <Link to='/profile'>Profile</Link>
        </a>
        <a>
        <Link to='/login'>Login</Link>
        </a>
        <a>
        <Link to='/register'>Register</Link>
        </a>
      </div>
    </header>
  )
}

export default Nav