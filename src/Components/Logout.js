
import React from 'react';

import Auth from '../Auth/auth';


export default function Logout (props) {

    React.useEffect( () => {

        Auth.logout().then(() => {
            props.history.push('/');
        });
       
    })
    
    return null
}