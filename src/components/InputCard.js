import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Selecao from './Selecao';
import {scrapeSelected} from "../aragog/aragog"


const styles = {
  card: {
    maxWidth: 345,
    minHeight:450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },  
};

function InputCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={require('./map.png')}
          title="Entradas"
        />
        <CardContent >
          <Typography gutterBottom variant="headline" component="h2">
            Entradas
          </Typography>          
          <Selecao />
          </CardContent>
        <CardActions >
          <Grid container justify = "flex-end">
             <Button size="small" onClick={() => {scrapeSelected()}}  variant="raised" color="primary">
              Iniciar
            </Button>   
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}



export default withStyles(styles)(InputCard);