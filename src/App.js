import React, { Component } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import {Content} from './components/Content'



class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Content />
      </div>
      
    );
  }
}

export default App;



