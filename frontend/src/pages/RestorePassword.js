import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { checkRestoreLink, resetPassword } from '../features/users/usersSlice'

export default function RestorePasswordForm() {
    const [tab, setTab] = useState(1)
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [passwordError, setPasswordError] = useState('')
    const [sessionError, setSessionError] = useState('')

    const dispatch = useDispatch()

    const togglePassword = () => {
        if(passwordType === 'password') setPasswordType('text')
        else setPasswordType('password')
    }

    const resetEmail = localStorage.getItem('resetEmail')

    const path = window.location.pathname.split('/')
    const email = path[2]
    const restoreLink = path[3]

    if(resetEmail !== email) sessionError('Error')

    dispatch(checkRestoreLink({ restoreLink })).then((result) => {
        if(result.payload.error) {
            setSessionError(result.payload.error)
        }
    })

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setTab(2)

        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        if(!passwordPattern.test(password)) {
            setPasswordError("Password requirements: 8-20 characters. At least 1 number, 1 capital letter & 1 symbol (like !@#$%^&*).")
            return;
        }

        dispatch(resetPassword({ email, password }))
    }

  return (
    sessionError ? (
        <div className="password-message">
            <div className="message-body">
                <p>Session was expired or did not exist!</p>
                <a href='/restorePassword'>Restore password</a>
            </div>
        </div>
    ) :
    tab === 1 ? (
        <div>
            <form onSubmit={(e) => handlePasswordSubmit(e)} className="form w-40">
                <div className="form-block form-input">
                    <label htmlFor="password">Enter your new password: </label>
                    <div className="password-login">
                        <input onChange={(e) => setPassword(e.target.value)} type={passwordType} name="password" id="password" minLength='8' maxLength='20' required />
                        <span className={passwordType !== 'password' ? 'hidden' : ''} onClick={togglePassword}>{passwordType === 'password' ? '👁' : '👓'}</span>
                    </div>
                    <div className="password-message">
                        <div className="arrow"></div>
                        <div className="message-body">
                            <p>Password requirements: 8-20 characters, at least 1 number, 1 capital letter & 1 symbol (like !@#$%^&*).</p>
                        </div>
                    </div>
                </div>
                <div className="form-block">
                    <input className="button" type="submit" value="Submit" />
                </div>
                {passwordError ? <div className="form-block form-error">{passwordError}</div> : ''}
            </form>
        </div>
    ) : (
        <div className="password-message">
            <div className="message-body">
                <p>Password was successfully changed!</p>
            </div>
        </div>
    )
  ) 
}
