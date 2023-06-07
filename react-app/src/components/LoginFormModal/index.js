import React, { useState } from 'react'
import { login } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'
import './LoginForm.css'

function LoginFormModal () {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal()
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    } else {
      closeModal()
      history.push('/user/dashboard')
    }
  }

  return (
    <div className='login-form-container'>
      <div className='header'>
        <p>Welcome to ZenFlow</p>
      <div className='subheading-login'>
        <p>To get started, please sign in</p>
      </div>
      </div>
      <form onSubmit={handleSubmit}>
        <ul className='error-list'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='form-field'>
          <label htmlFor='email'></label>
          <input
            type='text'
            id='email'
            placeholder='Email address'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='password'></label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='login-demo-btns'>
          <button type='submit' className='login-btn'>
            Continue
          </button>
          <button
            className='demo-btn'
            onClick={() => alert('Feature coming soon')}
          >
            Demo User
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginFormModal
