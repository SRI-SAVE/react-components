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
