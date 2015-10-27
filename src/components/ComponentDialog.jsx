
import React from 'react';
import Dialog from 'material-ui/lib/dialog';

export const ComponentDialog = React.createClass({

  getInitialState() {
    return {
      modal: false,
    };
  },

  propTypes: {
    children: React.PropTypes.element.isRequired,
    onDismiss: React.PropTypes.func,
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

  isOpen() {
    return this.refs.scrollableContentDialog.isOpen()
  },

  render() {
    const standardActions = [
      { text: 'OK', onTouchTap: this.onDialogOK, ref: 'ok' },
    ];

    return (
        <Dialog
          actionFocus = "ok"
          actions={ standardActions }
          autoDetectWindowHeight
          autoScrollBodyContent
          modal={ this.state.modal }
          onDismiss={ this.props.onDismiss }
          ref="scrollableContentDialog"
          title={ this.props.title }>
          { this.props.children }
        </Dialog>
    );
  },
});

export default ComponentDialog;
