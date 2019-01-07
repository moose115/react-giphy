import React, { Component } from 'react';
import './App.css';

import Gifs from './Gifs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gifs : [],
      timerID : null,
      query : '',
      offset : 0
    }

    this.search = this.search.bind(this);
    this.findGifs = this.findGifs.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  findGifs() {
    console.log('I am about to search!');
    client.search('gifs', {"q": this.state.query, offset: this.state.offset})
    .then((response) => {
      let tempGifs = this.state.gifs;
      response.data.forEach((el) => {
        tempGifs.push(el);
      });
      this.setState({gifs : tempGifs.map((el) => {
        console.log(el);
        return el;
      })});
      this.setState({offset: this.state.gifs.length});
      console.log(this.state.offset);
    })
    .catch((err) => {
      console.log('an error occured, dang it \n' + err);
    })
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
      offset: 0
    });
    this.search();
  }

  search() {
    clearTimeout(this.state.timerID);
    this.setState({timerID : setTimeout(() => {this.findGifs()}, 2000)});
  }

  componentWillMount() {

  }

  render() {



    return (
      <div className="App">
        <header className="App-header">
          <input type='text' onChange={this.handleChange} className='search-input'/>
          <p>
            Here are your gifs:
          </p>
          <Gifs gifs={this.state.gifs} />
        </header>
      </div>
    );
  }
}

export default App;

var GphApiClient = require('giphy-js-sdk-core')
var client = GphApiClient("8nkqc7oZFA0CefVuEIA1scfdhjQXZWz5")

//api key: 8nkqc7oZFA0CefVuEIA1scfdhjQXZWz5
