
import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';

export const CheckboxListItems = React.createClass({

  propTypes: {
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    items: React.PropTypes.array,
    onItemClick: React.PropTypes.func,
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      height: 200,
      items: [ ],
      onItemClick: (/* key, json */) => {},
      width: 360,
    };
  },

  render() {
    return <div>
        { this.props.items != null?
          this.props.items.map((item, idx) =>
          <ListItem
            key={ item.ID }
            leftIcon={ <Checkbox key={ `cb_${item.ID}` } name={ `cb_${item.name}` }/> }
            onClick={ this.props.onItemClick.bind(this, idx) }
            primaryText={ item.name }/>
          ) :
          null
        }
      </div>
  },
});

export default CheckboxListItems;
