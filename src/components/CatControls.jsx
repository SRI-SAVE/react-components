
import React from 'react';
import mui from 'material-ui';
import MapsTerrain from 'material-ui/lib/svg-icons/maps/terrain';
import ActionRestore from 'material-ui/lib/svg-icons/action/restore';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import TooltrayList from './TooltrayList';

// import ReactRenderVisualizer from 'react-render-visualizer';
// import MaterialUITheme from '../mixins/material-ui-theme'; // XXX cosmos testing

const { Checkbox, IconButton, List, ListDivider, ListItem, Styles, TextField, Toggle } = mui;
const { Colors } = Styles;

let CatControls = React.createClass({

  mixins: [
    // ReactRenderVisualizer
    // MaterialUITheme // XXX cosmos testing
  ],

  getInitialState() {
    return {
      error2Text: '',
    };
  },

  propTypes: {
    height: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      height: 350,
    };
  },

  _handleError2InputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      error2Text: !isNumeric ? '' : 'This field must be a string',
    });
  },

  render() {
    const styles = {
      root: {
        width: 360,
        position: 'fixed',
        top: '50%',
        left: '50%',
        margin: '-25% 0 0 -25%',
      },

      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflowY: 'scroll',
        backgroundColor: '#fff',
      },

      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360,
      },

      textfield: {
      },

      icons: {
        height: 24,
        width: 24,
        display: 'inline-block',
        position: 'relative',
        top: 0, // 12 || 4 || 0,
        padding: 12,
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4,
      },
    };

    return (
      <div style={ styles.root }>
        <div style={ styles.container }>
          <TooltrayList container={ false } items={[ 'Shooting Range', 'M4 Carbine' ]} subheader="CAT Tooltray Items"/>
          <List subheader="CAT Control">
            <ListItem leftIcon={ <ActionRestore/> } primaryText="Reset"/>
            <div>
              <div style={ styles.icons }>
                <ContentSend/>
              </div>
              <TextField
                defaultValue=""
                errorStyle={{ color: Colors.red600 }}
                errorText={ this.state.error2Text }
                floatingLabelText="Exercise Path and Name"
                hintText="Ex. /PutExercise"
                onChange={ this._handleError2InputChange }
                style={ styles.textfield }/>
            </div>
          </List>
        </div>
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzNjAgMTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDM2MCAxMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cjxwb2x5Z29uIGZpbGw9IiNEQUQ5RDkiIHBvaW50cz0iMzU5LDAgMzU5LDcuNSAzNTIuNSwwLjUgMzQ1LDguNSAzMzcuNSwwLjUgMzMwLDguNSAzMjIuNSwwLjUgMzE1LDguNSAzMDcuNSwwLjUgMzAwLDguNSAyOTIuNSwwLjUgCgkyODUsOC41IDI3Ny41LDAuNSAyNzAsOC41IDI2Mi41LDAuNSAyNTUsOC41IDI0Ny41LDAuNSAyNDAsOC41IDIzMi41LDAuNSAyMjUsOC41IDIxNy41LDAuNSAyMTAsOC41IDIwMi41LDAuNSAxOTUsOC41IDE4Ny41LDAuNSAKCTE4MCw4LjUgMTcyLjUsMC41IDE2NSw4LjUgMTU3LjUsMC41IDE1MCw4LjUgMTQyLjUsMC41IDEzNSw4LjUgMTI3LjUsMC41IDEyMCw4LjUgMTEyLjUsMC41IDEwNSw4LjUgOTcuNSwwLjUgOTAsOC41IDgyLjUsMC41IAoJNzUsOC41IDY3LjUsMC41IDYwLDguNSA1Mi41LDAuNSA0NSw4LjUgMzcuNSwwLjUgMzAsOC41IDIyLjUsMC41IDE1LDguNSA3LjUsMC41IDEsNy41IDEsMCAwLDAgMCwxMCA3LjUsMiAxNSwxMCAyMi41LDIgMzAsMTAgCgkzNy41LDIgNDUsMTAgNTIuNSwyIDYwLDEwIDY3LjUsMiA3NSwxMCA4Mi41LDIgOTAsMTAgOTcuNSwyIDEwNSwxMCAxMTIuNSwyIDEyMCwxMCAxMjcuNSwyIDEzNSwxMCAxNDIuNSwyIDE1MCwxMCAxNTcuNSwyIDE2NSwxMCAKCTE3Mi41LDIgMTgwLDEwIDE4Ny41LDIgMTk1LDEwIDIwMi41LDIgMjEwLDEwIDIxNy41LDIgMjI1LDEwIDIzMi41LDIgMjQwLDEwIDI0Ny41LDIgMjU1LDEwIDI2Mi41LDIgMjcwLDEwIDI3Ny41LDIgMjg1LDEwIAoJMjkyLjUsMiAzMDAsMTAgMzA3LjUsMiAzMTUsMTAgMzIyLjUsMiAzMzAsMTAgMzM3LjUsMiAzNDUsMTAgMzUyLjUsMiAzNjAsMTAgMzYwLDAgIi8+CjxnPgoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI5MCwxMCAxMDUsMTAgOTcuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTA1LDEwIDEyMCwxMCAxMTIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iNzUsMTAgOTAsMTAgODIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTUwLDEwIDE2NSwxMCAxNTcuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTM1LDEwIDE1MCwxMCAxNDIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTIwLDEwIDEzNSwxMCAxMjcuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTY1LDEwIDE4MCwxMCAxNzIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iNDUsMTAgNjAsMTAgNTIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMCwxMCAxNSwxMCA3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMwLDEwIDQ1LDEwIDM3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE1LDEwIDMwLDEwIDIyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjYwLDEwIDc1LDEwIDY3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMwMCwxMCAzMTUsMTAgMzA3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI3MCwxMCAyODUsMTAgMjc3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE4MCwxMCAxOTUsMTAgMTg3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI4NSwxMCAzMDAsMTAgMjkyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMzMCwxMCAzNDUsMTAgMzM3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjM0NSwxMCAzNjAsMTAgMzUyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMxNSwxMCAzMzAsMTAgMzIyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE5NSwxMCAyMTAsMTAgMjAyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjIxMCwxMCAyMjUsMTAgMjE3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI0MCwxMCAyNTUsMTAgMjQ3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI1NSwxMCAyNzAsMTAgMjYyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjIyNSwxMCAyNDAsMTAgMjMyLjUsMiAJIi8+CjwvZz4KPC9zdmc+Cg=="
          style={ styles.bottomTear }/>
      </div>
    );
  },
});

export default CatControls;
