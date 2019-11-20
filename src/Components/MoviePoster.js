
import React from 'react';
import { NavLink } from 'react-router-dom';
import IsLoading from './IsLoading';

class MoviePoster extends React.Component { 
        constructor(props) {
        super(props);
        this.state = {
            data: "",
            value: ""
        };
    }  

    componentDidUpdate(){
        let value = this.props.searchValue;
        const API_KEY = "apikey=7e18b2af";

        if(value!==this.state.value){
        fetch(`https://www.omdbapi.com/?s=${value}&${API_KEY}`)
            .then(response => {
                console.log(response.status);
                this.setState({ response: response, value: value }, () => console.log(this.state));
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
    }

    render(){
        
        if(this.state.data.Search){
            let films = this.state.data.Search;
            return (

            <>
                {films.map( film => 

                (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={film.imdbID} >

                        <div className="card" >
                            <img src={film.Poster} alt={film.Title} />
                            <div className="card-body">
                                <h5 className="card-title">{film.Title}</h5>
                                <p className="card-text">{film.Year}</p>
                                <NavLink exact to={ `/${film.imdbID}` } className="btn btn-primary">
                                    Go to detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}

            </>
            )
        }
        if(this.state.error) {
            let error = this.state.error;
            return <p>{error}</p>
        }
        if(!this.state.data.Search){
            return null
        }
        return <IsLoading/>
    }
}
export default MoviePoster;