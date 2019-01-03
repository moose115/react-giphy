import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Gif from './Gif';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gifs : [],
      timerID : null,
      query : ''
    }
    
    this.search = this.search.bind(this);
    this.findGifs = this.findGifs.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  findGifs() {
    console.log('I am about to search!');
    client.search('gifs', {"q": this.state.query})
    .then((response) => {
      console.log(response);
      this.setState({gifs : response.data});
      console.log('found: ' + this.state.gifs);
    })
    .catch((err) => {
      console.log('an error occured, dang it \n' + err);
    })
  }

  handleChange(event) {
    console.log('Change accured');
    this.setState({query: event.target.value});
    this.search();
  }

  search() {
    clearTimeout(this.state.timerID);
    this.setState({timerID : setTimeout(() => {this.findGifs()}, 2000)});
  }

  render() {

    const gif = this.state.gifs.map((el, i) => {
      console.log(el.images.fixed_height.url + ' ' + el.id);
      return <Gif gif={el.images.fixed_height.url} key={el.id} />
    });

    return (
      <div className="App">
        <header className="App-header">
          <input type='text' onChange={this.handleChange} className='search-input'/>
          <p>
            Here are your gifs:
          </p>
          <div>{gif}</div>
        </header>
      </div>
    );
  }
}

export default App;

var GphApiClient = require('giphy-js-sdk-core')
var client = GphApiClient("8nkqc7oZFA0CefVuEIA1scfdhjQXZWz5")

//api key: 8nkqc7oZFA0CefVuEIA1scfdhjQXZWz5