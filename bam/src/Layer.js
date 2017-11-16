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
    var i = 0;

    if(this.state.pointsLayer == 1){
      point.push(<FirstPoint key={this.state.curLayer} numLayers={this.state.numLayers} radius={this.state.radius} curLayer={this.state.curLayer} amountDispersed={this.state.amountDispersed}/>);
    } else if(this.state.pointsLayer == 2){
      point.push(<SecondPoint key={this.state.curLayer} numLayers={this.state.numLayers} radius={this.state.radius} curLayer={this.state.curLayer} amountDispersed={this.state.amountDispersed}/>);
    }

    return(
      <div>
        {point}
      </div>
    );
  }
}

export default Layer;
