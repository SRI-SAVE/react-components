
import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

// import ReactRenderVisualizer from 'react-render-visualizer';
// import MaterialUITheme from '../mixins/material-ui-theme'; // XXX cosmos testing

let ComponentDialog = React.createClass({

  mixins: [
    // ReactRenderVisualizer
    // MaterialUITheme // XXX cosmos testing
  ],

  getInitialState() {
    return {
      modal: false,
    };
  },

  propTypes: {
    children: React.PropTypes.element.isRequired,
    title: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      title: 'Component Dialog',
    };
  },

  show() {
    this.refs.scrollableContentDialog.show();
  },

  dismiss() {
    this.refs.scrollableContentDialog.dismiss();
  },

  render() {
    const dialogActions = [
      <FlatButton
        key={ 2 }
        label="OK"
        onTouchTap={ this.dismiss }
        primary={ true }/>,
    ];

    return (
        <Dialog
          actions={ dialogActions }
          autoDetectWindowHeight={ true }
          autoScrollBodyContent={ true }
          modal={ this.state.modal }
          ref="scrollableContentDialog"
          title={ this.props.title }>
          { this.props.children }
        </Dialog>
    );
  },
});

export default ComponentDialog;
