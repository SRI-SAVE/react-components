import React from 'react';
import mui from 'material-ui';
import ReactRenderVisualizer from 'react-render-visualizer';
import MaterialUITheme from '../mixins/material-ui-theme';

let RaisedButton = mui.RaisedButton;
let ButtonComponent = React.createClass({

  mixins: [
    ReactRenderVisualizer,
    MaterialUITheme
  ],

  getInitialState() {
    return { };
  },

  render() {
    return <RaisedButton label="Default"/>;
  }
});

export default ButtonComponent;
