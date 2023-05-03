import React from "react";
import { Link } from 'react-router-dom'

export default function Navbar() {
    const userData = JSON.parse(localStorage.getItem('user'))

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <nav className="navbar">
            <Link className="link" exact="true" activeclassname="active" to="/">Home</Link>
            {userData ?
                <Link onClick={handleLogout} className="link">Log-out</Link> 
            :
            <>
                <Link className="link" activeclassname="active" to="/register">Sign-up</Link>
                <Link className="link" activeclassname="active" to="/login">Sign-in</Link>
            </>
            }
            <Link className="link" activeclassname="active" to="/users">Users</Link>
        </nav>
    )
}