
import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MapsTerrain from 'material-ui/lib/svg-icons/maps/terrain';
import BottomTear from './BottomTear';
import 'whatwg-fetch';

export const TooltrayList = React.createClass({

  propTypes: {
    baseServerAddress: React.PropTypes.string.isRequired,
    clearFix: React.PropTypes.bool,
    container: React.PropTypes.bool,
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    items: React.PropTypes.array,
    onItemClick: React.PropTypes.func,
    subheader: React.PropTypes.string,
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      clearFix: false,
      height: 200,
      items: [ ],
      container: true,
      onItemClick: (/* key, json */) => {},
      subheader: undefined,
      width: 360,
    };
  },

  handleFetchToolTrayItem(key /*, e */) {
    fetch(`${ this.props.baseServerAddress }/object`,  {
      method: 'post',
      mode: 'cors',
      body: `object=${ JSON.stringify({ type: 'create', ID: this.props.items[ key ].ID, auto: false }) }`,
    })
    .then(response => response.json())
    .then(json => {
      this.props.onItemClick(key, json);
    })
    .catch(e => { console.error(e); });
  },

  render() {
    const styles = {
      wrapperDiv: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360,
      },

      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
      },
    };
    const list = (
      <List subheader={ this.props.subheader || 'Tooltray Items' }>
        { this.props.items != null?
          this.props.items.map((ttObj, idx) =>
            <ListItem
              key={ ttObj.ID }
              leftIcon={ <MapsTerrain/> }
              onClick={ this.handleFetchToolTrayItem.bind(this, idx) }
              primaryText={ ttObj.name }/>
            ) :
          null
        }
      </List>
    );

    return this.props.container? (
      <div className={ this.props.clearFix ? 'clearfix' : '' }>
        <div style={ styles.wrapperDiv }>
          <div style={ styles.container }>
            { list }
          </div>
          <BottomTear/>
        </div>
      </div>
    ) : list;
  },
});

export default TooltrayList;
