import React from 'react'
import { NavLink } from 'react-router-dom'

export const Error = () => {
    return (
        <div>
            <h1>404 error page doesn't found!</h1>
            <NavLink to="/">Back to home</NavLink>
        </div>
    )
}
