import React, {Component} from 'react';

class FirstPoint extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstX: 0
    };
  }

  render(){
    return(
      <h1>{this.state.firstX}</h1>
    );
  }
}

export default FirstPoint;
