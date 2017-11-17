import React, {Component} from 'react';
import './Menu.css';
import Slider from 'react-rangeslider';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Layer from './Layer.js';
import Buttons from './Buttons.js';

class Menu extends Component {

  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.handleChangeRadius = this.handleChangeRadius.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.handleAmountDispersed = this.handleAmountDispersed.bind(this);

    this.state = {
      patternDropdownOpen: false,
      radius: 1,
      numLayers: 0,
      pointsLayer: 1,
      amountDispersed: 20,
      curLayer: 0,
      layers: []
    };
  }

  buttonPressed(buttonNum) {
    var numLayers = this.state.numLayers + 1;
    var curLayer = this.state.curLayer + 1;
    var layer;
    var layers = [];

    if(buttonNum == 1){
      for(var i = 1; i < numLayers; i++){
        layer = <Layer key={i} curLayer={numLayers*curLayer + i} numLayers={numLayers} pointsLayer={1} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
        if(i >= 3){
          layer = <Layer key={i} curLayer={numLayers*curLayer + i} numLayers={numLayers} pointsLayer={1} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
        }
        layers.push(layer);
      }
      layer = <Layer key={this.state.curLayer} curLayer={this.state.curLayer} numLayers={numLayers} pointsLayer={1} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    } else if(buttonNum == 2){
      layer = <Layer key={this.state.curLayer} curLayer={this.state.curLayer} numLayers={this.state.numLayers} pointsLayer={2} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    } else if(buttonNum == 3){
      layer = <Layer key={this.state.curLayer} curLayer={this.state.curLayer} numLayers={this.state.numLayers} pointsLayer={3} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
    }

    layers.push(layer);

    this.setState({
      curLayer: curLayer,
      numLayers: numLayers,
      layers: layers
    });
  }

  toggle() {
    this.setState({
      patternDropdownOpen: !this.state.patternDropdownOpen
    });
  }

  handleChangeRadius = (value) => {
    this.setState({radius: value});
  }

  handleAmountDispersed = (value) => {
    this.setState({amountDispersed: value});
  }

  render(){
    var layer;

    return(
      <div className='site'>
        <div className='leftSide'>
          <div className='title'>
            <h1>Bam Lab G-Code Generator</h1>
          </div>
          <div>
            <Dropdown isOpen={this.state.patternDropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Pattern
            </DropdownToggle>
            <DropdownMenu>
      <DropdownItem header>Header</DropdownItem>
      <DropdownItem divider />
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another Action</DropdownItem>
      <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
      </Dropdown>
      </div>
      <div>
      <Buttons buttonPressed={this.buttonPressed} />
      </div>
      <div>
      <form onSubmit={this.handleAmountDispersed}>
      <label>
      Amount Dispersed:
      <input type="text" value={this.state.amountDispersed} onChange={this.handleAmountDispersed} />
      </label>
      <input type="submit" value="Submit" />
      </form>
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
