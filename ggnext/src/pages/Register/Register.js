import { useState } from 'react'
import { RegisterUser } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const SignUp = () => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password
    })
    setFormValues({
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }

  return (
    <div className="signupCol">
      <div className="card-overlay centered">
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <h3 id="signUpTitle">Register</h3>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder=""
              value={formValues.name}
              id="signUpValues"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder=""
              value={formValues.email}
              id="signUpValues"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder=""
              value={formValues.username}
              id="signUpValues"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="text"
              name="password"
              value={formValues.password}
              id="signUpValues"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="text"
              name="confirmPassword"
              value={formValues.confirmPassword}
              id="signUpValues"
              required
            />
          </div>
          <button
            id="registerButton"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
