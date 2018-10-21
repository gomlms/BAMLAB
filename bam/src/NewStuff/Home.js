import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
//bulk prints first and has 14 points
//IDPI prints second and has 13 points
class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      code: "M118 Homing\r\nM42 P57 S0\r\nG4 S2\r\nM280 P0 S0\r\nG4 S2\r\nM42 P57 S255\r\nG28 X0 Y0\r\nG28 Z0\r\nG1 Z50 F4000\r\nG1 X131.8 Y96.5 F4000\r\nG4 S2\r\n",
      rowB1: 1,
      rowB2: 1,
      rowB3: 1,
      colB1: 1,
      colB2: 1,
      colB3: 1,
      rowC1: 1,
      rowC2: 1,
      rowC3: 1,
      colC1: 1,
      colC2: 1,
      colC3: 1,
      bulk: [[1,1,1],[1,1,1], [1,1,1]],
      curative: [[1,1,1],[1,1,1], [1,1,1]],                                                      
    }
  }

  // formula for each point:
  // totalVol * (multiplier / totalUnits) * 1.5 (if idpi also * 1.09)

  idpiHelper = (m, u) => {
    var iM = [[1,1,1],[1,1,1], [1,1,1]];
    for (var i = 0; i < iM.length; i++) {
      for (var j = 0; j < iM[i].length; j++) {
        iM[i][j] = ((.8473678637 * (m[i][j]/u) * 1.5 * 1.09) + .006792) / .009265;
      }
    }

    return iM;
  }

  updateIDPIMatrix = () => {
    var m = [[1,1,1],[1,1,1], [1,1,1]];
    var u = 0;
    for (var i = 0; i < m.length; i++) {
      for (var j = 0; j < m[i].length; j++) {
        if (i == 0) {
          if (j == 0) {
            m[i][j] = this.state.rowC1 * this.state.colC1;
          } else if (j == 1) {
            m[i][j] = this.state.rowC1 * this.state.colC2;
          } else {
            m[i][j] = this.state.rowC1 * this.state.colC3; 
          }
        } else if (i == 1) {
          if (j == 0) {
            m[i][j] = this.state.rowC2 * this.state.colC1;
          } else if (j == 1) {
            m[i][j] = this.state.rowC2 * this.state.colC2;
          } else {
            m[i][j] = this.state.rowC2 * this.state.colC3;
          }
        } else {
          if (j == 0) {
            m[i][j] = this.state.rowC3 * this.state.colC1;
          } else if (j == 1) {
            m[i][j] = this.state.rowC3 * this.state.colC2;
          } else {
            m[i][j] = this.state.rowC3 * this.state.colC3;
          }
        }
      }
    }

    var scalers = [[1,2,1],[2,1,2],[1,2,1]];
    var uSum = [[1,1,1],[1,1,1],[1,1,1]];
    u = 0;

    for (var i = 0; i < uSum.length; i++) {
      for (var j = 0; j < uSum[i].length; j++) {
        uSum[i][j] = m[i][j] * scalers[i][j];
        u += m[i][j] * scalers[i][j];
      }
    }

    return this.idpiHelper(m, u);
  }

  bulkHelper = (m, u) => {
    var bM = [[1,1,1],[1,1,1], [1,1,1]];
    for (var i = 0; i < bM.length; i++) {
      for (var j = 0; j < bM[i].length; j++) {
        bM[i][j] = ((23.30425482 * (m[i][j]/u) * 1.5) + .0218) / .00931;
        console.log(u);
      }
    }

    return bM;
  }

  updateBulkMatrix = () => {
    var m = [[1,1,1],[1,1,1], [1,1,1]];
    var u = 0;
    for (var i = 0; i < m.length; i++) {
      for (var j = 0; j < m[i].length; j++) {
        if (i == 0) {
          if (j == 0) {
            m[i][j] = this.state.rowB1 * this.state.colB1;
          } else if (j == 1) {
            m[i][j] = this.state.rowB1 * this.state.colB2;
          } else {
            m[i][j] = this.state.rowB1 * this.state.colB3; 
          }
        } else if (i == 1) {
          if (j == 0) {
            m[i][j] = this.state.rowB2 * this.state.colB1;
          } else if (j == 1) {
            m[i][j] = this.state.rowB2 * this.state.colB2;
          } else {
            m[i][j] = this.state.rowB2 * this.state.colB3;
          }
        } else {
          if (j == 0) {
            m[i][j] = this.state.rowB3 * this.state.colB1;
          } else if (j == 1) {
            m[i][j] = this.state.rowB3 * this.state.colB2;
          } else {
            m[i][j] = this.state.rowB3 * this.state.colB3;
          }
        }
      }
    }

    var scalers = [[2,1,2],[1,2,1],[2,1,2]];
    var uSum = [[1,1,1],[1,1,1],[1,1,1]];
    u = 0;

    for (var i = 0; i < uSum.length; i++) {
      for (var j = 0; j < uSum[i].length; j++) {
        uSum[i][j] = m[i][j] * scalers[i][j];
        u += m[i][j] * scalers[i][j];
      }
    }

    return this.bulkHelper(m, u);
  }

  createCode = () => {
    var bulk = this.updateBulkMatrix();
    var idpi = this.updateIDPIMatrix();

    console.log(bulk);
    console.log(idpi);

    var code = this.state.code;
    var layer = 'First Layer';
    code += 'M117 Bulk First Layer\r\nT0\r\nM42 P57 S0\r\nG4 S2\r\nM280 P0 S84\r\nG4 S2\r\nM42 P57 S255\r\nG91\r\n\r\nM0 Start Bulk Layer 1?\r\n\r\n';
         
    code += 'M117 M | M | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Z-43 F100\r\nG1 E' + bulk[2][1] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[2][1] + ' F1000\r\nG4 S15\r\nG1 Z43 F4000\r\n\r\n' +
            'M117 B | L | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X-12.056 Y-12.056\r\nG1 Z-43 F100\r\nG1 E' + bulk[2][0] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[2][0] + ' F1000\r\nG4 S15\r\nG1 Z43 F4000\r\n\r\n' +
            'M117 B | R | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X24.112\r\nG1 Z-43 F100\r\nG1 E' + bulk[2][2] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[2][2] + ' F1000\r\nG4 S15\r\nG1 Z43 F4000\r\n\r\n' +    
            'M117 T | R | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Y24.112\r\nG1 Z-43 F100\r\nG1 E' + bulk[2][2] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[2][2] + ' F1000\r\nG4 S15\r\nG1 Z43 F4000\r\n\r\n' +
            'M117 T | L | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X-24.112\r\nG1 Z-43 F100\r\nG1 E' + bulk[2][0] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[2][0] + ' F1000\r\nG4 S15\r\nG1 Z43 F4000\r\n\r\n' +
            'G90\r\nG1 Z50\r\nG1 X131.8 Y96.5 F4000\r\n\r\n' + 
            'M117 Curative First Layer\r\nM42 P57 S255\r\ G4 S2\r\nT1\r\nM42 P57 S0\r\nG4 S2\r\nM280 P0 S167\r\nG4 S2\r\nM42 P57 S255\r\nG91\r\nM0 Start Cure Layer 1?\r\n\r\n' + 
            'M117 B | M | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Y-17.05\r\nG1 Z-43 F100\r\nG1 E' + idpi[2][1] + ' F1000\r\nG4 S30\r\nG1 Z43 F4000\r\nG1 Y17.05' +
            'M117 Middle, Right, First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X17.05\r\nG1 Z-43 F100\r\nG1 E' + idpi[2][2] + ' F1000\r\nG4 S30\r\nG1 Z43 F4000\r\nG1 X-17.05\r\n\r\n' +
            'M117 T | M | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Y17.05\r\nG1 Z-43 F100\r\nG1 E' + idpi[2][1] + ' F1000\r\nG4 S30\r\nG1 Z43 F4000\r\nG1 Y-17.05\r\n\r\n' +
            'M117 M | L | First Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X-17.05\r\nG1 Z-43 F100\r\nG1 E' + idpi[2][0] + ' F1000\r\nG4 S30\r\nG1 Z43 F4000\r\nG1 X17.05 \r\n\r\n' +
            'G90\r\nG1 Z50\r\nG1 X131.8 Y96.5 F4000\r\n\r\n' +
            'M117 Curative Second Layer\r\nT1\r\nG4 S2\r\nM42 P57 S0\r\nG4 S2\r\nM280 P0 S167\r\nG4 S2\r\nM42 P57 S255\r\nG91\r\n\r\n' +
            'M0 Start Cure Layer 2?\r\n\r\n' +
            'M117  M | M | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Z-34 F100\r\nG1 E' + idpi[1][1] + ' F1000\r\nG4 S30\r\nG1 Z34 F4000\r\n\r\n' + 
            'M117 B | L | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X-12.056 Y-12.056\r\nG1 Z-34 F100\r\nG1 E' + idpi[1][0] + ' F1000\r\nG4 S30\r\nG1 Z34 F4000\r\n\r\n' +
            'M117 B | R | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X24.112\r\nG1 Z-34 F100\r\nG1 E' + idpi[1][2] + ' F1000\r\nG4 S30\r\nG1 Z34 F4000\r\n\r\n' +
            'M117 T | R | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Y24.112\r\nG1 Z-34 F100\r\nG1 E' + idpi[1][2] + ' F1000\r\nG4 S30\r\nG1 Z34 F4000\r\n\r\n' +
            'M117 T | L | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X-24.112\r\nG1 Z-34 F100\r\nG1 E' + idpi[1][0] + ' F1000\r\nG4 S30\r\nG1 Z34 F4000\r\n\r\n' +
            'G90\r\nG1 Z50\r\nG1 X131.8 Y96.5 F4000\r\n\r\n' + 
            'M117 Bulk Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nT0\r\nM42 P57 S0\r\nG4 S2\r\nM280 P0 S88\r\nG4 S2\r\nM42 P57 S255\r\nG91\r\n\r\n' +
            'M0 Start Bulk Layer 2?\r\n\r\n' +
            'M117 B | M | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Y-17.05\r\nG1 Z-34 F100\r\nG1 E' + bulk[1][1] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[1][1] + ' F1000\r\nG4 S15\r\nG1 Z34 F4000\r\nG1 Y17.05\r\n\r\n' +
            'M117 M | R | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X17.05\r\nG1 Z-34 F100\r\nG1 E' + bulk[1][2] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[1][2] + ' F1000\r\nG4 S15\r\nG1 Z34 F4000\r\nG1 X-17.05\r\n\r\n' +
            'M117 T | M | Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 Y17.05\r\nG1 Z-34 F100\r\nG1 E' + bulk[1][1] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[1][1] + ' F1000\r\nG4 S15\r\nG1 Z34 F4000\r\nG1 Y-17.05\r\n\r\n' +
            'M117 M | L |Second Layer\r\nM42 P57 S255\r\nG4 S2\r\nG1 X-17.05\r\nG1 Z-34 F100\r\nG1 E' + bulk[1][0] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[1][0] + ' F1000\r\nG4 S15\r\nG1 Z34 F4000\r\nG1 X17.05\r\nG90\r\n\r\n' +
            'M117 Home\r\nG1 Z50\r\nG1 X131.8 Y96.5 F4000\r\n\r\n' +
            'M0 Start Bulk Layer 3?\r\n\r\n' +
            'M117 Bulk Third Layer\r\nT0\r\nG4 S2\r\nG91\r\n\r\n' +
            'M117 M | M | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 Z-25 F100\r\nG1 E' + bulk[0][1] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[0][1] + ' F1000\r\nG4 S15\r\nG1 Z25 F4000\r\n\r\n' +
            'M117 B | L | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 X-12.056 Y-12.056\r\nG1 Z-25 F100\r\nG1 E' + bulk[0][0] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[0][0] + ' F1000\r\nG4 S15\r\nG1 Z25 F4000\r\n\r\n' +
            'M117 B | R | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 X24.112\r\nG1 Z-25 F100\r\nG1 E' + bulk[0][2] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[0][2] + ' F1000\r\nG4 S15\r\nG1 Z25 F4000\r\n' +
            'M117 T | R | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 Y24.112\r\nG1 Z-25 F100\r\nG1 E' + bulk[0][2] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[0][1] + ' F1000\r\nG4 S15\r\nG1 Z25 F4000\r\n\r\n' +
            'M117 T | L | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 X-24.112\r\nG1 Z-25 F100\r\nG1 E' + bulk[0][0] + ' F1000\r\nG4 S15\r\nG1 E' + bulk[0][0] + ' F1000\r\nG4 S15\r\nG1 Z25 F4000\r\n\r\n' +
            'G90\r\nG1 Z50\r\nG1 X131.8 Y96.5 F4000\r\n\r\n' +
            'M0 Start Cure Layer 3?\r\n\r\n' +
            'M117 Curative Third Layer\r\nM42 P57 255\r\nG4 S5\r\nT1\r\nM42 P57 S0\r\nG4 S5\r\nM280 P0 S167\r\nG4 S5\r\nM42 P57 S255\r\nG91\r\n\r\n' +
            'M117 B | M | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 Y-17.05\r\nG1 Z-25 F100\r\nG1 E' + idpi[0][1] + ' F1000\r\nG4 S30\r\nG1 Z25 F4000\r\nG1 Y17.05\r\n\r\n' +
            'M117 M | R | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 X17.05\r\nG1 Z-25 F100\r\nG1 E' + idpi[0][2] + ' F1000\r\nG4 S30\r\nG1 Z25 F4000\r\nG1 X-17.05\r\n\r\n' +
            'M117 T | M | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 Y17.05\r\nG1 Z-25 F100\r\nG1 E' + idpi[0][1] + ' F1000\r\nG4 S30\r\nG1 Z25 F4000\r\nG1 Y-17.05\r\n\r\n' +
            'M117 M | L | Third Layer\r\nM42 P57 S255\r\nG4 S5\r\nG1 X-17.05\r\nG1 Z-25 F100\r\nG1 E' + idpi[0][0] + ' F1000\r\nG4 S30\r\nG1 Z25 F4000\r\nG1 X17.05\r\n\r\n' +
            'G90\r\nG1 Z50\r\nG1 X131.8 Y96.5 F4000\r\nG1 X0 Y0\r\nM118 FINISHED!!\r\nG4 S5';

    this.setState({
      code
    })

    var element = document.createElement("a");

    console.log(code);
    var file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "BAM Creation.gcode";
    element.click();
  }    

  render(){
    const homeStyle = {
      padding: '30px'      
    }
    return(
      <div style={homeStyle}>
        <TextField
          label="Row B1"
          value={this.state.rowB1}
          onChange={(e) => {this.setState({ rowB1: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Row B2"
          value={this.state.rowB2}
          onChange={(e) => {this.setState({ rowB2: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField 
          label="Row B3"
          value={this.state.rowB3}
          onChange={(e) => {this.setState({ rowB3: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Col B1"
          value={this.state.colB1}
          onChange={(e) => {this.setState({ colB1: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <TextField
          label="Col B2"
          value={this.state.colB2}
          onChange={(e) => {this.setState({ colB2: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <TextField
          label="Col B3"
          value={this.state.colB3}
          onChange={(e) => {this.setState({ colB3: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Row C1"
          value={this.state.rowC1}
          onChange={(e) => {this.setState({ rowC1: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Row C2"
          value={this.state.rowC2}
          onChange={(e) => {this.setState({ rowC2: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Row C3"
          value={this.state.rowC3}
          onChange={(e) => {this.setState({ rowC3: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />
        <TextField
          label="Col C1"
          value={this.state.colC1}
          onChange={(e) => {this.setState({ colC1: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <TextField
          label="Col C2"
          value={this.state.colC2}
          onChange={(e) => {this.setState({ colC2: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <TextField
          label="Col C3"
          value={this.state.colC3}
          onChange={(e) => {this.setState({ colC3: parseInt(e.currentTarget.value) | 0 })}}
          margin="normal"
        />
        <br />                                      
        <Button variant='raised' onClick={this.createCode}>Create</Button>
      </div>
    );
  }
}

export default Home;