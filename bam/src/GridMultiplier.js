import React, {Component} from 'react';
import './GridMultiplier.css';

class GridMultiplier extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColChange = this.handleColChange.bind(this);

    this.state = {
      rowVal: [],
      colVal: []
    };
  }

  handleRowChange(event){
    let rowVal = this.state.rowVal.slice(0, this.props.numRows);
    let rect = event.target.getBoundingClientRect();
    var index = (rect.y - 174) / 40;

    rowVal[index] = event.target.value;

    this.setState({
      rowVal: rowVal
    })

    this.props.callBackRows(rowVal);
  }

  handleColChange(event){
    let colVal = this.state.colVal.slice(0, 3);
    let rect = event.target.getBoundingClientRect();
    var index = (rect.x - 38) / 40;

    colVal[index] = event.target.value;

    this.setState({
      colVal: colVal
    })

    this.props.callBackCols(colVal);
  }

  render(){
    let grid = [[]];
    let columnMult = [];
    let topView = this.props.topView;

    for(var i = 0; i < this.props.numRows; i++){
      grid.push([]);
      this.state.rowVal.push(1);
      grid[i].push(
        <form key={i} className='rowMult' onSubmit={this.handleRowChange}>
          <input type="text" key={i} value={this.state.rowVal[i]} className='textBox' onChange={this.handleRowChange} />
        </form>
      );
    }

    if(this.props.numRows > 0){
      //Create Column Multipliers
      for(var i = 0; i < 3; i++){
        this.state.colVal.push(1);
        columnMult.push(
          <form key={i} className='columnMult' onSubmit={this.handleColChange}>
            <input type="text" key={i} value={this.state.colVal[i]} className='textBox' onChange={this.handleColChange}/>
          </form>
        );
      }
    }

    return(
      <div>
        <div>
          {grid}
        </div>
        <br />
        <div>
          {columnMult}
        </div>
      </div>
    );
  }
}

export default GridMultiplier;
