import React, {Component} from 'react';

class Gif extends Component {

    

    render() {
        return (
            <img src={this.props.gif} alt='' />
        )
    }
}

export default Gif;