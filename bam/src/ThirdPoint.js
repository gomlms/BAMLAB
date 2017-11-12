import React, {Component} from 'react';

class ThirdPoint extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      radius: props.radius,
      amountDispursed: props.amountDispursed,
      numLayers: props.numLayers,
      curLayer: props.curLayer,
    };
  }

  render(){
    return
      <p>
      M117 Three point layer<br />
      G1 X{Math.trunc(this.state.radius)}<br />
      G1 Z{Math.trunc(-20*this.state.curLayer/this.state.numLayers)}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispursed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc(20*this.state.curLayer/this.state.numLayers)}<br />
      G1 X0<br />
      G1 Z{Math.trunc(-20*this.state.curLayer/this.state.numLayers)}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispursed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc(20*this.state.curLayer/this.state.numLayers)}<br />
      G1 X{-Math.trunc(this.state.radius)}<br />
      G1 Z{Math.trunc(-20*this.state.curLayer/this.state.numLayers)}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispursed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc(20*this.state.curLayer/this.state.numLayers)}<br />
      </p>
    );
  }
}

export default ThirdPoint;
