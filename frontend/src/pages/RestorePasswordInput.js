import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { sendRestoreEmail } from '../features/users/usersSlice'

export default function RestorePasswordForm() {
    const [tab, setTab] = useState(1)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const dispatch = useDispatch() 

    const handleEmailSubmit = async (e) => {
        e.preventDefault()

        dispatch(sendRestoreEmail({ email })).then((result) => {
            if(result.payload.error) {
                setEmailError(result.payload.error)
            } else {
                setTab(2)
            }
        })
        localStorage.setItem('resetEmail', email)
    }

  return (
    tab === 1 ? (
        <div>
            <form onSubmit={(e) => handleEmailSubmit(e)} className="form w-40">
                <div className="form-block">
                    <label htmlFor="email">Enter your email: </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />
                </div>
                <div className="form-block">
                    <input className="button" type="submit" value="Submit" />
                </div>
                <div>
                {emailError ? <div className="form-block form-error">{emailError} <a href='/register'>Do you want to register?</a></div> : ''}
                </div>
            </form>
        </div>
    ) : (
        <div className="password-message">
            <div className="message-body">
                <p>Check your email for message with instructions</p>
                <div>
                    Did not get any message? <a onClick={handleEmailSubmit} href='#'>Send again</a>
                </div>
            </div>
        </div>
    )
  ) 
}
