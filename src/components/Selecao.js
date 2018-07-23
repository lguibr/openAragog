import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControlcid: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  formControluf: {
    margin: theme.spacing.unit,
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Selecao extends React.Component {
  state = {
    age: '',
    name: 'hai',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
        <div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControluf}>
          <InputLabel htmlFor="uf">UF</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'UF',
              id: 'uf',
            }}
          >
            <MenuItem value="">
              <em>Nenhuma</em>
            </MenuItem>
            <MenuItem value={10}>SP</MenuItem>
            <MenuItem value={20}>MG</MenuItem>
            <MenuItem value={30}>ES</MenuItem>
          </Select>
        </FormControl>           
      </form>

      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControlcid}>
          <InputLabel htmlFor="uf">Cidade</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'Selecione a UF',
              id: 'uf',
            }}
          >
            <MenuItem value="">
              <em>Nenhuma</em>
            </MenuItem>
            <MenuItem value={10}>Belo Horizonte</MenuItem>
            <MenuItem value={20}>Divinopolis</MenuItem>
            <MenuItem value={30}>Arcos</MenuItem>
          </Select>
        </FormControl>           
      </form>
      </div>
    );
  }
}

Selecao.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Selecao);