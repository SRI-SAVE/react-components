
import React from 'react';
import { Styles, TextField } from 'material-ui';
import ActionInput from 'material-ui/lib/svg-icons/action/input';

const { Colors } = Styles;

export const ExerciseNameField = React.createClass({

  getInitialState() {
    return {
      errorTextExerciseName: '',
    };
  },

  onExerciseNameChange(e) {
    const value = e.target.value;
    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    this.setState({
      errorTextExerciseName: !isNumeric ? '' : 'This field must be a string',
    });
  },

  render() {
    const styles = {
      icons: {
        height: 24,
        width: 24,
        display: 'inline-block',
        position: 'relative',
        top: 0, // 12 || 4 || 0,
        padding: 12,
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4,
      },

      textfield: {
      },
    };

    return (
      <div>
        <div style={ styles.icons }>
          <ActionInput/>
        </div>
        <TextField
          defaultValue=""
          errorStyle={{ color: Colors.red600 }}
          errorText={ this.state.errorTextExerciseName }
          floatingLabelText="Exercise Path and Name"
          hintText="Ex. /PutExercise"
          onChange={ this.onExerciseNameChange }
          style={ styles.textfield }/>
      </div>
    );
  },
});

export default ExerciseNameField;
