import Config from '../config/config';
import React from 'react';
import { NavLink } from 'react-router-dom';
import IsLoading from '../Components/IsLoading';
import { trackPromise } from 'react-promise-tracker';
import Auth from '../Auth/auth';
const axios = require('axios');

const API_BACKEND = Config.API_BACKEND;



class Detail extends React.Component { 


        constructor(props) {
        super(props);
        this.state = {
            data: "",
            risultato: [],
            user: Auth.getUser(),
            token: Auth.getToken(),
            isTokenExpired: Auth.isTokenExpired(),
            
        };

    }  

    

    componentDidMount(props){

        let imdbID = this.props.match.params.imdbID;
        const API_KEY = "apikey=7e18b2af";

        trackPromise(
        fetch(`https://www.omdbapi.com/?i=${imdbID}&${API_KEY}`)
            .then(response => {
                
                this.setState({ response: response });
                return response.json();
            })
            .then(data => {
                
                this.setState({
                    ajaxCompleted: true,
                    data: data,
               
                });
                return data;
            }).then(film => {
                //fetch(`http://localhost:3004/posts?title=${film.Title}`)
                //fetch(`https://film-info-35efc.firebaseio.com/favorite/films/${film.imdbID}.json`)
                axios.get(`${API_BACKEND}/favorites/${this.state.user.id}/detail/${film.imdbID}`)
                .then(risposta => {
                        
                    if(risposta.data.length!==0){
                        this.setState({ risultato: [risposta.data[0].title]})
                    } else{
                        this.setState({ risultato: []})
                    } 
                });
                               
            }))
                
                                        
            .catch(error => this.setState({ error: error }));

    }


    cancella() {
        
        let film = this.state.data;
        let token = this.state.token;
        
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }

   
        //fetch(`https://film-info-35efc.firebaseio.com/favorite/films/${film.imdbID}.json`, 
        axios.delete(`${API_BACKEND}/favorites/${this.state.user.id}/delete/${film.imdbID}`)
        .then(() => this.setState({ risultato: []} ));
        
    }

    manda() {

        let film = this.state.data;
        let token = this.state.token;

        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        axios.post(`${API_BACKEND}/favorites`, 

        {
            
            "user_id" : `${this.state.user.id}`, 
            "title" : `${film.Title}`,
            "year" : `${film.Year}`,
            "plot" : `${film.Plot}`,
            "genre" : `${film.Genre}`,
            "actors" : `${film.Actors}`,
            "director" : `${film.Director}`,
            "runtime" : `${film.Runtime}`,
            "img" : `${film.Poster}`,
            "imdbID" : `${film.imdbID}`,
                
        })
        .then(this.setState({ risultato: [1,2]} ))
        //.then(console.log(this.state.risultato, "pippo"))
    }


findLongestWord(str) {
    var array = str.split(' ')
    var longestWord = "";

    array.forEach(function(word) {
        if(word.length > longestWord.length) {
            longestWord = word;
        }
    });

    return longestWord;
}

    render(){
        var bottone;
        //console.log(this.state.token)
        //console.log(this.state.risultato, "pluto")
        //var classe = this.state.risultato.length ? "gialla" : "bianca" ;
        if(this.state.user && !this.state.isTokenExpired){

        
            if(this.state.risultato.length===0){
                bottone = <i className="fa fa-star stellaBianca" onClick={() => this.manda()} aria-hidden="true"></i>

            } else {
                bottone = <i className="fa fa-star stellaGialla" onClick={() => this.cancella()} aria-hidden="true"></i>
            }
        }

        if(this.state.data){
            let film = this.state.data;
            return (
                <div className="container text-center border border-secondary py-3">
                    <h2>{film.Title}</h2>
                    <img src={film.Poster!=="N/A"? film.Poster : "https://via.placeholder.com/300x410"} className="my-3" alt={film.Title} />
                    <p>{film.Plot}</p>
                    <p>Director: {film.Director}</p>
                    <p>Actors: {film.Actors}</p>
                    <p>Genre: {film.Genre}</p>
                    <p>Runtime: {film.Runtime}</p>
                    <p>Year: {film.Year}</p>
                    <NavLink exact to={"/" + this.findLongestWord(film.Title)} className="btn btn-primary mx-2">
                        Go Back
                    </NavLink>
                    {bottone}
                </div>
              

            )
        }
        if(this.state.error) {
            let error = this.state.error;
            return <p>{error}</p>
        }
        return <IsLoading color="#007bff"/>
    }
}
export default Detail;