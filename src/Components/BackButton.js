import React from 'react';
import { NavLink } from 'react-router-dom';

function BackButton(props){

        return(
            <div className="row">
                <div className="col-12">
                    <NavLink exact to={ "/" } className="btn btn-info my-2">
                        Go Back
                    </NavLink>
                </div>
            </div>
        )
  

}

export default BackButton;
