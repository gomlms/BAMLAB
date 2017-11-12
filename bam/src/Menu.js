import React, {Component} from 'react';
import './Menu.css';
import Slider from 'react-rangeslider';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Menu extends Component {
  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.handleChangeRadius = this.handleChangeRadius.bind(this);
    this.handleChangeDepth = this.handleChangeDepth.bind(this);
    this.handleSubmitDepth = this.handleSubmitDepth.bind(this);

    this.state = {
      patternDropdownOpen: false,
      depthValue: '20',
      radiusValue: 1
    };
  }

  toggle() {
    this.setState({
      patternDropdownOpen: !this.state.patternDropdownOpen
    });
  }

  handleChangeRadius = (value) => {
    this.setState({radiusValue: value});
  }

  handleChangeDepth(event) {
    this.setState({depthValue: event.target.value});
  }

  handleSubmitDepth(event) {
    console.log('A new depth was submitted: ' + this.state.depthValue);
    event.preventDefault();
  }

  render(){
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
              value={this.state.radiusValue}
              orientation="horizontal"
              onChange={this.handleChangeRadius}
              min = {1}
              step = {1}
              max = {5}
            />
          </div>
          <div>
            <h3>Points per Layer</h3>
            <Slider
              value={this.state.radiusValue}
              orientation="horizontal"
              onChange={this.handleChangeRadius}
              min = {1}
              step = {1}
              max = {3}
            />
          </div>
          <div>
            <form onSubmit={this.handleSubmitDepth}>
              <label>
                Radius:
                <input type="text" value={this.state.depthValue} onChange={this.handleChangeDepth} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleSubmitDepth}>
              <label>
                Amount Dispersed:
                <input type="text" value={this.state.depthValue} onChange={this.handleChangeDepth} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className='gcodeHolder'>
          <p className='gcode'>
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


          M117 Bottom of Center<br />
          G1 Z{Math.trunc(this.state.depthValue * -3/2)}<br />
          G0 F4000<br />
          G1 E50<br />
          M400<br />
          G4 S15<br />
          M400<br />
          G0 F4000<br />
          G1 E-25<br />
          G4 S5<br />
          G1 Z{Math.trunc(this.state.depthValue / 2)}<br />
  <br />
          M117 Top of Center<br />
          G0 F4000<br />
          G1 E40<br />
          M400<br />
          G4 S10<br />
          M400<br />
          G1 E-25<br />
          G4 S5<br />
          G1 Z{Math.trunc(this.state.depthValue)}<br />
  <br />
  <br />
          M117 Top Right<br />
          G0 X{Math.trunc(this.state.radiusValue * 15)} Y{Math.trunc(this.state.radiusValue * 15)}<br />
          G1 Z{Math.trunc(this.state.depthValue * -1)}<br />
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
          G1 Y{Math.trunc(this.state.radiusValue * -30)}<br />
          G1 Z{Math.trunc(this.state.depthValue * -1)}<br />
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
          G1 X{Math.trunc(this.state.radiusValue * -30)}<br />
          G1 Z{Math.trunc(this.state.depthValue * -1)}<br />
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
          G1 Y{Math.trunc(this.state.radiusValue * 30)}<br />
          G1 Z{Math.trunc(this.state.depthValue * -1)}<br />
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
      </div>
    );
  }
}

export default Menu;
