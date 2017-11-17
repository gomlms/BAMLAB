import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Menu.css';
import Slider from 'react-rangeslider';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Layer from './Layer.js';
import Buttons from './Buttons.js';

class Menu extends Component {

  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.handleAmountDispersed = this.handleAmountDispersed.bind(this);
    this.getGCode = this.getGCode.bind(this);
    this.clear = this.clear.bind(this);
    this.buttonAmountDispersed = this.buttonAmountDispersed.bind(this);

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
    };
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

    if(buttonNum == 1){
      tempPoints.push(1);

      layer = <Layer key={id++} curLayer={numLayers} numLayers={numLayers} pointsLayer={1} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    } else if(buttonNum == 2){
      tempPoints.push(2);

      layer = <Layer key={id++} curLayer={curLayer} numLayers={this.state.numLayers} pointsLayer={2} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    } else if(buttonNum == 3){
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

  buttonAmountDispersed(event) {
    var id = 0;
    var numLayers = this.state.numLayers;
    var layer;
    var tempPoints = this.state.pointsPerLayer;
    var layers = [];
    this.setState({amountDispersed: this.state.amountDispersed});

    console.log(tempPoints);

    if(tempPoints.length > 0){
      for(var i = 0; i < numLayers; i++){
        layer = <Layer key={id++} curLayer={i} numLayers={numLayers} pointsLayer={tempPoints[i]} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
        layers.push(layer);
      }
    }

    this.setState({
      layers: layers,
    });
  }

  handleAmountDispersed(event){
    this.setState({amountDispersed: event.target.value});
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
    });
  }

  getGCode(){
    
  }

  render(){
    var layer;

    return(
      <div className='site'>
        <div className='leftSide'>
          <div className='title'>
            <h1>BLG - Bam Lab G-Code Generator</h1>
          </div>
        <div>
          <Buttons buttonPressed={this.buttonPressed} />
        </div>
        <div>
          <div>
           <form onSubmit={this.handleAmountDispersed}>
             <label>
               Amount Dispersed:
               <input type="text" value={this.state.amountDispersed} onChange={this.handleAmountDispersed}/>
             </label>
             <input type="button" value="Change" onClick={this.buttonAmountDispersed} />
           </form>
         </div>
          <input type="button" value="Download G-Code" onClick={this.getGCode} />
          <input type="button" value="Reset" onClick={this.clear} />
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
