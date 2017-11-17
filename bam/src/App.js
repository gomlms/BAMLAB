import React, { Component } from 'react';
import Menu from './Menu.js';
import Gcode from './gCodeHolder.js';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Gcode />
      </div>
    );
  }
}

export default App;
