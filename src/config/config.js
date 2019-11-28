function Config(){

    const API_BACKEND = "http://react-film-search.atwebpages.com/laravel-api";

    const AUTH_URL = "http://react-film-search.atwebpages.com/laravel-api/api/auth/";


    return {
        API_BACKEND,
        AUTH_URL,
    }

}




const configURL = Config();
export default configURL;