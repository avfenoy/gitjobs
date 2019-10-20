import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './Home.js';
import { theme } from './styles'

const appTheme = createMuiTheme(theme);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <Home/>
      </ThemeProvider>
    </div>
  );
}

export default App;
