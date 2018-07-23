import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Buffer from './Buffer';



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

function ProcessCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={require('./PROCESSCARD.png')}
          title="Processamento"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Processamento
          </Typography>
          <Typography component="p">
            Numero de escolas: XX
          </Typography>
          <Typography component="p">
            Numero de novas verbas: XX
          </Typography>
          <Typography component="p">
            Ultima raspagem executada em XX/XX/XX
          </Typography>
          
            
              <Buffer />
          
        </CardContent>
        
      </Card>
    </div>
  );
}



export default withStyles(styles)(ProcessCard);