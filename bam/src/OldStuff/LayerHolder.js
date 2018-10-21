import React, {Component} from 'react';

class LayerHolder extends Component {
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
    return(
      <div>

      </div>
    );
  }
}

export default LayerHolder;
