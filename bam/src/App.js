import React, { Component } from 'react';
import Menu from './Menu.js';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Menu />
      </div>
    );
  }
}

export default App;
