
import React from 'react';
import mui from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import TooltrayList from './TooltrayList';
import BottomTear from './BottomTear';

// import ReactRenderVisualizer from 'react-render-visualizer';
// import MaterialUITheme from '../mixins/material-ui-theme'; // XXX cosmos testing

const { List, ListItem, Styles, TextField } = mui;
const { Colors } = Styles;

let CatControls = React.createClass({

  mixins: [
    // ReactRenderVisualizer
    // MaterialUITheme // XXX cosmos testing
  ],

  getInitialState() {
    return {
      errorTextExerciseName: '',
    };
  },

  propTypes: {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      height: 350,
      width: 360,
    };
  },

  handleExerciseNameChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorTextExerciseName: !isNumeric ? '' : 'This field must be a string',
    });
  },

  handleReset(/* e */) {
    this.refs.scrollableContentDialog.show();
  },

  render() {
    const styles = {
      wrapperDiv: {
      },

      container: {
        backgroundColor: '#fff',
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflowY: 'scroll',
        width: this.props.width,
      },

      textfield: {
      },

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
    };

    return (
      <div style={ styles.wrapperDiv }>
        <div style={ styles.container }>
          <TooltrayList container={ false } items={[ 'Shooting Range', 'M4 Carbine' ]} subheader="CAT Tooltray Items"/>
          <List subheader="CAT Control">
            <ListItem leftIcon={ <ActionRestore/> } onClick={ this.handleReset } primaryText="Reset"/>
            <div>
              <div style={ styles.icons }>
                <ContentSend/>
              </div>
              <TextField
                defaultValue=""
                errorStyle={{ color: Colors.red600 }}
                errorText={ this.state.errorTextExerciseName }
                floatingLabelText="Exercise Path and Name"
                hintText="Ex. /PutExercise"
                onChange={ this.handleExerciseNameChange }
                style={ styles.textfield }/>
            </div>
          </List>
        </div>
        <BottomTear width={ this.props.width }/>
      </div>
    );
  },
});

export default CatControls;
