
import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import Download from 'material-ui/lib/svg-icons/file/file-download';
import RemoveRedEye from 'material-ui/lib/svg-icons/image/remove-red-eye';

export const SimpleMenu = React.createClass({

  propTypes: {
    clearFix: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      clearFix: true,
    };
  },

  render() {
    const styles = {
      menu: {
        marginRight: 32,
        marginBottom: 32,
        float: 'left',
        position: 'relative',
        zIndex: 0,
      },
    };

    return (
      <div className={ this.props.clearFix ? 'clearfix' : '' }>
        <Menu style={ styles.menu }>
          <MenuItem leftIcon={<Download/>} primaryText="Download"/>
          <MenuDivider/>
          <MenuItem leftIcon={<RemoveRedEye/>} primaryText="Preview"/>
        </Menu>
      </div>
    );
  },
});

export default SimpleMenu;
