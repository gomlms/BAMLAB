import React, {Component} from 'react';

class GCodeHolder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      gCode: "",
    }
  }

  render(){

    return(
      <div>
      <p>
      M117 Cold Extrusion <br />
      M302 S0 <br />
      G90 <br />
      M117 Calibration <br />
      G0 Z45 F6000 <br />
      M117 Homing X and Y <br />
      G28 X Y <br />
      M117 Homing Z <br />
      G0 X45 Y100 <br />
      G28 Z <br />
      G90 <br />
      M117 Centering Needle Over Beaker <br />
      G0 Z145 <br />
      M117 Center of plate <br />
      G0 X137.50 Y67.50 <br />
      G90 <br />
      M117 Centering over Beaker <br />
      G0 Z145 <br />
      G0 X137.50 Y67. <br />
      M117 Switch to Relative Coordinates <br />
      G91 <br />

      {this.state.gcode}
      </p>
      </div>
    )
  }
}
export default GCodeHolder;
