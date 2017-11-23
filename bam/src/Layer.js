import React, {Component} from 'react';
import FirstPoint from './FirstPoint.js';
import SecondPoint from './SecondPoint.js';
import ThirdPoint from './ThirdPoint.js';

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
  
    if(this.state.pointsLayer === 1){
      point.push(<FirstPoint key={this.props.curLayer} numLayers={this.props.numLayers} radius={this.props.radius} curLayer={this.props.curLayer} amountDispersed={this.props.amountDispersed}/>);
    } else if(this.state.pointsLayer === 2){
      point.push(<SecondPoint key={this.props.curLayer} numLayers={this.props.numLayers} radius={this.props.radius} curLayer={this.props.curLayer} amountDispersed={this.props.amountDispersed}/>);
    } else if(this.state.pointsLayer === 3){
      point.push(<ThirdPoint key={this.props.curLayer} numLayers={this.props.numLayers} radius={this.props.radius} curLayer={this.props.curLayer} amountDispersed={this.props.amountDispersed}/>);
    }

    return(
      <div>
        {point}
      </div>
    );
  }
}

export default Layer;
