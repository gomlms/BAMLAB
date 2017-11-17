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
      amountDispersed: 20,
      layers: []
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

  handleAmountDispersed() {
    this.state.layers[0].setState({numLayers: 5});
  }

  render(){
    var layer;

    for(var i = 0; i < this.state.numLayers; i+=1){
      layer = <Layer key = {i} curLayer={i} numLayers={this.state.numLayers} pointsLayer={this.state.pointsLayer} amountDispersed={this.state.amountDispersed} radius={this.state.radius} />
      this.state.layers.push(layer);
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
            <form onSubmit={this.handleAmountDispersed}>
              <label>
                Amount Dispersed:
                <input type="text" value={this.state.amountDispersed} onChange={this.handleAmountDispersed} />
              </label>
              <input type="submit" value="Change" />
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
          {this.state.layers}
        </div>
      </div>
    );
  }
}

export default Menu;
