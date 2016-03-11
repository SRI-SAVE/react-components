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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      method: 'post',
      mode: 'cors',
      body: `object=${ JSON.stringify({ type: 'create', ID: this.props.items[ key ].ID, auto: false }) }`,
    })
    .then(response => response.json())
    .then(json => {
      this.props.onItemClick(key, json);
    })
    .catch(e => console.error(e));
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
    const { clearFix, container, items, subheader } = this.props;
    const list = <List subheader={ subheader || 'Tooltray Items' }>
        { items != null?
          items.map((ttObj, idx) =>
          <ListItem
            key={ ttObj.ID }
            leftIcon={ <MapsTerrain/> }
            onClick={ this.handleFetchToolTrayItem.bind(this, idx) }
            primaryText={ ttObj.name }/>
          ) :
          null
        }
      </List>

    return container? <div className={ clearFix? 'clearfix' : '' }>
      <div style={ styles.wrapperDiv }>
        <div style={ styles.container }>
          { list }
        </div>
        <BottomTear/>
      </div>
    </div> : list
  },
});

export default TooltrayList;
