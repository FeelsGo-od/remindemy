import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addNewUser } from "./usersSlice";

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordType, setPasswordType] = useState('password')

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        if(userData) navigate('/', { replace: true })
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const togglePassword = () => {
        if(passwordType === 'password') setPasswordType('text')
        else setPasswordType('password')
    }

    const canSave = [name, email, password].every(Boolean)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(canSave) {
            const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

            if(!passwordPattern.test(password)) {
                setPasswordError("Password requirements: 8-20 characters. At least 1 number, 1 capital letter & 1 symbol (like !@#$%^&*).")
                return;
            }

            const topics = []

            const regResult = await dispatch(addNewUser({name, email, password, topics}))

            if(regResult.payload.message) {
                dispatch(addNewUser({name, email, password, topics}))
                setPasswordError(regResult.payload.message)
            } else {
                dispatch(addNewUser({name, email, password, topics}))

                setName('');
                setEmail('');
                setPassword('');
                setPasswordError('')
                navigate('/login', { replace: true })
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form w-40">
                <div className="form-block form-input">
                    <label htmlFor="name">Enter your name: </label>
                    <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" required />
                </div>
                <div className="form-block form-input">
                    <label htmlFor="email">Enter your email: </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
                </div>
                <div className="form-block form-input">
                    <label htmlFor="password">Enter your password: </label>
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
                <div>
                    <a href="/login">Already have an account?</a>
                </div>
                <div className="form-block">
                    <input className="button" type="submit" value="Register!" />
                </div>
                {passwordError ? <p className="form-error">{passwordError}</p> : ''}
            </form>
        </>
    )
}