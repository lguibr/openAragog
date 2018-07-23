import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import OutputCard from './OutputCard'
import InputCard from './InputCard';
import ProcessCard from './ProcessCard';

const style = {
    Grid:{padding:20}
}

export class Content extends Component {
  render() {
    return (
       <Grid container spacing={24} style={style.Grid}>
           <Grid item sm>
                <InputCard />
           </Grid>
           <Grid item sm>
                <ProcessCard />
           </Grid>
           <Grid item sm>
                <OutputCard />
           </Grid>
       </Grid>
    )
  }
}

export default Content
