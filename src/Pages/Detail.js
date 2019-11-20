
import React from 'react';
import { NavLink } from 'react-router-dom';
import IsLoading from '../Components/IsLoading';

class Detail extends React.Component { 


        constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }  

    componentDidMount(props){

        let imdbID = this.props.match.params.imdbID;
        const API_KEY = "apikey=7e18b2af";

        fetch(`https://www.omdbapi.com/?i=${imdbID}&${API_KEY}`)
            .then(response => {
                console.log(response.status);
                this.setState({ response: response }, () => console.log(this.state));
                return response.json();
            })
            .then(data => {
                console.log("success", data);
                this.setState({
                    ajaxCompleted: true,
                    data: data,
               
                }, () => console.log(this.state));
            })
            .catch(error => this.setState({ error: error }));
    }
    
    render(){
        if(this.state.data){
            let film = this.state.data;
            return (
                <div className="container text-center border border-secondary py-3 my-3">
                    <h2>{film.Title}</h2>
                    <img src={film.Poster} className="my-3" alt={film.Title} />
                    <p>{film.Plot}</p>
                    <p>Director: {film.Director}</p>
                    <p>Actors: {film.Actors}</p>
                    <p>Genre: {film.Genre}</p>
                    <p>Runtime: {film.Runtime}</p>
                    <p>Year: {film.Year}</p>
                    <NavLink exact to="/" className="btn btn-primary">
                        Go Back
                    </NavLink>
                </div>

      
              

            )
        }
        if(this.state.error) {
            let error = this.state.error;
            return <p>{error}</p>
        }
        return <IsLoading/>
    }
}
export default Detail;