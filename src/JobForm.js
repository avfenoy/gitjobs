import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControl, FormGroup, FormControlLabel, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import {formStyles} from './styles';
 

class JobForm extends React.Component {

  /** 
  Send prop with form values to parent.
  */
  onSubmit = async (event) => {
    event.preventDefault();
    const formResults = {
      description: event.target.description.value,
      location: event.target.location.value,
      full_time: event.target.full_time.checked
    }
    this.props.updateResults(formResults);
  }

  render () {
    const { classes } = this.props;
      return (
        <form className={classes.form} id='jobform' onSubmit={this.onSubmit}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor='description'>Description</InputLabel>
            <Input autoComplete='off' id='description' aria-label='Description'/>
          </FormControl>

          <FormControl className={classes.input}>
            <InputLabel htmlFor='location'>Location</InputLabel>
            <Input autoComplete='off' id='location' aria-label='Location' />
          </FormControl>

          <FormGroup row>
            <FormControlLabel
              className={classes.input}
              control={<Checkbox id='full_time' color='secondary' aria-label='Full time'/>}
              label='Full time'
            />
          </FormGroup>

          <Button className={classes.button} type='submit' form='jobform' variant='contained' color='secondary' aria-label={'Search'}>Search</Button>
        </form>
      )
  }
}

JobForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(formStyles)(JobForm);