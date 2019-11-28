
import React from 'react';

import Auth from '../Auth/auth';
import IsLoading from './IsLoading';
import { trackPromise } from 'react-promise-tracker';


export default function Logout (props) {

    React.useEffect( () => {
        trackPromise(
        Auth.logout().then(() => {
            props.history.push('/');
        }));
       
    })
    
    return (
        <>
            <h3>Logging out</h3>
            <IsLoading color="#dc3545"/>
        </>
        )
}