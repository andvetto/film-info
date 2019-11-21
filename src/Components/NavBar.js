
import React from 'react';

function NavBar(props){

        
        return(
            <nav className="navbar navbar-light bg-dark justify-content-center">

                <input className="form-control col-md-4" onChange={props.onChange} type="text" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success mx-2" onClick={props.onClick} >Search</button>
            </nav>
        )
  

}

export default NavBar;
