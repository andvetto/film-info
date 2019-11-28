import Config from '../config/config';
import React from 'react';
import { NavLink } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Auth from '../Auth/auth';
import IsLoading from '../Components/IsLoading';
import { trackPromise } from 'react-promise-tracker';

const axios = require('axios');
const API_BACKEND = Config.API_BACKEND;
//const API_URL = 'http://localhost:3004'

export default class Favorites extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            response: "",
            films:[],
            user: Auth.getUser(),
            token: Auth.getToken(),
        };
        
    } 

    

    componentDidMount() {
    //    fetch(API_URL + '/posts')
    //    fetch(`https://film-info-35efc.firebaseio.com/favorite.json`)
    let token = this.state.token;
        
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    trackPromise(
    axios.get(`${API_BACKEND}/favorites/list/${this.state.user.id}`)
        .then(response => this.setState({ films: response.data }))
        .catch(error => this.setState({ error: error })));
    }

    render(){
        console.log(this.state.films, "pippo")
        if(this.state.films){
            var films = this.state.films;
            
            return (
                <>
                
                <div className="container-fluid text-center mb-2">
                    <h3 className="mb-3">I preferiti di {this.state.user.name}</h3>
                    <BackButton/>
                </div>
                
                <IsLoading color="#ffc107"/>
                <div className="row justify-content-center">
                    {films.map( film => 


                    (
                        <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={film.id} >

                            <div className="card" >
                                <img src={film.img!=="N/A"? film.img : "https://via.placeholder.com/300x400"} alt={film.title} />
                                <div className="card-body text-dark">
                                    <h5 className="card-title">{film.title}</h5>
                                    <p className="card-text">{film.year}</p>
                                    <NavLink exact to={ `/detail/${film.imdbID}` } className="btn btn-primary mx-2 my-2">
                                        Go to detail
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                
                </div>
                </>
            )
        }
         return (
            <> 
            
            <div className="container-fluid text-center mb-2">
                <h3 className="mb-3">Non hai inserito alcun film tra i preferiti!</h3>
                <BackButton/>
            </div>
            </>
         )
    } 
   
  
}


