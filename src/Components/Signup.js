

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../Auth/auth';
import IsLoading from './IsLoading';
import { trackPromise } from 'react-promise-tracker';

const Signup = (pars) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const signupUser = (e) => {
        e.preventDefault()
        trackPromise(
        Auth.signup(email, name, password)
            .then ( payload => {
                
                pars.history.push('/');
                
            }));

    }


    const resetForm = e => {
        e.preventDefault()
        setEmail('');
        setPassword('');
        setName('');
    }

    return(
        <>
        <h2 className=" mb-3">Signup</h2>
        <div className="row justify-content-center">
            
            <form className="form col-sm-6 col-md-4" onSubmit={signupUser}>

                <div className="form-group">
                    <label htmlFor="name" className="control-label">Username</label>
                    <input required name="name" id="name" value={name} className="form-field form-control"
                        onChange={e=>setName(e.target.value)} />
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
                    <NavLink exact to="/" className="btn btn-primary mx-2 my-2">
                        Go Back
                    </NavLink>
                    <button className="btn btn-danger" onClick={e=>resetForm(e)}>Reset</button>
                </div>

            </form>
            <IsLoading color="#2BAD60"/>
        </div>
        </>
    );

}

export default Signup;