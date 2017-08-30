import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Header />
        </MuiThemeProvider>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
