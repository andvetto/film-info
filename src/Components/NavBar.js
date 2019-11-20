
import React from 'react';

function NavBar(props){


        console.log(props)
        
        return(
            <nav className="navbar navbar-light bg-light justify-content-center">

                <input className="form-control col-md-4" onChange={props.onChange} type="text" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" onClick={props.onClick} >Search</button>
            </nav>
        )
  

}

export default NavBar;
