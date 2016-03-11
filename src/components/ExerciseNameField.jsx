/*
Copyright 2016 SRI International

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import Styles from 'material-ui/lib/styles/';
import TextField from 'material-ui/lib/text-field';
import ActionInput from 'material-ui/lib/svg-icons/action/input';

const { Colors } = Styles;

export const ExerciseNameField = React.createClass({

  getInitialState() {
    return {
      errorTextExerciseName: '',
    };
  },

  getValue() {
    return this.refs.textField.getValue();
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

    return <div>
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
        ref="textField"
        style={ styles.textfield }/>
    </div>
  },
});

export default ExerciseNameField;
