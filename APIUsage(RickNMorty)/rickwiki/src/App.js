import './App.css';
import axios from 'axios';
import React, {Component} from 'react';

 

class App extends Component {
  state = {
    characters: []
  }
  componentDidMount() {
    axios.get('https://rickandmortyapi.com/api/character/')
    .then(res=>this.setState({characters:res.data}))
  }
  render( ){
    
    const {results = []} = this.state.characters;
    console.log('here',results);
    return(
      
      <div className ="App">
        <head>
        <title>Rick and Morty Character Wiki</title>
        <link rel="icon" href="/favicon.ico" />
        </head>
        <ul className="grid">
  {results.map(result => {
    const { id, name, image } = result;
    const base = window.location.origin + '/';
    console.log(base);
    return (
      <li key={id} className="card">
        <a href= {`${base}${id}`}>
        <img src={image} alt={`${name} Thumbnail`} />          
        <h3>{ name }</h3>
        </a>
      </li>
    )
  })}
</ul>
      </div>
    );
  }
}

export default App;
