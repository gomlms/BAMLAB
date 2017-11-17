import React, {Component} from 'react';

class SecondPoint extends Component {
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
    return(
      <div>
      <p>
      M117 Two point layer <br />
      G1 X{Math.trunc(this.state.radius)}<br />
      G1 Z{Math.trunc(-100 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispursed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc(100 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      G1 X{Math.trunc(-this.state.radius)}<br />
      G1 Z{Math.trunc(-100 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      G0 F4000<br />
      G1 E{this.state.amountDispursed}<br />
      M400<br />
      G4 S15<br />
      M400<br />
      G0 F4000<br />
      G1 E-25<br />
      G4 S5<br />
      G1 Z{Math.trunc(100 * (this.state.curLayer)/(this.state.numLayers + 1))}<br />
      </p>
      </div>
    );
  }
}

export default SecondPoint;
