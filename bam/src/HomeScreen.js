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

  constructor(props, context) {
    super(props, context);

    this.handleVolChange = this.handleVolChange.bind(this);
    this.handleLayerChange = this.handleLayerChange.bind(this);
    this.handleCode = this.handleCode.bind(this);

    this.state = {
      layerVal: [],
      botVal: [],
      matrix: [],
      code: 'M118 Cold Extrusion\nM302 S0\nG90\nM117 Calibration\nG0 Z45 F6000\nM117 Homing X and Y\nG28 X Y\nM117 Homing Z\nG0 X45 Y100\nG28 Z\nG90\nM117 Centering Needle Over Beaker\nG0 Z45\nG0 X137.50 Y67.50 (Center of plate)\nG90\nM117 Centering over Beaker\nG0 Z45 ; Raise to just above Beaker Rim\nG0 X137.50 Y67.\nM117 Switch to Relative Coordinates\nG91; Relative Coordiantes\n',
    }
  }

  downloadTxtFile = () => {
    var element = document.createElement("a");
    var file = new Blob([this.state.code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "BAM Creation";
    element.click();
  }

  handleVolChange(e){
    this.setState({
      vol: e.target.value
    })
  }

  handleLayerValChange(e, i, place){
    if(place === "side"){

    } else {

    }
  }

  handleLayerChange(e){
    var grid = [];
    var i = 0;
    var counter = 0;

    for(i = 0; i < e.target.value; i++){
      grid.push(<TextField
                  id={counter}
                  label="Layer"
                  value={this.state.layerVal[i]}
                  onChange={(e) => this.handleLayerValChange(e, counter, "side")}
                  margin="normal"
                  style={{width: '10%', marginLeft: '-10%'}}
                />);
      counter++;
    }

    this.setState({
      numLayers: e.target.value,
      sideGrid: grid,
    })
  }

  handleCode(e){
    this.setState({
      code: this.state.code + e.target.value,
    })
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
      backgroundImage: 'url("/beaker.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80% 80%',
      backgroundPosition: 'center center',
      marginTop: '1%',
      marginRight: '1%',
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
      paddingTop: '5%',
      textAlign: 'left',
    }
    const downloadStyle = {
      paddingTop: '5%',
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
                  id="vol"
                  label="Volume of Solids"
                  value={this.state.vol}
                  onChange={this.handleVolChange}
                  margin="normal"
                  style={textFieldStyle}
                />
              </div>
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
              <span style={topBeakerBackground}>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
                <Button fab style={{outline: 'none'}} aria-label="add">
                  <AddIcon />
                </Button>
              </span>
            </div>
            <div style={downloadStyle}>
              <Button onClick={this.downloadTxtFile} style={{outline: 'none'}} raised size="small">
                <img src="https://png.icons8.com/ios/50/000000/download-from-cloud-filled.png" />
              </Button>
            </div>
          </div>
          <div className='RightPanel' style={rightPanelStyle}>
            <div style={inputSideLineStyle}>
              {this.state.sideGrid}
            </div>
            <div style={inputBotLineStyle}>
              <TextField
                id={0}
                label="Layer"
                value={this.state.botVal[0]}
                onChange={(e) => this.handleLayerValChange(e, 0, "bot")}
                margin="normal"
                style={{width: '10%'}}
              />
              <TextField
                id={1}
                label="Layer"
                value={this.state.layerVal[1]}
                onChange={(e) => this.handleLayerValChange(e, 1, "bot")}
                margin="normal"
                style={{width: '10%'}}
              />
              <TextField
                id={2}
                label="Layer"
                value={this.state.layerVal[2]}
                onChange={(e) => this.handleLayerValChange(e, 2, "bot")}
                margin="normal"
                style={{width: '10%'}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(HomeScreen);
