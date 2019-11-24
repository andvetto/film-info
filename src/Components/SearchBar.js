
import React from 'react';
import { NavLink } from 'react-router-dom';

function SearchBar(props){

        return(
            <nav className="navbar navbar-light bg-dark justify-content-center">
                <NavLink exact to={ "/favorites/list" } className="btn btn-block btn-outline-warning mx-2">
                    Favourites
                </NavLink>
                <input className="form-control col-sm-4 my-2" id="cerca" onChange={props.onChange} type="text" value={props.default} placeholder="Search" aria-label="Search"/>
                <button className="btn btn-block btn-outline-success mx-2" disabled={props.disabled} onClick={props.onClick} >Search</button>
            </nav>
        )
  

}

export default SearchBar;
