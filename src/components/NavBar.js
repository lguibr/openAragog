import React, { Component } from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

export class NavBar extends Component {
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>          
          <img src= {require('./aragog.png')} alt="Aragog a Smart Spider" height="50" width="50" /> 
          <Typography variant="title" color="inherit">
            Aragog - Raspagem de verbas do FNDE
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar


