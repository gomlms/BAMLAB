import React, {Component} from 'react';

class Buttons extends Component {
  constructor(props, context) {
    super(props, context);

    this.function1 = this.function1.bind(this);
    this.function2 = this.function2.bind(this);
    this.function3 = this.function3.bind(this);

    this.state = {
      buttonPressed: props.buttonPressed,
    }
  }

  function1() {
    this.props.buttonPressed(1);
  }

  function2() {
    this.props.buttonPressed(2);
  }

  function3() {
    this.props.buttonPressed(3);
  }

  render() {
    return(
      <div>
        <input type="button" value="One" onClick={this.function1} />

        <input type="button" value="Two" onClick={this.function2} />

        <input type="button" value="Three" onClick={this.function3} />
      </div>
    );
  }
}
export default Buttons;
