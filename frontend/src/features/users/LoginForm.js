import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { loginUser, showProfile } from "./usersSlice";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(userData) navigate('/', { replace: true })
    }, [])

    const togglePassword = () => {
        if(passwordType === 'password') setPasswordType('text')
        else setPasswordType('password')
    }

    // add form validation code here

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        dispatch(loginUser({email, password})).then((result) => {
            if(result.payload.message) {
                setLoginError(result.payload.message);
                setLoading(false)
            } else {
                // token sent successfully
                setEmail('');
                setPassword('');
                setLoginError('')
                // check token and signin user
                dispatch(showProfile(result.payload.token)).then((loginStatus) => {
                    if(loginStatus.payload.message) setSuccessMessage(loginStatus.payload.message)
                    // save status to the localstorage to keep user logged-in for a while
                    localStorage.setItem('user', JSON.stringify(result.meta.arg))
                    localStorage.setItem('userId', JSON.stringify(loginStatus.payload.currentUser._id))
                    localStorage.setItem('userEmail', JSON.stringify(email))
                    navigate('/', { replace: true })
                    window.location.reload()
                })
            }
        })
    }

    return (
        <>
            {successMessage ? 
            <h2 className="center pt-23">{successMessage}</h2> 
            : 
            <form onSubmit={handleSubmit} className="form w-40">
                <div className="form-block">
                    <label htmlFor="email">Enter your email: </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />
                </div>
                <div className="form-block">
                    <label htmlFor="password">Enter your password: </label>
                    <div className="password-login">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={passwordType} name="password" id="password" required />
                        <span className={passwordType !== 'password' ? 'hidden' : ''} onClick={togglePassword}>{passwordType === 'password' ? '👁' : '👓'}</span>
                    </div>
                </div>
                {/* <div>
                    <a href="/restorePassword">Forgot the password?</a>
                </div> */}
                <div className="form-block">
                    <input className="button" type="submit" value="Login" />
                </div>
                {loginError ? <div className="form-block form-error">{loginError}</div> : ''}
                {!loginError && loading ? 'loading...' : ''}
            </form>}
        </>
    )
}