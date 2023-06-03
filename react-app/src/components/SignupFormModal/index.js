import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'
import { signUp } from '../../store/session'
import './SignupForm.css'

function SignUpFormModal () {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal()
  const history = useHistory()

  const handleContinue = e => {
    e.preventDefault()
    setErrors([]) // Clear any existing errors
    setStep(2)

  }

  const handleSubmit = async e => {
    e.preventDefault()
    const validationErrors = []

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
    } else {
      const data = await dispatch(signUp(firstName, lastName, email, password))
      if (data && data.errors) {
        setErrors(data.errors.map(error => error.msg))
      } else if (data && data.id) {
        history.push('/user/dashboard')
        closeModal()
      }
      closeModal()
    }
  }


  return (
    <div className='signup-form-container signup-modal
'>
      {step === 1 ? (
        <>
          <div className='header signup'>
            <p>What's your email?</p>
          </div>
          <form onSubmit={handleContinue}>

            <div className='form-field signup'>
              <label htmlFor='email'></label>
              <input
                className='email-input'
                type='text'
                id='email'
                placeholder='name@company.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='continue-btn'>
              <button type='submit' className='continue-btn'>
                Sign Up
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className='signup2-flex'>
            <div className='header signup'>
              <p>Welcome to ZenFlow!</p>
            </div>
            <div className='subheading-container'>
              <p className='subheading'>You're signing in as {email}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='form-field signup2'>
              <label htmlFor='firstName'>What is your first name?</label>
              <input
                type='text'
                id='firstName'
                placeholder='First name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className='form-field signup2'>
              <label htmlFor='lastName'>What is your last name?</label>
              <input
                type='text'
                id='lastName'
                placeholder='Last name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className='form-field'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='signup-btn'>
              <button type='submit' className='signup-btn'>
                Continue
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default SignUpFormModal
