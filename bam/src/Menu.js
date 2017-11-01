import React, {Component} from 'react';
import './Menu.css';

class Menu extends Component {
  render(){
    return(
      <div className='site'>
        <div className='leftSide'>
          <div className='title'>
            <h1>Bam Lab G-Code Generator</h1>
          </div>
          <div>
            <div>
              <h3 className='slider'>Pattern</h3>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
              </div>
            </div>
            <div>
              <h3 className='slider'>Move Speed</h3>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
              </div>
            </div>
            <div>
              <h3 className='slider'>Flow Rate</h3>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
              </div>
            </div>
            <div>
              <h3 className='slider'>Pattern Scale</h3>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
              </div>
            </div>
            <button type="button">Submit</button>
          </div>
        </div>
        <p className='gcode'>
        ;Homeing Needle Gcode<br />
        ; Michael Restaino 10/10/2017<br />
        <br />
        Firmware Marlin<br />
        <br />
        M118 Cold Extrusion<br />
        M302 S0<br />
        G90<br />
        M117 Calibration<br />
        G0 Z45 F6000<br />
        M117 Homing X and Y<br />
        G28 X Y<br />
        M117 Homing Z<br />
        G0 X45  Y100<br />
        G28 Z<br />
        G90<br />
        M117 Centering Needle Over Beaker<br />
        G0  Z45<br />
        G0 X137.50 Y67.50<br />

        G90<br />
        M117 Centering over Beaker<br />
        G0  Z45 ; Raise to just above Beaker Rim<br />
        G0 X137.50 Y67.<br />
        M117 Switch to Relative Coordinates<br />
        G91; Relative Coordiantes<br />


        M117 Center Bottom<br />
        G1 Z-30<br />
        G0 F4000<br />
        G1 E50<br />
        M400<br />
        G4 S15<br />
        M400<br />
        G0 F4000<br />
        G1 E-25<br />
        G4 S5<br />
        G1 Z10<br />
<br />
        M117 Center Top<br />
        G0 F4000<br />
        G1 E40<br />
        M400<br />
        G4 S10<br />
        M400<br />
        G1 E-25<br />
        G4 S5<br />
        G1 Z20<br />
<br />
<br />
        M117 Top Right<br />
        G0 X15 Y15<br />
        G1 Z-20<br />
        G0 F4000<br />
        G1 E30<br />
        M400<br />
        G4 S10<br />
        M400<br />
        G1 E-25<br />
        G4 S5<br />
        G1 Z20<br />
<br />
<br />
        M117 Bottom Right<br />
        G1 Y-30<br />
        G1 Z-20<br />
        G0 F4000<br />
        G1 E30<br />
        M400<br />
        G4 S10<br />
        M400<br />
        G1 E-25<br />
        G4 S5<br />
        G1 Z20<br />
<br />
<br />
        M117 Bottom Left<br />
        G1 X-30<br />
        G1 Z-20<br />
        G0 F4000<br />
        G1 E30<br />
        M400<br />
        G4 S10<br />
        M400<br />
        G1 E-25<br />
        G4 S5<br />
        G1 Z20<br />
<br />
<br />
        M117 Top Left<br />
        G1 Y30<br />
        G1 Z-20<br />
        G0 F4000<br />
        G1 E30<br />
        M400<br />
        G4 S10<br />
        M400<br />
        G1 E-25<br />
        G4 S5<br />
        G1 Z20<br />
<br />
<br />

        M117 Homing...<br />
        G90 ; Back to Absolute Coordinates<br />
        G0  Z45<br />
        G0 X137.50 Y67.50<br />
<br />
        M117 Finished Deposition<br />
        G4 P500
        </p>
      </div>
    );
  }
}

export default Menu;
