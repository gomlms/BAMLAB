import React, {Component} from 'react';
import './Menu.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Layer from './Layer.js';
import Buttons from './Buttons.js';
import Grid from './GridMultiplier';

class Menu extends Component {

  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.handleNumLayers = this.handleNumLayers.bind(this);
    this.getGCode = this.getGCode.bind(this);
    this.clear = this.clear.bind(this);
    this.buttonNumLayers = this.buttonNumLayers.bind(this);

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
      matrix: []
    };
  }

  handleVolumeSolids(event){
    this.setState({volumeSolids: event.target.value});
  }

  buttonPressed(buttonNum) {
    var numLayers = this.state.numLayers + 1;
    var curLayer = this.state.curLayer + 1;
    var layer;
    var layers = [];
    var tempPoints = this.state.pointsPerLayer;
    var id = this.state.id;

    for(var i = 0; i < numLayers - 1; i++){
      layer = <Layer key={id++} curLayer={i} numLayers={numLayers} pointsLayer={tempPoints[i]} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
      layers.push(layer);
    }

    if(buttonNum === 1){
      tempPoints.push(1);

      layer = <Layer key={id++} curLayer={numLayers} numLayers={numLayers} pointsLayer={1} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    } else if(buttonNum === 2){
      tempPoints.push(2);

      layer = <Layer key={id++} curLayer={curLayer} numLayers={this.state.numLayers} pointsLayer={2} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    } else if(buttonNum === 3){
      tempPoints.push(3);

      layer = <Layer key={id++} curLayer={curLayer} numLayers={this.state.numLayers} pointsLayer={3} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    }

    layers.push(layer);

    this.setState({
      curLayer: curLayer,
      numLayers: numLayers,
      layers: layers,
      pointsPerLayer: tempPoints,
      id: id
    });
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
      matrix: []
    });
  }

  getGCode(){
    let matrix = [];

    for(var i = 0; i < this.state.numLayers; i++){
      matrix[i] = [];
      for(var j = 0; j < 3; j++){
        matrix[i][j] = (this.state.rowVals[i]) * (this.state.colVals[j]);
      }
    }

    this.setState({
      matrix: matrix
    })
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
        <div>
        <form onSubmit={this.handleVolumeSolids}>
          <label>
            Volume of Solids:
            <input type="text" value={this.state.volumeSolids} onChange={this.handleVolumeSolids}/>
          </label>
          <input type="button" value="Change" onClick={this.buttonAmountDispersed} />
        </form>
        </div>
        <div>
          <Buttons buttonPressed={this.buttonPressed} />
        </div>
        <div>
          <div>
           <form onSubmit={this.handleNumLayers}>
             <label>
               Number Of Layers:
               <input type="text" value={this.state.numLayers} onChange={this.handleNumLayers}/>
             </label>
             <input type="button" value="Change" onClick={this.buttonNumLayers} />
           </form>
        </div>
        <div>
          <Grid callBackRows={this.callBackRows} callBackCols={this.callBackCols} numRows={this.state.numLayers}/>
        </div>
        <div>
          <input type="button" value="Generate" onClick={this.getGCode} />
          <br />
          <input type="button" value="Reset" onClick={this.clear} />
          </div>
        </div>
      </div>
      <div className='gcodeHolder'>
        {this.state.layers}
      </div>
    </div>
    );
  }
}

export default Menu;
