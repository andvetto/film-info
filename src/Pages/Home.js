
import React from 'react';
import MoviePoster from '../Components/MoviePoster';
import NavBar from '../Components/NavBar';


class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

   handleClick(){
        let value = this.state.value;
        const API_KEY = "apikey=7e18b2af";
        console.log(value,"paperino");
        if(value===this.state.value){
        fetch(`https://www.omdbapi.com/?s=${value}&${API_KEY}`)
            .then(response => {
                console.log(response.status);
                this.setState({ response: response, value: value }, () => console.log(this.state));
                return response.json();
            })
            .then(data => {
                console.log("success", data);
                this.setState({
                    data: data,
               
                }, () => console.log(this.state));
            })
            .catch(error => this.setState({ error: error }));
        }       
    }
    
    render() {
        
        return(
            <>
            <NavBar onClick={() => this.handleClick()} onChange={event => this.handleChange(event)} />
            <div className="row py-3" id="showResults" >
                <MoviePoster ricerca={this.state.data} error={this.state.error} />
            </div>
            </>
        )
  
        
    }
}

export default Home;