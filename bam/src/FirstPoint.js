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
    return(
      <p>
      M117 Single point layer<br />
      G1 Z{-1 * Math.trunc((20 * this.state.curLayer)/this.state.numLayers)}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispersed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc((20 * this.state.curLayer)/this.state.numLayers)}<br />
      <br />
      </p>
    );
  }
}

export default FirstPoint;
