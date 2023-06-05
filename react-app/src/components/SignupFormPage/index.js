import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage () {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal()
  const history = useHistory()

  if (sessionUser) return <Redirect to='/' />

  const handleSubmit = async e => {
    e.preventDefault()
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }

  const renderErrors = () => {
    return (
      <ul className='error-list'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    )
  }


  return (
    <div className='signup-form-container'>
      <h1 className='form-heading'>What's your email?</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type='text'
            placeholder='example@email.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-field'>
          <button type='submit' className='signup-button'>
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupFormPage
