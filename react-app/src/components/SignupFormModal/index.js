import React, { useState, useEffect } from 'react'
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
  const [isModalOpen, setIsModalOpen] = useState(true) // Track modal state
  const { closeModal } = useModal()
  const history = useHistory()

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleContinue = e => {
    e.preventDefault()
    setErrors([]) // Clear any existing errors

    if (email.trim() === '') {
      setErrors(['Email is required.'])
    } else if (!isValidEmail(email)) {
      setErrors(['Invalid email format.'])
    } else {
      setStep(2)
    }
  }

  const handleGoBack = () => {
    setStep(1)
    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail(email)
    setErrors([])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = await dispatch(signUp(firstName, lastName, email, password))

    if (data) {
      console.log('DATA ---->', data)

      setErrors(data)
      console.log('VALIDATION ERRORS --->', errors)
    } else if (data && data.id) {
      setIsModalOpen(false) // Close the modal after successful signup
      history.push('/user/dashboard')
    } else {
      closeModal()
    }
  }

  useEffect(() => {
    return () => {
      closeModal()
    }
  }, [closeModal])

  return (
    <div className='signup-form-container signup-modal'>
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
            {errors.length > 0 && (
              <ul className='error-list'>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
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
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              {errors.includes('This field is required.') && (
                <span className='error-message'>First name is required.</span>
              )}
            </div>
            <div className='form-field signup2'>
              <label htmlFor='lastName'>What is your last name?</label>
              <input
                type='text'
                id='lastName'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              {errors.includes('This field is required.') && (
                <span className='error-message'>Last name is required.</span>
              )}
            </div>
            <div className='form-field'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {errors.includes('This field is required.') && (
                <span className='error-message'>Password is required.</span>
              )}
            </div>
            {errors.includes('Email is already in use.') && (
              <span className='error-message'>
                Email already in use. Please return to the previous screen.
              </span>
            )}
            <div className='signup-btn'>
              <button type='submit' className='signup-btn'>
                Continue
              </button>
              <button
                type='button'
                className='back-arrow'
                onClick={handleGoBack}
              >
                <i className='fas fa-arrow-left'></i>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default SignUpFormModal
