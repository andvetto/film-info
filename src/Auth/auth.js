import Config from '../config/config';
import axios from 'axios';

const AUTH_URL = Config.AUTH_URL;

function Auth(){

    const isTokenExpired = () => {
        const expires = +localStorage.getItem('token-expires');
        const res = (new Date()) > expires;
        if(res){
            localStorage.removeItem('token-expires');
            localStorage.removeItem('auth');
        }
        return res;
    }

    const handleError = (resp) => {
            let message = '';
            switch (resp.status){
                case 401: 
                    message = resp.data.error;
                    break;
                /*
                case 500: 
                    message = resp.data.message;
                    break;
                */
                default:
                    message = 'Error contacting server.';
            }

            return message;
    }

    const addAxiosToken = () => {
        const token = getToken();
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }


    const login = async (email, password) => {

        try{
            const result = await axios.post( AUTH_URL + 'login',
                {
                    email,
                    password
                }
            );
            
            const data = result['data'];
            if(!data || !data['access_token']){
                return Promise.reject('Invalid server response');
            }

            const expireDate = (new Date()).getTime() + data['expires_in']*1000;

            localStorage.setItem('token-expires', expireDate);
            localStorage.setItem('auth', JSON.stringify(result.data));

            return result.data;
        } catch (e){
            return Promise.reject(handleError(e.response));
        }
    };

    const getToken = () => {

        if(isTokenExpired()){
            return null
        }

        const auth = JSON.parse(localStorage.getItem('auth'));
        if(auth) {
            return auth.access_token
        }
        return null
    };

    const getUser = () => {

        const auth = JSON.parse(localStorage.getItem('auth'));
        if(auth) {
            return auth.user
        }
        return null
    };
    
    const signup = async (email, name, password) => {

        try{
            const result = await axios.post( AUTH_URL + 'signup',
                {
                    email,
                    name,
                    password,

                }
            );

            const data = result['data'];
            if(!data || !data['access_token']){
                return Promise.rejected('Invalid server response');
            }
            
            const expireDate = (new Date()).getTime() + data['expires_in']*1000;

            localStorage.setItem('token-expires', expireDate);

            localStorage.setItem('auth', JSON.stringify(result.data));

            return result.data;
        } catch (e){
            return Promise.reject(handleError(e.response));
        }
    };

    const logout = async () => {
        addAxiosToken();
        try{
            
            const result = await axios.post(AUTH_URL + 'logout')
            localStorage.removeItem('auth');
            
            return result;
        } catch(e){
            //console.log(e)
            return e;
        }

    };
  

    return {
        getUser,
        login,
        signup,
        logout,
        getToken,
        isTokenExpired,

    }

}

const authMethods = Auth();
export default authMethods;
