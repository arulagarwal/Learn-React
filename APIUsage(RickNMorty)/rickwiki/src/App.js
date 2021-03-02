import './App.css';
import axios from 'axios';
import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import { withRouter } from "react-router";

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
    return(
      <Router>
      <div className ="App">
        <Route path = "/" exact render ={props => (
          <React.Fragment>
        <head>
        <title>Rick and Morty Character Wiki</title>
        <link rel="icon" href="/favicon.ico" />
        </head>
        <ul className="grid">
        {results.map(result => {
        const { id, name, image } = result;
        const base = window.location.origin + '/';
        return (
          
          <li key={id} className="card">
          <Link to={`/${id}`}>
          <img src={image} alt={`${name} Thumbnail`} />          
          <h3>{ name }</h3>
          </Link>
          </li>
          )
        })}
        </ul>
          </React.Fragment>
        )}/>
        <Route path="/:id" exact children={<Child />} />
      </div>
      </Router>
    );
  }
}


function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;
  const [charInfo, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${defaultEndpoint}${id}`);
      const data = await res.json();
      setInfo(data);
      setLoading(false);
    }
    fetchData()
  },[id, defaultEndpoint]);

  console.log(charInfo);
  
  //const { name, image, gender, location, origin, species, status } =charInfo;
 /* return (
    <div>
      {loading ? <div>loading...</div> : <div>{id}</div>}
      
    </div>
  );*/
  if(loading){
    return(<div>loading...</div>);
  }else{
    const { name, image, gender, location, origin, species, status } =charInfo;
    return(<div>{name}</div>);
  }
}

export default App;
