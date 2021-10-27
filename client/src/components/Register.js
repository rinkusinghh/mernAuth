import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export const Register = () => {
    const history = useHistory();

    const [ user, setUser] = useState({
        name: "", 
        email: "", 
        phone: "", 
        work: "", 
        password: "", 
        confirmPassword: ""
    })
    
    let name, value;
    const inputHandler = (e) => {
        name = e.target.name
        value = e.target.value

        setUser({...user, [name]: value});
    }

    const shareData = async (e) => {
        e.preventDefault();

        const { 
            name, 
            email, 
            phone, 
            work, 
            password, 
            confirmPassword
        } = user;

        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name, 
                email, 
                phone, 
                work, 
                password, 
                confirmPassword
            })
        })

        await response.json();

        if(response.status === 400 || !response) {
            window.alert("Invalid register")
            console.log('Invalid register')
        } else {
            window.alert("Successfully register");
            history.push('/signIn');
        }
    }

    return (
        <>
        <section>
            <div className="container my-5">
            <h1 className="text-center ">Sign Up</h1>
                <form method="POST">

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                    name="name" 
                    id="name" 
                    value={user.name} 
                    onChange={inputHandler} 
                    // autoComplete="off"  
                    className="form-control" 
                    placeholder="Enter your name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input type="email"  
                    name="email" 
                    id="email" 
                    // autoComplete="off" 
                    value={user.email} 
                    onChange={inputHandler} 
                    className="form-control" 
                    placeholder="Enter your email" 

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Mobile Number:</label>
                    <input type="phone"  
                    name="phone" 
                    id="phone" 
                    value={user.phone} 
                    onChange={inputHandler} 
                    // autoComplete="off" 
                    className="form-control" 
                    placeholder="Enter your mobile number"/>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Profession:</label>
                    <input type="text" 
                    name="work" 
                    id="work" 
                    value={user.work} 
                    onChange={inputHandler}  
                    className="form-control" 
                    // autoComplete="off" 
                    placeholder="Enter your Profession" />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Password:</label>
                    <input type="password"  
                    name="password" 
                    id="password" 
                    value={user.password} 
                    onChange={inputHandler} 
                    className="form-control" 
                    // autoComplete="off" 
                    placeholder="Enter your password" />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Confirm Password:</label>
                    <input type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    value={user.confirmPassword} 
                    onChange={inputHandler}  
                    className="form-control" 
                    // autoComplete="off" 
                    placeholder="Enter your confirmPassword" />
                </div>

                <div className="form-group my-4 ">
                    <input type="submit" 
                    onClick={shareData} 
                    name="signUp" 
                    value="Register" 
                    id="signUp" 
                    // autoComplete="off"
                    className="btn btn-primary"  />
                </div>
                </form>
                <div className="text-center">
                    <NavLink to="/signIN" >
                    I am already register ? <br /> 
                        <button className="btn-sm btn-secondary">
                            Login
                        </button>
                    </NavLink>
                </div>
            </div>
        </section>
    </>
    )
}
