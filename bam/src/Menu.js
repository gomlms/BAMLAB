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
    this.handleChangeDepth = this.handleChangeDepth.bind(this);
    this.handleSubmitDepth = this.handleSubmitDepth.bind(this);

    this.state = {
      patternDropdownOpen: false,
      depthValue: '20',
      radiusValue: 1,
      numLayers: 1,
      pointsLayer: 1
    };
  }

  onAddLayer = () => {
    this.setstate({
      numLayers: this.state.numLayers + 1
    });
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
    const children = [];

    for(var i = 1; i <= this.state.numLayers; i+=1){
      children.push(<Layer numLayers={this.state.numLayers} pointsLayer={this.state.pointsLayer} amountDispersed={this.state.amountDispersed} radius={this.state.radius} curLayer={i}/>);
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
                Amount Dispersed:
                <input type="text" value={this.state.depthValue} onChange={this.handleChangeDepth} />
              </label>
              <input type="submit" value="Submit" />
            </form>
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
        </div>
        <div className='gcodeHolder'>
          {children}
        </div>
      </div>
    );
  }
}

export default Menu;
