
function Validation(){

    
    const validateEmail = (email) => {
        // eslint-disable-next-line
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(document.getElementById("email")){
            if(re.test(email)){
                document.getElementById("email").classList.add("is-valid");
                document.getElementById("email").classList.remove("is-invalid");
            }
            if(!re.test(email)){
                document.getElementById("email").classList.add("is-invalid");
                document.getElementById("email").classList.remove("is-valid");
            }
        }

        return re.test(email);
    }

    const validatePassword = (password) => {
        // eslint-disable-next-line
        var re = /^(?=.*?[0-9])(?=.*?[a-zA-Z]).{8,16}$/;

        if(document.getElementById("password")){
            if(re.test(password)){
                document.getElementById("password").classList.add("is-valid");
                document.getElementById("password").classList.remove("is-invalid");
            }
            if(!re.test(password)){
                document.getElementById("password").classList.add("is-invalid");
                document.getElementById("password").classList.remove("is-valid");
            }
        }

        return re.test(password);
    }

    const validateUsername = (name) => {
        // eslint-disable-next-line
        var re = /^[a-zA-Z0-9]{4,16}$/;

        if(document.getElementById("name")){
            if(re.test(name)){
                document.getElementById("name").classList.add("is-valid");
                document.getElementById("name").classList.remove("is-invalid");
            }
            if(!re.test(name)){
                document.getElementById("name").classList.add("is-invalid");
                document.getElementById("name").classList.remove("is-valid");
            }
        }

        return re.test(name);
    }

    const validateSignup = (name, email, password) => {

        if ( validateEmail(name) === false || validatePassword(email) === false || validateUsername(password) === false ){
            return false;
        }
        return true
    }

    const validateLogin = (email, password) => {

        if ( validateEmail(email) === false || validatePassword(password) === false){
            return false;
        }
        return true;
    }

    return {
        validateSignup,
        validateLogin,
        validateEmail,
        validatePassword,
        validateUsername,

    }

}

const validationMethods = Validation();
export default validationMethods;