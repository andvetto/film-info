
import React from 'react';
import { NavLink } from 'react-router-dom';

class Detail extends React.Component { 


        constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }  

    componentDidMount(props){

        let imdbID = this.props.match.params.imdbID;

        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=7e18b2af`)
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
        } else {
            return <p>Is Loading...</p>
        }
    }
}
export default Detail;