import React, { Component } from 'react';
import './App.css';
import InfiniteScroller from 'react-infinite-scroller';

import Gifs from './Gifs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gifs : [],
      timerID : null,
      query : '',
      offset : 0,
      hasMore: false
    }

    this.search = this.search.bind(this);
    this.findGifs = this.findGifs.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  findGifs() {
    this.setState({hasMore: false});
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
      let tempOffset = this.state.offset + 10;
      this.setState({offset: tempOffset});
      console.log(this.state.offset);
      this.setState({hasMore: true});
    })
    .catch((err) => {
      console.log('an error occured, dang it \n' + err);
    })
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
      offset: 0,
      gifs: [],
      hasMore: false
    });
    this.search();
  }

  search() {
    clearTimeout(this.state.timerID);
    this.setState({timerID : setTimeout(() => {this.findGifs()}, 1000)});
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
          <InfiniteScroller
          pageStart={0}
          loadMore={this.findGifs}
          hasMore={this.state.hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
          initialLoad={false}
          >
            <Gifs gifs={this.state.gifs} />
          </InfiniteScroller>
        </header>
      </div>
    );
  }
}

export default App;

var GphApiClient = require('giphy-js-sdk-core')
var client = GphApiClient("8nkqc7oZFA0CefVuEIA1scfdhjQXZWz5")

//api key: 8nkqc7oZFA0CefVuEIA1scfdhjQXZWz5
