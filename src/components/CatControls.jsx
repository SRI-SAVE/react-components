
import React from 'react';
import mui from 'material-ui';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import TooltrayList from './TooltrayList';
import BottomTear from './BottomTear';

// import ReactRenderVisualizer from 'react-render-visualizer';
// import MaterialUITheme from '../mixins/material-ui-theme'; // XXX cosmos testing

const { Dialog, FlatButton, List, ListItem, Styles, TextField } = mui;
const { Colors } = Styles;

let CatControls = React.createClass({

  mixins: [
    // ReactRenderVisualizer
    // MaterialUITheme // XXX cosmos testing
  ],

  getInitialState() {
    return {
      errorTextExerciseName: '',
      modal: false,
    };
  },

  propTypes: {
    height: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      height: 350,
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
      root: {
        width: 360,
        position: 'fixed',
        top: '50%',
        left: '50%',
        margin: '-25% 0 0 -25%',
      },

      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflowY: 'scroll',
        backgroundColor: '#fff',
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

    const dialogActions = [
      <FlatButton
        key={ 1 }
        label="Cancel"
        onTouchTap={ this.handleDialogCancel }
        secondary={ true }/>,

      <FlatButton
        key={ 2 }
        label="Submit"
        onTouchTap={ this.handleDialogSubmit }
        primary={ true }/>,
    ];

    return (
      <div ref="fooBaz" style={ styles.root }>
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
        <BottomTear/>
        <Dialog
          actions={ dialogActions }
          autoDetectWindowHeight={ true }
          autoScrollBodyContent={ true }
          modal={ this.state.modal }
          ref="scrollableContentDialog"
          title="Dialog With Scrollable Content">
          <div ref="fooBar" style={{ height: '1000px' }}>
            Really long content
          </div>
        </Dialog>
      </div>
    );
  },
});

export default CatControls;
