
import React from 'react';

function NavBar(props){


   
        
        return(
            <nav className="navbar navbar-light bg-light justify-content-center">

                <input className="form-control col-md-4 " onChange={props.onChange} type="text" placeholder="Search" aria-label="Search"/>
         
            </nav>
        )
  

}

export default NavBar;
