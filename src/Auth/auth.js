import axios from 'axios';

const AUTH_URL = "http://127.0.0.1:8000/api/auth/"

function Auth(){

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

            console.log(result.data);
            localStorage.setItem('auth', JSON.stringify(result.data));

            return result.data;
        } catch (e){
            console.log(e)
            return e;
        }
    };

    const getToken = () => {
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
    
    const signup = () => {};

    const logout = async () => {
        addAxiosToken();
        try{
            const result = await axios.post(AUTH_URL + 'logout')

            localStorage.removeItem('auth');
            return result;
        } catch(e){
            console.log(e)
            return e;
        }

    };
  

    return {
        getUser,
        login,
        signup,
        logout
    }

}

const authMethods = Auth();
export default authMethods;
