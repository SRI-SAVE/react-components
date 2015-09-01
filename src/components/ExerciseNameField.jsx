
import React from 'react';
import { Styles, TextField } from 'material-ui';

const { Colors } = Styles;

let ExerciseNameField = React.createClass({

  getInitialState() {
    return {
      errorTextExerciseName: '',
    };
  },

  handleExerciseNameChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorTextExerciseName: !isNumeric ? '' : 'This field must be a string',
    });
  },

  render() {
    const textfield = {
    };

    return (
      <TextField
        defaultValue=""
        errorStyle={{ color: Colors.red600 }}
        errorText={ this.state.errorTextExerciseName }
        floatingLabelText="Exercise Path and Name"
        hintText="Ex. /PutExercise"
        onChange={ this.handleExerciseNameChange }
        style={ textfield }/>
    );
  },
});

export default ExerciseNameField;
