
import React from 'react';
import { NavLink } from 'react-router-dom';

class MoviePoster extends React.Component { 
        constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }  

    componentDidMount(){

        fetch("http://www.omdbapi.com/?s=Batman&page=2&apikey=7e18b2af")
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
            /*
            .catch(error => {
                console.log("error", JSON.stringify(error));
                this.setState({
                    ajaxCompleted: true,
                    status: false,
                    data: JSON.stringify(error),
                    strip: "https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg",
                });
            });
            */
    }
    render(){
        if(this.state.data.Search){
            var films = this.state.data.Search;
            return (

            <>
                {films.map( film => 

                (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={film.imdbID} >

                        <div className="card" >
                            <img src={film.Poster} alt="img" />
                            <div className="card-body">
                                <h5 className="card-title">{film.Title}</h5>
                                <p className="card-text">{film.Year}</p>
                                <NavLink exact to={ `/${film.imdbID}` } className="btn btn-primary">
                                    Go somewhere
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}

            </>
            )
        } else {
            return <p>Is Loading...</p>
        }
    }
}
export default MoviePoster;