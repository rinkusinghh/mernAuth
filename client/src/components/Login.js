import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router'

import { UserContext } from '../App'

export const Login = () => {
    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const shareData = async (e) => {
        e.preventDefault();

        const response = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({ email, password })
        })

        await response.json();

        if(response.status === 400 || !response) {
            window.alert(`email and password Invalid!`)
            
        } else {
            dispatch({ type: "USER", payload: true })
            window.alert(`Successfully login`)
            history.push('/');
        }
    }

    return (
             <section>
            <div className="container my-5">
            <div className="row">
                <div className="">
                <h1 className="text-center">Sign In</h1>
                <form method="POST">
               
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email" 
                    className="form-control" 
                    // autoComplete="off" 
                    placeholder="Enter your email" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="name">Password:</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    id="password" 
                    className="form-control" 
                    // autoComplete="off" 
                    placeholder="Enter your password" />
                </div>
               
                <div className="form-group my-4 ">
                    <input 
                    type="submit" 
                    name="signIn" 
                    value="Login" 
                    onClick={shareData} 
                    id="signIN" 
                    className="btn btn-primary"
                    // className="form-control" 
                    autoComplete="off" />
                </div>
                </form>
                <div className="text-center">
                    <NavLink to="/signUp" >
                    I am already Login ? <br /> 
                        <button className="btn-sm btn-secondary">
                            Register
                        </button>
                    </NavLink>
                </div>
            </div>
                </div>
            </div>
            </section>
    )
}
