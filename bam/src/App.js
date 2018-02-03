import React, { Component } from 'react';
import Menu from './Menu.js';
import HomeScreen from './HomeScreen.js';
import 'react-rangeslider/lib/index.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Menu /> */}
        <HomeScreen />
      </div>
    );
  }
}

export default App;
