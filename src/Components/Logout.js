
import React from 'react';

import Auth from '../Auth/auth';
import IsLoading from './IsLoading';
import { trackPromise } from 'react-promise-tracker';
import {UserDataContext} from '../Containers/logincontext';


export default function Logout (props) {

    const [, setUser] = React.useContext(UserDataContext);

    React.useEffect( () => {
        trackPromise(
        Auth.logout().then(() => {
            setUser(null);
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