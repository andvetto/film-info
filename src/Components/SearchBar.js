
import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../Auth/auth';

function SearchBar(props){

        const user = Auth.getUser();
        console.log(user)
        return(
            
            <nav className="navbar navbar-light bg-dark justify-content-center">


                <input className="form-control col-sm-4 my-2" id="cerca" onChange={props.onChange} type="text" value={props.default} placeholder="Search" aria-label="Search"/>
                <button className="btn btn-block btn-outline-success mx-2" disabled={props.disabled} onClick={props.onClick} >Search</button>

                { user ? null : (
                
                    <>
                    <NavLink exact to={ "/user/login" } className="btn btn-block btn-outline-info mx-2">
                        Login
                    </NavLink>
                    <NavLink exact to={ "/user/signup" } className="btn btn-block btn-outline-info mx-2">
                        Signup
                    </NavLink>
                    </>
                    )
                }
                { user ? (
                    <>
                    <NavLink exact to={ "/favorites/list" } className="btn btn-block btn-outline-warning mx-2">
                        {user.name}
                    </NavLink>

                    <NavLink exact to={ "/user/logout" } className="btn btn-block btn-outline-danger mx-2">
                        Logout
                    </NavLink>
                    </>
        ) : null
    }

            </nav>
        )
  

}

export default SearchBar;
