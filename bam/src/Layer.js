import React, {Component} from 'react';
import FirstPoint from './FirstPoint.js';
import SecondPoint from './SecondPoint.js';

class Layer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      numLayers: props.numLayers,
      curLayer: props.curLayer,
      pointsLayer: props.pointsLayer,
      amountDispersed: props.amountDispersed,
      radius: props.radius
    };
  }

  render(){
    let point = [];

    if(this.state.pointsLayer == 1){
      point.push(<p>HI</p>);
    }

    return(
      <div>
        {point}
      </div>
    );
  }
}

export default Layer;
