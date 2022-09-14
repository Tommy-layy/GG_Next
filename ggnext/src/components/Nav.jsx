import { Link } from 'react-router-dom'
import React from 'react'

const Nav = () => {
  return (
    <header>
      <div className='NavBar'>
        <a>
        <Link to="/">Home</Link>
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