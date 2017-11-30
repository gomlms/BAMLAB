import React, {Component} from 'react';

class Buttons extends Component {
  constructor(props, context) {
    var buttonText = [];

    super(props, context);

    this.buttonPressed = this.buttonPressed.bind(this);

    buttonText = ["OFF","OFF","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]

    this.state = {
      buttonPressed: props.buttonPressed,
      buttonText: buttonText,
    }
  }

  buttonPressed(index){
    var buttonState = this.state.buttonText;

    if(buttonState[index] === "OFF"){
      buttonState[index] = "ON";
    } else {
      buttonState[index] = "OFF";
    }

    this.props.buttonPressed(index);
  }

  render() {
    return(
      <div>
        <input type="button" value={this.state.buttonText[0]} onClick={() => this.buttonPressed(0)} />
        <input type="button" value={this.state.buttonText[1]} onClick={() => this.buttonPressed(1)} />
        <input type="button" value={this.state.buttonText[2]} onClick={() => this.buttonPressed(2)} />

        <br />
        <input type="button" value={this.state.buttonText[3]} onClick={() => this.buttonPressed(3)} />
        <input type="button" value={this.state.buttonText[4]} onClick={() => this.buttonPressed(4)} />
        <input type="button" value={this.state.buttonText[5]} onClick={() => this.buttonPressed(5)} />

        <br />
        <input type="button" value={this.state.buttonText[6]} onClick={() => this.buttonPressed(6)} />
        <input type="button" value={this.state.buttonText[7]} onClick={() => this.buttonPressed(7)} />
        <input type="button" value={this.state.buttonText[8]} onClick={() => this.buttonPressed(8)} />
      </div>
    );
  }
}
export default Buttons;
