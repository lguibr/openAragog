import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const styles = {
  card: {
    maxWidth: 345,
    minHeight:450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    marginTop:60,
  },
};

function OutputCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={require('./OUTPUTCARDS.png')}
          title="Saídas"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Saídas
          </Typography>
          <Typography component="p">
            Ao final da raspagem e processamento dos dados clique no botão abaixo para baixar as informações.
          </Typography>
          
        </CardContent>
        <CardActions>
        <Grid container justify = "flex-end" className={classes.button}>
          <Button size="small" variant="raised" color="primary">
            Baixar
          </Button>  
          </Grid>        
        </CardActions>
      </Card>
    </div>
  );
}



export default withStyles(styles)(OutputCard);