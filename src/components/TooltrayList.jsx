
import React from 'react';
import mui from 'material-ui';
import MapsTerrain from 'material-ui/lib/svg-icons/maps/terrain';
import BottomTear from './BottomTear';

// import ReactRenderVisualizer from 'react-render-visualizer';

const {  List, ListItem } = mui;

let TooltrayList = React.createClass({

  mixins: [
    // ReactRenderVisualizer
  ],

  propTypes: {
    clearFix: React.PropTypes.bool,
    container: React.PropTypes.bool,
    height: React.PropTypes.number,
    items: React.PropTypes.array.isRequired,
    subheader: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      clearFix: false,
      height: 200,
      items: [ ],
      container: true,
      subheader: undefined,
    };
  },

  render() {
    const styles = {
      root: {
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
        {
          this.props.items.map((name, i) => {
            return <ListItem key={ i } leftIcon={ <MapsTerrain/> } primaryText={ name }/>
          })
        }
      </List>
    );

    return this.props.container? (
      <div className={ this.props.clearFix ? 'clearfix' : '' }>
        <div style={ styles.root }> { /* material-ui docs MobileTearSheet */ }
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
