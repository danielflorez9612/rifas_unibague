import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import Typography from '@material-ui/core/es/Typography/Typography';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import AppBody from './components/AppBody';
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#446289',
            main: '#12385c',
            dark: '#001232',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffff8d',
            main: '#eacf5c',
            dark: '#b59e2b',
            contrastText: '#000000',
        },
    },
});
class App extends Component {
  render() {
        return (
            <MuiThemeProvider theme={theme} >
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Sorteo Asograduados
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AppBody classes={this.props.classes}/>
          </MuiThemeProvider>
        );
  }
}

export default App;
