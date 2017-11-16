import React, {Component} from 'react';
import './Menu.css';
import Slider from 'react-rangeslider';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Layer from './Layer.js';

class Menu extends Component {
  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.handleChangeRadius = this.handleChangeRadius.bind(this);

    this.state = {
      patternDropdownOpen: false,
      depthValue: '20',
      radius: 1,
      numLayers: 1,
      pointsLayer: 1,
      amountDispersed: 20
    };
  }

  toggle() {
    this.setState({
      patternDropdownOpen: !this.state.patternDropdownOpen
    });
  }

  handleChangeRadius = (value) => {
    this.setState({radius: value});
  }

  handleChangeLayers = (value) => {
    this.setState({numLayers: value});
  }

  handleChangePoints = (value) => {
    this.setState({pointsLayer: value});
  }

  handleAmountDispersed = (value) => {
    this.setState({amountDispersed: value});
  }

  render(){
    const children = [];
    for(var i = 0; i < this.state.numLayers; i+=1){
      console.log("POOP");
      children.push(<Layer key = {i} curLayer={i} numLayers={this.state.numLayers} pointsLayer={this.state.pointsLayer} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />);
    };

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
            <h3>Number of Layers</h3>
            <Slider
              value={this.state.numLayers}
              orientation="horizontal"
              onChange={this.handleChangeLayers}
              min = {1}
              step = {1}
              max = {5}
            />
          </div>
          <div>
            <h3>Points per Layer</h3>
            <Slider
              value={this.state.pointsLayer}
              orientation="horizontal"
              onChange={this.handleChangePoints}
              min = {1}
              step = {1}
              max = {3}
            />
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
          <div>
            <form onSubmit={this.handleChangeRadius}>
              <label>
                Radius:
                <input type="text" value={this.state.radius} onChange={this.handleChangeRadius} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className='gcodeHolder'>
          <p>
            M118 Cold Extrusion
            M302 S0
            G90
            M117 Calibration
            G0 Z45 F6000
            M117 Homing X and Y
            G28 X Y
            M117 Homing Z
            G0 X45 Y100
            G28 Z
            G90
            M117 Centering Needle Over Beaker
            G0 Z45
            G0 X137.50 Y67.50 (Center of plate)
            G90
            M117 Centering over Beaker
            G0 Z45 ; Raise to just above Beaker Rim
            G0 X137.50 Y67.
            M117 Switch to Relative Coordinates
            G91; Relative Coordiantes

          </p>
          {children}
        </div>
      </div>
    );
  }
}

export default Menu;
