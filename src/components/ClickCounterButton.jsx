
import React from 'react';
import './ClickCounterButton.css';

let ClickCounterButton = React.createClass({

  propTypes: {
    disabled: React.PropTypes.bool
  },

  getInitialState() {
    return {
      clicks: 1
    };
  },

  render() {
    return (
      <button className="ClickCounterButton"
              disabled={ this.props.disabled }
              onClick={ this.onClick }
              type="button">
      { this.state.clicks == 0 ? 'Click' :
           this.state.clicks === 1 ? 'Clicked once' :
               'Clicked ' + this.state.clicks + ' times' }
      </button>
    );
  },

  onClick() {
    this.setState({ clicks: ++this.state.clicks });
  }
});

export default ClickCounterButton;
