import React, { Component } from 'react';
import Menu from './Menu.js';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './App.css';
import Mine from './Buttons.js';

class App extends Component {
  render() {
    return (
      <div>
      <Mine />
      </div>
    );
  }
}

export default App;
