import React, {Component} from 'react';

class FirstPoint extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      numLayers: props.numLayers,
      radius: props.radius,
      amountDispersed: props.amountDispersed,
      curLayer: props.curLayer,
    };
  }

  render(){
    console.log(this.props.curLayer);
    return(
      <p>
      M117 Single point layer<br />
      G1 Z{-1 * Math.trunc(20 + 100 * (this.props.curLayer)/(this.props.numLayers + 1))}<br />
      G0 F4000<br />3
      G1 E{this.props.amountDispersed}<br />
      G1 Z{-1 * Math.trunc(20 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispersed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc(20 + 100 * (this.props.curLayer)/(this.props.numLayers + 1))}<br />
      G1 Z{Math.trunc(20 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      <br />
      </p>
    );
  }
}

export default FirstPoint;
