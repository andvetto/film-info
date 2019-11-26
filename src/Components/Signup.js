

import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const signupUser = (e) => {
        e.preventDefault()
        alert(email)
    }


    const resetForm = e => {
        e.preventDefault()
        setEmail('');
        setPassword('');
        setUsername('');
    }

    return(
        
        
        <div className="container-fluid text-center">
            <h2 className=" mb-3">Signup</h2>
            <form className="form col-sm-6 offset-sm-3 col-md-4 offset-md-4" onSubmit={signupUser}>

                <div className="form-group">
                    <label htmlFor="username" className="control-label">Username</label>
                    <input required name="username" id="username" value={username} className="form-field form-control"
                        onChange={e=>setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <input required name="email" id="email" value={email} className="form-field form-control"
                        onChange={e=>setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="control-label">Password</label>
                    <input required name="password" id="password" type="password" value={password} className="form-field form-control"
                        onChange={e=>setPassword(e.target.value)} />

                </div>

                <div className="form-group">
                    <button className="btn btn-success">Signup</button>
                    <NavLink exact to="/" className="btn btn-primary mx-2">
                        Go Back
                    </NavLink>
                    <button className="btn btn-danger" onClick={e=>resetForm(e)}>Reset</button>
                </div>

            </form>
        </div>
    );

}

export default Signup;