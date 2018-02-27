import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Layer from './Layer.js';
import Buttons from './Buttons.js';
import Grid from './GridMultiplier';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { createMuiTheme } from 'material-ui/styles/';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Save from 'material-ui-icons/Save';
import Menu, { MenuItem } from 'material-ui/Menu';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class HomeScreen extends Component {

  layerVal = [];

  constructor(props, context) {
    super(props, context);

    this.handleVolChange = this.handleVolChange.bind(this);
    this.handleLayerChange = this.handleLayerChange.bind(this);
    this.handleCode = this.handleCode.bind(this);

    this.state = {
      botVal: [1,1,1],
      matrix: [],
      printMatrix: [false,false,false,false,false,false,false,false,false],
      numLayers: 0,
      vol: 500,
      source1: './CircleWhite.svg',
      source2: './CircleWhite.svg',
      source3: './CircleWhite.svg',
      showFirst: true,
      showSecond: true,
      showThird: true,
      r45: "4.417",
      idp: "4.417",
      course: "20.25",
      fine: "6.75",
      lecithin: "0.76",
      ipdi: "0.41",
      buttonColors: ["primary", "primary", "primary", "primary", "primary", "primary", "primary", "primary", "primary"],
      code: 'M118 \r\nCold Extrusion\r\nM302 S0\r\nG90\r\nM117 Calibration\r\nG0 Z45 F6000\r\nM117 Homing X and Y\r\nG28 X Y\r\nM117 Homing Z\r\nG0 X45 Y100\r\nG28 Z\r\nG90\r\nM117 Centering Needle Over Beaker\r\nG0 Z45\r\nG0 X137.50 Y67.50 (Center of plate)\r\nG90\r\nM117 Centering over Beaker\r\nG0 Z45 ; Raise to just above Beaker Rim\r\nG0 X137.50 Y67.\r\nM117 Switch to Relative Coordinates\r\nG91; Relative Coordiantes\r\nG1 X40 Y40\r\nM400\r\n',
    }
  }

  downloadTxtFile = () => {
    var element = document.createElement("a");

    /*Check all the variables and change the gcode*/

    /* Get text from each variable in state and parse it into an float variable */

//JosHS Variables
    // var height=100;
    // var layersNeeded=4;
    // var u=layersNeeded;
    // var distanceBetweenLayers=height/(layersNeeded+1);
    // var distanceToCurrentLayer= height;
    var i = 0;
    var y = 0;
    var currLayer = 1;
    var moveUp = false;
    var amountUp = (100 / this.state.numLayers + 1);
    var amountDown = -amountUp;
    var totalUp = 100 - amountUp;
    var totalDown = -totalUp;
    var codeHolder = this.state.code;
    var angleNeg = "90";
    var anglePos = "-90";
    var print = this.state.printMatrix;
    var amountLayers = this.state.numLayers;

    codeHolder +=
      "G1 X-18 Y-18" + "\r\n";

    for(y = 0; y < amountLayers; y ++){
        if(y >= 1) {
          codeHolder +=
            "G1 X-36" + "\r\n";
        }  //moves to the bottom left of the square
        codeHolder +=
          "M400" + "\r\n" +
          "G91" + "\r\n"; //changes to relative positioning
      for(i = 0; i < 9; i++) {
        if(i % 3 === 0) {
          if(print[i] === true){
            codeHolder +=
              "G1 Z" + totalDown + "\r\n" +
              "M400" + "\r\n"+
              "G1 E40 F4000" + "\r\n" +
              "M400" + "\r\n" +
              "G1 E-25" + "\r\n" +
              "M400" + "\r\n" +
              "G1 Z" + totalUp + "\r\n";
          }
        } else if(i % 3 === 1) {
          codeHolder +=
            "G1 X18" + "\r\n" +
            "M400" + + "\r\n";
            if(print[i] === true) {
              codeHolder +=
                "G1 Z" + totalDown + "\r\n" +
                "M400" + "\r\n"+
                "G1 E40 F4000" + "\r\n" +
                "M400" + "\r\n" +
                "G1 E-25" + "\r\n" +
                "M400" + "\r\n" +
                "G1 Z" + totalUp + "\r\n";
            }
        } else if(i % 3 === 2) {
          codeHolder +=
            "G1 X18" + "\r\n" +
            "M400" + + "\r\n";
            if(print[i] === true) {
              codeHolder +=
                "G1 Z" + totalDown + "\r\n" +
                "M400" + "\r\n"+
                "G1 E40 F4000" + "\r\n" +
                "M400" + "\r\n" +
                "G1 E-25" + "\r\n" +
                "M400" + "\r\n" +
                "G1 Z" + totalUp + "\r\n";
            }
          moveUp = true;
        }

        if(moveUp) {
          codeHolder +=
            "G1 Y18" + "\r\n";
        }
        moveUp = false;
      }
      if(currLayer% 2 === 0) {
        codeHolder += "M280 p0 " + angleNeg + "\r\n";
      } else {
        codeHolder += "M280 p0 " + angleNeg + "\r\n";
      }
      codeHolder += "G90" + "\r\n"; //changes back to absolute positioning
      totalUp = totalUp + amountUp;
      totalDown = totalDown + amountDown;
      currLayer++;
    }

    this.setState({
      code: codeHolder,
    })

    var file = new Blob([codeHolder], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "BAM Creation";
    element.click();
  }

  handleVolChange(e, num){
    switch(num){
      case 0:
        this.setState({
          r45: e.target.value,
        })
      break;
      case 1:
        this.setState({
          idp: e.target.value,
        })
      break;
      case 2:
        this.setState({
          lecithin: e.target.value,
        })
      break;
      case 3:
        this.setState({
          course: e.target.value,
        })
      break;
      case 4:
        this.setState({
          fine: e.target.value,
        })
      break;
      case 5:
        this.setState({
          ipdi: e.target.value,
        })
      break;
    }
  }

  handleLayerValChange(e, place){
    if(place === "side"){
      this.layerVal[parseInt(e.target.id)] = parseInt(e.target.value) % 10 ? parseInt(e.target.value) % 10 : 1;

      if(this.layerVal[parseInt(e.target.id)] > 3){
        this.layerVal[parseInt(e.target.id)] = 3
      }

      var matrix = [];
      var i = 0, j = 0;
      for(i = 0; i < this.state.numLayers; i++){
        for(j = 0; j < 3; j++){
          matrix.push(this.state.botVal[j] * this.layerVal[i] * 25);
        }
      }

      var grid = [];
      var counter = 0;
      for(i = 0; i < this.state.numLayers; i++){
        grid.push(
          <div key={i}>
            <TextField
              id={String(counter)}
              key={i}
              label="Layer"
              value={this.layerVal[i]}
              onChange={(e) => this.handleLayerValChange(e, "side")}
              margin="normal"
              style={{width: '10%', marginLeft: '-15%'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle'}}>
              <img style={{height: matrix[i*3] + 'px', whitespace: 'nowrap'}}src={this.state.source1} />
              <img style={{height: matrix[i*3 + 1] + 'px', whitespace: 'nowrap'}}src={this.state.source2} />
              <img style={{height: matrix[i*3 + 2] + 'px', whitespace: 'nowrap'}}src={this.state.source3} />
            </div>
          </div>);
        counter++;
      }

      this.setState({
        matrix: matrix,
        sideGrid: grid,
      })
    } else {
      var botVal = this.state.botVal;
      botVal[parseInt(e.target.id)] = parseInt(e.target.value) % 10 ? parseInt(e.target.value) % 10 : 1;

      if(botVal[parseInt(e.target.id)] > 3){
        botVal[parseInt(e.target.id)] = 3
      }

      var matrix = [];
      var i = 0, j = 0;
      for(i = 0; i < this.state.numLayers; i++){
        for(j = 0; j < 3; j++){
          matrix.push(this.state.botVal[j] * this.layerVal[i] * 25);
        }
      }

      var grid = [];
      var counter = 0;
      for(i = 0; i < this.state.numLayers; i++){
        grid.push(
          <div>
            <TextField
              id={String(counter)}
              key={i}
              label="Layer"
              value={this.layerVal[i]}
              onChange={(e) => this.handleLayerValChange(e, "side")}
              margin="normal"
              style={{width: '10%', marginLeft: '-15%'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle'}}>
              <img style={{height: matrix[i*3] + 'px', whitespace: 'nowrap'}}src={this.state.source1} />
              <img style={{height: matrix[i*3 + 1] + 'px', whitespace: 'nowrap'}}src={this.state.source2} />
              <img style={{height: matrix[i*3 + 2] + 'px', whitespace: 'nowrap'}}src={this.state.source3} />
            </div>
          </div>);
        counter++;
      }

      this.setState({
        matrix: matrix,
        sideGrid: grid,
        botVal: botVal,
      })
    }
  }

  handleLayerChange(e){
    var grid = [];
    var i = 0;
    var counter = 0;

    var num = parseInt(e.target.value) % 10 ? parseInt(e.target.value) % 10 : 0;

    if(num > 6){
      num = 6;
    }

    for(i = 0; i < num; i++){
      this.layerVal.push(1);
    }

    var matrix = [];
    var i = 0, j = 0;
    for(i = 0; i < 3; i++){
      for(j = 0; j < num; j++){
        matrix.push(this.state.botVal[i] * this.layerVal[j] * 25);
      }
    }

    this.setState({
      numLayers: num,
      matrix: matrix,
    }, () => {
      this.createGrid();
    })
  }

  createGrid(){
    var grid = [];
    var i = 0;
    var counter = 0;

    for(i = 0; i < this.state.numLayers; i++){
      grid.push(
        <div key={i}>
          <TextField
            id={String(counter)}
            key={i}
            label="Layer"
            value={this.layerVal[i]}
            onChange={(e) => this.handleLayerValChange(e, "side")}
            margin="normal"
            style={{width: '10%', marginLeft: '-15%'}}
          />
          <div style={{display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle'}}>
            <img style={{height: this.state.matrix[i*3] + 'px', whitespace: 'nowrap'}}src={this.state.source1} />
            <img style={{height: this.state.matrix[i*3 + 1] + 'px', whitespace: 'nowrap'}}src={this.state.source2} />
            <img style={{height: this.state.matrix[i*3 + 2] + 'px', whitespace: 'nowrap'}}src={this.state.source3} />
          </div>
        </div>);
      counter++;
    }

    this.setState({
      sideGrid: grid
    })
  }

  handleCode(e){
    this.setState({
      code: this.state.code + e.target.value,
    })
  }

  enableColumn(num){
    var buttonColors = this.state.buttonColors;
    var printHolder = this.state.printMatrix;
    var showFirst = true;
    var showSecond = true;
    var showThird = true;

    if(buttonColors[num] === "primary"){
      buttonColors[num] = "inherit";
    } else{
      buttonColors[num] = "primary";
    }

    if(printHolder[num] === false) {
      printHolder[num] = true;
      this.setState({
        printMatrix: printHolder,
      })
    }

    if(buttonColors[0] === "inherit" && buttonColors[3] === "inherit" && buttonColors[6] === "inherit"){
      showFirst = false;
    }
    if(buttonColors[1] === "inherit" && buttonColors[4] === "inherit" && buttonColors[7] === "inherit"){
      showSecond = false;
    }
    if(buttonColors[2] === "inherit" && buttonColors[5] === "inherit" && buttonColors[8] === "inherit"){
      showThird = false;
    }

    var grid = [];
    var i = 0;
    var counter = 0;

    for(i = 0; i < this.state.numLayers; i++){
      grid.push(
        <div key={i}>
          <TextField
            id={String(counter)}
            key={i}
            label="Layer"
            value={this.layerVal[i]}
            onChange={(e) => this.handleLayerValChange(e, "side")}
            margin="normal"
            style={{width: '10%', marginLeft: '-15%'}}
          />
          <div style={{display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle'}}>
            {showFirst &&
              <img style={{height: this.state.matrix[i*3] + 'px', whitespace: 'nowrap'}}src={this.state.source1} />
            }
            {showSecond &&
              <img style={{height: this.state.matrix[i*3 + 1] + 'px', whitespace: 'nowrap'}}src={this.state.source2} />
            }
            {showThird &&
              <img style={{height: this.state.matrix[i*3 + 2] + 'px', whitespace: 'nowrap'}}src={this.state.source3} />
            }
          </div>
        </div>);
      counter++;
    }

    this.setState({
      buttonColors: buttonColors,
      sideGrid: grid,
      showFirst: showFirst,
      showSecond: showSecond,
      showThird: showThird,
    });
  }

  render(){

    const textFieldStyle = {
      marginLeft: '20px',
    }

    const inputPaperStyle = {
      marginTop: '20px',
      paddingBottom: '20px',
    }

    const mainStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      height: '90%',
      marginRight: 'auto',
      marginLeft: 'auto'
    }

    const leftPanelStyle = {
      width: '30%',
      paddingLeft: '10px'
    }

    const rightPanelStyle = {
      width: '40%',
      backgroundImage: 'url("/Cup.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80% 80%',
      backgroundPosition: 'center center',
      marginTop: '1%',
      marginRight: '1%',
      position: 'relative',
      display: 'inline'
    }

    const inputSideLineStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '80%',
      width: '80%',
      margin: '0 auto',
      marginTop: '10%'
    }

    const inputBotLineStyle = {
      display: 'flex',
      justifyContent: 'space-evenly',
    }

    const topBeakerBackground = {
      paddingTop: '100px',
      textAlign: 'left',
      marginLeft: '10%',
    }
    const downloadStyle = {
      position: 'absolute',
      bottom: '2%',
      left: '2%',
    }

    return(
      <div style={{height: '100%'}}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit">
              BAM G-Code Generator
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='Main' style={mainStyle}>
          <div className='LeftPanel' style={leftPanelStyle}>
            <Paper style={inputPaperStyle} elevation={4}>
              <div>
                <TextField
                  id="course"
                  label="Course Sand (g)"
                  value={this.state.course}
                  onChange={(e) => this.handleVolChange(e,3)}
                  margin="normal"
                  style={textFieldStyle}
                />
                <TextField
                  id="fine"
                  label="Fine Sand (g)"
                  value={this.state.fine}
                  onChange={(e) => this.handleVolChange(e,4)}
                  margin="normal"
                  style={textFieldStyle}
                />
              </div>
              <br />
              <div>
                <TextField
                  id="layers"
                  label="Number of Layers"
                  value={this.state.numLayers}
                  onChange={this.handleLayerChange}
                  margin="normal"
                  style={textFieldStyle}
                />
              </div>
            </Paper>
            <div style={topBeakerBackground}>
              <Button fab color={this.state.buttonColors[0]} onClick={() => this.enableColumn(8)} style={{outline: 'none'}} aria-label="add">
                <AddIcon />
              </Button>
              <Button fab color={this.state.buttonColors[1]} onClick={() => this.enableColumn(7)} style={{outline: 'none', marginLeft: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <Button fab color={this.state.buttonColors[2]} onClick={() => this.enableColumn(6)} style={{outline: 'none', marginLeft: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <br/>
              <Button fab color={this.state.buttonColors[3]} onClick={() => this.enableColumn(4)} style={{outline: 'none', marginTop: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <Button fab color={this.state.buttonColors[4]} onClick={() => this.enableColumn(4)} style={{outline: 'none', marginTop: '2%', marginLeft: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <Button fab color={this.state.buttonColors[5]} onClick={() => this.enableColumn(5)} style={{outline: 'none', marginTop: '2%', marginLeft: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <br/>
              <Button fab color={this.state.buttonColors[6]} onClick={() => this.enableColumn(0)} style={{outline: 'none', marginTop: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <Button fab color={this.state.buttonColors[7]} onClick={() => this.enableColumn(1)} style={{outline: 'none', marginTop: '2%', marginLeft: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
              <Button fab color={this.state.buttonColors[8]} onClick={() => this.enableColumn(2)} style={{outline: 'none', marginTop: '2%', marginLeft: '2%'}} aria-label="add">
                <AddIcon />
              </Button>
            </div>
          </div>
          <div className='RightPanel' style={rightPanelStyle}>
            <div style={inputSideLineStyle}>
              {this.state.sideGrid}
            </div>
            {this.state.points}
            <div style={inputBotLineStyle}>
              {this.state.showFirst &&
                <TextField
                  id="0"
                  label="Layer"
                  value={this.state.botVal[0]}
                  onChange={(e) => this.handleLayerValChange(e, "bot")}
                  margin="normal"
                  style={{width: '10%', marginTop: '25px'}}
                />
              }
              {this.state.showSecond &&
                <TextField
                  id="1"
                  label="Layer"
                  value={this.state.botVal[1]}
                  onChange={(e) => this.handleLayerValChange(e, "bot")}
                  margin="normal"
                  style={{width: '10%', marginTop: '25px'}}
                />
              }
              {this.state.showThird &&
                <TextField
                  id="2"
                  label="Layer"
                  value={this.state.botVal[2]}
                  onChange={(e) => this.handleLayerValChange(e, "bot")}
                  margin="normal"
                  style={{width: '10%', marginTop: '25px'}}
                />
              }
            </div>
          </div>
        </div>
        <div style={downloadStyle}>
          <Button onClick={this.downloadTxtFile} style={{outline: 'none'}} raised size="small">
            <img src="https://png.icons8.com/ios/50/000000/download-from-cloud-filled.png" />
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(HomeScreen);
