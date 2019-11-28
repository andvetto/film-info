
import React from 'react';
import MoviePoster from '../Components/MoviePoster';
import SearchBar from '../Components/SearchBar';


class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.match.params.titolo || "",
            disabled: true
        };
    
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        
        //console.log(this.state);
        this.handleClick();
    }

    handleChange(event) {
      

        this.setState({value: event.target.value});
        if(event.target.value.length > 2){
            this.setState({disabled: false})
        }
        else if(event.target.value.length <= 2){
            this.setState({disabled: true})
        }
   
    }

   handleClick(){
        let value = this.state.value;
        const API_KEY = "apikey=7e18b2af";
        //console.log(this.state);
        if(value===this.state.value){
        fetch(`https://www.omdbapi.com/?s=${value}&${API_KEY}`)
            .then(response => {             
                this.setState({ response: response, value: value });
                return response.json();
            })
            .then(data => {
                
                this.setState({
                    data: data,
               
                });
            })
            .catch(error => this.setState({ error: error }));
        }       
    }
    
    render() {

        return(
            <>
            <SearchBar onClick={() => this.handleClick()} onChange={event => this.handleChange(event)} default={this.state.value} disabled={this.state.disabled}/>
            <div className="row py-3 justify-content-center" id="showResults" >
                <MoviePoster ricerca={this.state.data || "default"} error={this.state.error} />
            </div>
            </>
        )
  
        
    }
}

export default Home;