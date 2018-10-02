import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

/*
  In the 3x3x3, Material 1 has 4 dots on the bottom and Material 2
  has 5 dots on the bottom

  IMPORTANT NOTES:
  Height is not accurate because the printer wasn't working and we don't know the relative height of the beaker
  Material 1 is the only one with the line of best fit, so Material 2 does not output accurate materials
  There is no error catching right now because we also don't know what the minimum consistent mL value it can print
*/

class Home extends Component {
  constructor(props){
    super(props);

    // Percent of total volume of mat 1
    this.percentMat1 = .5;
    // Percent of total volume of mat 2
    this.percentMat2 = .5;

    // Amount to rotate servo to output material 1
    this.matRotation1 = 86;
    // Amount to rotate servo to output material 2
    this.matRotation2 = 165;

    // Highest Point Mechanism should go in order to ensure the needle
    // doesn't hit the beaker
    this.highPoint = 140;

    //Center Point for Beaker
    this.center = {};
    this.center.x = 122.4;
    this.center.y = 85.2;
    
    // Change in height seems to be linear, 140 seems like a good height to determine how far to go down
    this.baseHeight = 140;

    // GCode Holder
    this.gCode = "";

    // GCode Base
    this.base = "G90\r\n" + "G1 Z" + this.highPoint + "\r\n" + "M400\r\n" + "G1 X" + this.center.x + " Y" + this.center.y + "\r\n" + "M400\r\n" + "G91\r\n" + "T1\r\n";

    this.state = {
      diameter: 0,
      volume: 0,
      height: 0
    }
  }

  getBigBoy = () => {
    var material1 = this.getExtrusionValue(0, this.percentMat1 * this.state.volume);
    var material2 = this.getExtrusionValue(1, this.percentMat2 * this.state.volume);                                                    
    this.gCode = this.base + "M280 P0 S" + this.matRotation1 + "\r\nG1 Z-" + (this.highPoint - this.state.height + (this.highPoint - this.baseHeight)) + "\r\nM400\r\n" + "G1 E" + material1 + " F4000\r\n";
    this.gCode += "G4 S5\r\n" + "M400\r\n" + "G1 Z" + (this.highPoint - this.state.height + (this.highPoint - this.baseHeight)) + "\r\nM400\r\n" + "M280 P0 S" + this.matRotation2 + "\r\n" + "M400\r\n";
    this.gCode += "T0\r\n" + "G1 Z-" + (this.highPoint - this.state.height + (this.highPoint - this.baseHeight) - (this.state.height / 4));
    this.gCode += "\r\nM400\r\n" + "G1 E" + material2 + "\r\nG4 S5\r\n" + "M400\r\n" + "G1 Z" + (this.highPoint - this.state.height + (this.highPoint - this.baseHeight) - (this.state.height / 4)) + "\r\nM400\r\n";

    console.log("Setting Big Boy");
  }

  getEqualBoy= () => {
    var incHeight = this.state.height / 3;
    this.gCode = "";

    for(var i = 0; i < 3; i++){
      this.gCode += this.getPointCode(i%2, incHeight, "G1 X" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode((i + 1) % 2, incHeight, "G1 Y-" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode(i%2, incHeight, "G1 Y" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode((i+1)%2, incHeight, "G1 X-" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode((i+1)%2, incHeight, "G1 Y" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode(i % 2, incHeight, "G1 X-" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode(i%2, incHeight, "G1 X" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode((i+1)%2, incHeight, "G1 X" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      this.gCode += this.getPointCode(i%2, incHeight, "G1 X" + (this.state.diameter * 0.8)/2 + "\r\nM400\r\n");
      incHeight += this.state.height/3;
    }
  }

  getPointCode = (matNum, incH, XY) => {
    // 50 is arbitrary amount for now that worked with this beaker
    var baseDrop = this.state.height - 50;

    var rotate = "M280 P0 S" + this.matRotation2 + "\r\n";
    if (matNum == 0) {
      rotate = "M280 P0 S" + this.matRotation1 + "\r\n";
    }
    
    var e = this.getExtrusionValue(matNum, this.percentMat1 * this.state.volume);
    if(matNum == 0){
      e = e / 13;
    } else {
      e = e / 14;
    }
    var output = "T" + matNum + "\r\nG1 Z-" + baseDrop + (Math.round(incH * 100) / 100) + "\r\nM400\r\n" + "G1 E" + (Math.round(e * 100) / 100) + " F4000\r\n";
    output += "G4 S5\r\n" + "M400\r\n" + "G1 Z" + baseDrop + (Math.round(incH * 100) / 100) + "\r\nM400\r\n" + rotate + "M400\r\n" + XY + "M400\r\n";
    return output;
  }


  getExtrusionValue = (matNum, mlAmount) => {
    // Material 1 is IDPI
    // Material 2 is Bulk Liquids
    switch(matNum){
      case 0:
        return Math.round((6.56 * mlAmount - 3.01) * 100) / 100;
      case 1:
        return Math.round(mlAmount * 100) / 100;
    }
  }
 
  downloadGcode = (metaNum) => {
    var element = document.createElement("a");

    switch(metaNum){
      case 0:
        this.getBigBoy();
        break;
      case 1:
        this.getEqualBoy();
        break;
    }
    console.log(this.gCode);
    var file = new Blob([this.gCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "BAM Creation.gcode";
    element.click();
  }

  render() {
    return (
      <div>
        <TextField
          label="Diameter"
          value={this.state.diameter}
          onChange={(e) => {this.setState({ diameter: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Volume"
          value={this.state.volume}
          onChange={(e) => { this.setState({ volume: parseInt(e.currentTarget.value) | 0 }) }}
          margin="normal"
        />
        <br />
        <TextField
          label="Height of Base Material"
          value={this.state.height}
          onChange={(e) => { this.setState({ height: parseInt(e.currentTarget.value) | 0 }) }}
          margin="normal"
        />
        <br />
        <Button variant='raised' onClick={() => this.downloadGcode(0)}>Meta-structure 1</Button>
        <Button variant='raised' style={{marginLeft: 50}} onClick={() => this.downloadGcode(1)}>Meta-structure 2</Button>
      </div>
    );
  }
}

export default Home;
