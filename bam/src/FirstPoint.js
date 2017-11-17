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
<<<<<<< HEAD
      G1 Z{-1 * Math.trunc(20 + 100 * (this.props.curLayer)/(this.props.numLayers + 1))}<br />
      G0 F4000<br />3
      G1 E{this.props.amountDispersed}<br />
=======
      G1 Z{-1 * Math.trunc(20 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispersed}<br />
>>>>>>> 5ec4f6b1728946b253bbeb1d5aa2f9d47e1d0b9d
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
<<<<<<< HEAD
      G1 Z{Math.trunc(20 + 100 * (this.props.curLayer)/(this.props.numLayers + 1))}<br />
=======
      G1 Z{Math.trunc(20 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
>>>>>>> 5ec4f6b1728946b253bbeb1d5aa2f9d47e1d0b9d
      <br />
      </p>
    );
  }
}

export default FirstPoint;
