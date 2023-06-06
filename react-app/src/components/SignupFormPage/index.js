import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/session'
import './SignupForm.css'

function SignupFormPage () {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  if (sessionUser) return <Redirect to='/' />

  const handleSubmit = async e => {
    e.preventDefault()
    if (password === confirmPassword) {
<<<<<<< HEAD
      console.log('ERRORS', errors)
      const data = await dispatch(signUp(firstName, lastName, email, password))
=======
      const data = await dispatch(signUp(username, email, password))
>>>>>>> dev
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors([
        'Confirm Password field must be the same as the password field'
      ])
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
<<<<<<< HEAD
        <ul className='error-list'>
=======
        <ul>
>>>>>>> dev
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
<<<<<<< HEAD
        <div className='form-field'>
=======
        <label>
          Email
>>>>>>> dev
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}

export default SignupFormPage
