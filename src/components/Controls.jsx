/*global SAVE2*/

import React from 'react';
import 'whatwg-fetch';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import LinearProgress from 'material-ui/lib/linear-progress';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ActionBackup from 'material-ui/lib/svg-icons/action/backup';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import TooltrayList from './TooltrayList';
import ExerciseNameField from './ExerciseNameField';
import CheckboxListItems from './CheckboxListItems';

let tooltrayItems = null;
let staticItems = [ ];

export const Controls = React.createClass({

  getInitialState() {
    return {
      instructorMode: false,
      loaded: false,
      tooltrayItems: tooltrayItems,
      staticItems: staticItems,
    };
  },

  propTypes: {
    baseServerAddress: React.PropTypes.string.isRequired,
    forceUpdate: React.PropTypes.bool,
    height:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    instructorMode: React.PropTypes.bool,
    onAssessment: React.PropTypes.func,
    onInstructorModeChange: React.PropTypes.func,
    onReset: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onToolTrayItemClick: React.PropTypes.func,
    savePrimaryText: React.PropTypes.string,
    type: React.PropTypes.oneOf([ 'CAT', 'EUI' ]),
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      forceUpdate: false,
      height: '100%',
      instructorMode: false,
      onAssessment: () => {},
      onInstructorModeChange: (/* newValue */) => {},
      onReset: () => {},
      onSave: () => {},
      onToolTrayItemClick: () => {},
      savePrimaryText: 'Save Exercise', // CAT primary-text
      type: 'CAT',
      width: '100%',
    };
  },

  componentWillMount() {
    if (this.props.forceUpdate) {
      this.resetAnd();
    } else if (tooltrayItems) {
      this.setState({
        instructorMode: this.props.instructorMode,
        loaded: true,
      });
    }
  },

  componentDidMount() {
    if (tooltrayItems == null) {
      this.fetchTooltray();
    }
  },

  fetchTooltray() {
    fetch(`${ this.props.baseServerAddress }${ this.isCAT()? '/CAT' : '' }/inventory`, { mode: 'cors' })
    .then(response => response.json())
    .then(json => {
      tooltrayItems = json.tooltray;
      this.props.onInstructorModeChange(json.instructorMode);
      this.setState({
        instructorMode: json.instructorMode,
        loaded: true,
        tooltrayItems: tooltrayItems,
      });
    })
    .catch(e => console.error(e));
  },

  resetAnd(andFunc) {
    tooltrayItems = null;
    staticItems = [ ];
    this.setState({ tooltrayItems: tooltrayItems, staticItems: staticItems });

    if (andFunc) andFunc();
  },

  handleResetClick(/* e */) {
    fetch(`${ this.props.baseServerAddress }/query`, {
      method: 'post',
      mode: 'cors',
      body: 'query=' + JSON.stringify({ type: 'Reset' }),
    })
    .then(() => {
      this.resetAnd(this.props.onReset);
    })
    .catch(e => { console.error(e); });
  },

  handleSaveClick(/* e */) {
    if (this.isEUI()) this.setState({ instructorMode: false });

    this.props.onSave();
  },

  handleToolTrayItemClick(itemIdx, json) {
    const tti = tooltrayItems[ itemIdx ];
    const name = tti.name;
    const assetURL = json[ 0 ].assetURL;
    const KbId = json[ 0 ].KbId;
    const grouping = json[ 0 ].grouping;
    const spliced = tooltrayItems.splice(itemIdx, 1);

    staticItems.push(spliced[ 0 ]);
    this.setState({
      tooltrayItems: tooltrayItems,
      staticItems: staticItems,
    });
    SAVE2.vwf.view.createSemanticAsset(name, assetURL, KbId, grouping);
    this.props.onToolTrayItemClick(itemIdx);
  },

  isCAT() {
    return this.props.type === 'CAT';
  },

  isEUI() {
    return this.props.type === 'EUI';
  },

  hasEUIAssessmentItemAvailable() {
    return this.state.loaded && this.isEUI() && !this.state.instructorMode;
  },

  hasSaveItemAvaialable() {
    return this.state.loaded && !this.hasEUIAssessmentItemAvailable();
  },

  render() {
    const styles = {
      container: {
        border: 'solid 1px #d9d9d9',
        height: this.props.height,
        overflowY: 'scroll',
        width: this.props.width,
      },
    };

    return <div ref="container" style={ styles.container }>
      { this.state.loaded?
        <TooltrayList
          baseServerAddress={ this.props.baseServerAddress }
          container={ false }
          items={ this.state.tooltrayItems }
          onItemClick={ this.handleToolTrayItemClick }/> :
        <LinearProgress mode="indeterminate"/>
      }
      <MenuDivider/>
      <List subheader="Controls">
        <ListItem leftIcon={ <ActionRestore/> } onClick={ this.handleResetClick } primaryText="Reset"/>
        { this.isCAT()?
          <div>
            <CheckboxListItems items={ this.state.staticItems } onItemClick={ this.handleStaticCBClick }/>
            <ExerciseNameField/>
          </div> :
          null
        }
        { this.hasEUIAssessmentItemAvailable()?
          <ListItem leftIcon={ <ActionBackup/> } onClick={ this.props.onAssessment } primaryText="Assessment"/> :
          null
        }
        { this.hasSaveItemAvaialable()?
          <ListItem
            leftIcon={ <ActionBackup/> }
            onClick={ this.handleSaveClick }
            primaryText={ this.props.savePrimaryText }/> :
          null
        }
      </List>
    </div>;
  },
});

export default Controls;
