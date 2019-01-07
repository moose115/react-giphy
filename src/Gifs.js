import React, {Component} from 'react';
import Gif from "./Gif";

class Gifs extends Component {



  render() {

    let gifs = this.props.gifs.map((el) => {
      console.log(el);
      console.log(this.props.gifs);
      return <Gif url={el.images.fixed_height.url} key={el.id}/>;
    });

    console.log(gifs);

      return (
          <div>
            {gifs}
          </div>
      )
  }
}

export default Gifs;
