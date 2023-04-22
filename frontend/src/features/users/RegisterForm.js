import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewUser } from "./usersSlice";

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const dispatch = useDispatch()

    const canSave = [name, email, password].every(Boolean)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(canSave) {
            const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

            if(!passwordPattern.test(password)) {
                setPasswordError("Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.")
                return;
            }

            const topics = {}
            dispatch(addNewUser({name, email, password, topics}))

            setName('');
            setEmail('');
            setPassword('');
            setPasswordError('')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
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
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
                </div>
                <div className="form-block">
                    <input className="button" type="submit" value="Register!" />
                </div>
                {passwordError ? <p className="form-error">{passwordError}</p> : ''}
            </form>
        </>
    )
}