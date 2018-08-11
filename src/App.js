import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './components/LandingPage';

class App extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <LandingPage/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
