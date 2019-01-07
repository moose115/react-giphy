import React, {Component} from 'react';

class Gif extends Component {



    render() {
        return (
            <img src={this.props.url} alt="gif"/>
        )
    }
}

export default Gif;
