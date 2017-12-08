import React, {Component} from 'react';
import './Menu.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Layer from './Layer.js';
import Buttons from './Buttons.js';
import Grid from './GridMultiplier';
import $ from 'jquery';

class Menu extends Component {

  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.handleNumLayers = this.handleNumLayers.bind(this);
    this.getGCode = this.getGCode.bind(this);
    this.clear = this.clear.bind(this);
    this.buttonNumLayers = this.buttonNumLayers.bind(this);
    this.handleVolumeSolids = this.handleVolumeSolids.bind(this);

    this.state = {
      patternDropdownOpen: false,
      radius: 1,
      numLayers: 0,
      pointsLayer: 1,
      amountDispersed: 20,
      curLayer: 0,
      layers: [],
      pointsPerLayer: [],
      id: 0,
      volumeSolids: 0,
      rowVals: [],
      colVals: [],
      matrix: [],
      enabledButtons: [0,0,0,0,0,0,0,0,0],
      strings: [],
      startText: ""
    };
  }

  handleVolumeSolids(event){
    this.setState({volumeSolids: event.target.value});
  }

  buttonPressed(buttonNum) {
    var buttons = this.state.enabledButtons;

    if(buttons[buttonNum] == 0){
      buttons[buttonNum] = 1;
    } else {
      buttons[buttonNum] = 0;
    }

    this.setState({
      enabledButtons: buttons
    })
  }

  toggle() {
    this.setState({
      patternDropdownOpen: !this.state.patternDropdownOpen
    });
  }

  buttonVolumeSolids(event){
    this.setState({volumeSolids: this.state.volumeSolids});
  }

  buttonNumLayers(event) {
    this.setState({numLayers: this.state.numLayers});
  }

  handleNumLayers(event){
    var rowVals = this.state.rowVals;
    var colVals = this.state.colVals;

    if(rowVals = []){
      for(var i = 0; i < event.target.value; i++){
        rowVals.push(1);
      }
    }

    if(colVals = []){
      colVals.push(1);
      colVals.push(1);
      colVals.push(1);
    }

    this.setState({
      numLayers: event.target.value,
      rowVals: rowVals,
      colVals: colVals
    });
  }

  clear(){
     this.setState({
      patternDropdownOpen: false,
      radius: 1,
      numLayers: 0,
      pointsLayer: 1,
      amountDispersed: 20,
      curLayer: 0,
      layers: [],
      pointsPerLayer: [],
      id: 0,
      rowVals: [],
      colVals: [],
      matrix: [],
      strings: [],
      startText: ""
    });
  }

  getGCode(){
    let matrix = [];
    var strings = [];
    var defaultExtrude = 0;
    var percentOfMaterial = 0.1;
    var matrixTotal = 0;
    var leftFlag = false, middleFlag = false, rightFlag = false;

    var buttons = this.state.enabledButtons;

    if(this.state.numLayers === 0){
      this.clear();
      console.log("Number of Layers cannot be 0");
      return;
    }

    for(var i = 0; i < this.state.numLayers; i++){
      for(var j = 0; j < 3; j++){
        matrix.push((parseInt(this.state.rowVals[i])) * parseInt((this.state.colVals[j])));
      }
    }

    for(var i = 0; i < 9; i++){
      if(buttons[i] === 1){
        if(i === 0 || i === 3 || i === 6){
          if(!leftFlag){
            for(var j = 0; j < matrix.length; j++){
              if(j % 3 === 0){
                matrixTotal += matrix[j];
              }
            }
            leftFlag = true;
          }
        } else if(i === 1 || i === 4 || i === 7){
          if(!middleFlag){
            for(var j = 0; j < matrix.length; j++){
              if(j % 3 === 1){
                matrixTotal += matrix[j];
              }
            }
            middleFlag = true;
          }
        } else if(i === 2 || i === 5 || i === 8){
          if(!rightFlag){
            for(var j = 0; j < matrix.length; j++){
              if(j % 3 === 2){
                matrixTotal += matrix[j];
              }
            }
            rightFlag = true;
          }
        }
      }
    }

    console.log(matrixTotal);

    defaultExtrude = (parseInt(this.state.volumeSolids) * percentOfMaterial / (matrixTotal))


    this.setState({
      matrix: matrix,
      startText: <p>
                M118 Cold Extrusion <br />
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
                G0 Z45 <br />
                G0 X137.50 Y67.50 (Center of plate) <br />
                G90 <br />
                M117 Centering over Beaker <br />
                G0 Z45 ; Raise to just above Beaker Rim <br />
                G0 X137.50 Y67. <br />
                M117 Switch to Relative Coordinates <br />
                G91; Relative Coordiantes <br />
              </p>
    })

    //THIS CODE IS JUST CAUSE OF THIS PATTERN BUT IT CAN Change
    strings.push(["G1 X-15"]);
    strings.push(["G1 X-15"]);
    strings.push(["G1 Y15"]);
    strings.push(["G1 Y-15"]);
    strings.push([]);
    strings.push(["G1 X15"]);
    strings.push(["G1 Y-15"]);
    strings.push(["G1 X15"]);
    strings.push(["G1 X15"]);

    for(var i = 0; i < 9; i++){
      strings[i].push(<br />);
    }

    var initialDown = -Math.trunc((parseInt(this.state.numLayers) * 80 / (parseInt(this.state.numLayers) + 1)) + 50);
    var intervalUp = Math.trunc((80 / (parseInt(this.state.numLayers) + 1)));

    if(this.state.numLayers === 1){
      intervalUp = 0;
    }

    for(var j = 0; j < 9; j++){
      if(buttons[j] === 1){
        strings[j].push("G1 Z" + initialDown);
        strings[j].push(<br />);
        strings[j].push("G0 F4000");
        strings[j].push(<br />);
        strings[j].push("G1 E" + (defaultExtrude * matrix[j]).toFixed(2));
        strings[j].push(<br />);
        strings[j].push("M400");
        strings[j].push(<br />);
        strings[j].push("G4 S15");
        strings[j].push(<br />);
        strings[j].push("M400");
        strings[j].push(<br />);
        strings[j].push("G0 F4000");
        strings[j].push(<br />);
        strings[j].push("G1 E-25");
        strings[j].push(<br />);
        strings[j].push("G4 S5");
        strings[j].push(<br />);

        for(var i = 0; i < this.state.numLayers - 1; i++){
          strings[j].push(<br />);
          strings[j].push("G1 Z" + intervalUp);
          strings[j].push(<br />);
          strings[j].push("G0 F4000");
          strings[j].push(<br />);
          strings[j].push("G1 E" + (defaultExtrude * matrix[j]).toFixed(2));
          strings[j].push(<br />);
          strings[j].push("M400");
          strings[j].push(<br />);
          strings[j].push("G4 S15");
          strings[j].push(<br />);
          strings[j].push("M400");
          strings[j].push(<br />);
          strings[j].push("G0 F4000");
          strings[j].push(<br />);
          strings[j].push("G1 E-25");
          strings[j].push(<br />);
          strings[j].push("G4 S5");
          strings[j].push(<br />);
        }
        strings[j].push("G1 Z" + (initialDown * -1 - (intervalUp * (this.state.numLayers - 1))));
        strings[j].push(<br />);
      }
    }

    var scaleCircles = [];

    console.log(this.state.matrix[i*3] + 'POOP')

    for(var i = 0; i < this.state.numLayers; i++){
      scaleCircles.push(<img style={{
        height: matrix[i*3]
      }} src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg" />);
      scaleCircles.push(<img style={{
        height: matrix[i*3 + 1]
      }} src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg" />);
      scaleCircles.push(<img style={{
        height: matrix[i*3 + 2]
      }} src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg" />);
      scaleCircles.push(<br />);
    }

    console.log(strings);
    this.setState({
      strings: strings,
      scaleCircles: scaleCircles
    });
  }

  callBackRows = (rows) => {
    this.setState({
      rowVals: rows
    })
  }

  callBackCols = (cols) => {
    this.setState({
      colVals: cols
    })
  }

  render(){
    return(
      <div className='site'>
        <div className='leftSide'>
          <div className='title'>
            <h1>BLG - Bam Lab G-Code Generator</h1>
          </div>
        <div className='volume'>
        <form onSubmit={this.handleVolumeSolids}>
          <label>
            Volume of Solids:
            <input type="text" value={this.state.volumeSolids} onChange={this.handleVolumeSolids}/>
          </label>
          <input type="button" value="Change" onClick={this.buttonAmountDispersed} />
        </form>
        </div>

        <div className='layers'>
          <div>
           <form onSubmit={this.handleNumLayers}>
             <label>
               Number Of Layers:
               <input type="text" placeholder="Select a Number from 1-5" value={this.state.numLayers} onChange={this.handleNumLayers}/>
             </label>
             <input type="button" value="Change" onClick={this.buttonNumLayers} />
           </form>
          </div>
        </div>

        <div className='leftBottom'>
        <div className='buttonsPlacer'>
          <div className='buttons'>
            <Buttons buttonPressed={this.buttonPressed} />
          </div>
        </div>

        <div className='displayOfSelection'>
          <Grid callBackRows={this.callBackRows} callBackCols={this.callBackCols} numRows={this.state.numLayers}/>
        </div>
          <div className='genAndReset'>
            <input type="button" value="Generate" onClick={this.getGCode} />
            <br />
            <input type="button" value="Reset" onClick={this.clear} />
          </div>
        </div>
        <div>
          {this.state.scaleCircles}
        </div>
      </div>
      <div className='gcodeHolder'>
        {this.state.startText}
        {/*CHANGE THE ORDER OF THE STRINGS BELOW DEPENDING ON THE PATTERN */}
        <p>
          {this.state.strings[4]}
          {this.state.strings[5]}
          {this.state.strings[2]}
          {this.state.strings[1]}
          {this.state.strings[0]}
          {this.state.strings[3]}
          {this.state.strings[6]}
          {this.state.strings[7]}
          {this.state.strings[8]}
        </p>
      </div>
    </div>
    );
  }
}

export default Menu;
