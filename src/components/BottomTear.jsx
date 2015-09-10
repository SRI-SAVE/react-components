
import React from 'react';

// import ReactRenderVisualizer from 'react-render-visualizer';

export const BottomTear = React.createClass({

  mixins: [
    // ReactRenderVisualizer
  ],

  propTypes: {
    width:  React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      width: 360,
    };
  },

  render() {
    const style = {
      display: 'block',
      position: 'relative',
      marginTop: -10,
      width: this.props.width,
    };

    return (
      <img
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzNjAgMTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDM2MCAxMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cjxwb2x5Z29uIGZpbGw9IiNEQUQ5RDkiIHBvaW50cz0iMzU5LDAgMzU5LDcuNSAzNTIuNSwwLjUgMzQ1LDguNSAzMzcuNSwwLjUgMzMwLDguNSAzMjIuNSwwLjUgMzE1LDguNSAzMDcuNSwwLjUgMzAwLDguNSAyOTIuNSwwLjUgCgkyODUsOC41IDI3Ny41LDAuNSAyNzAsOC41IDI2Mi41LDAuNSAyNTUsOC41IDI0Ny41LDAuNSAyNDAsOC41IDIzMi41LDAuNSAyMjUsOC41IDIxNy41LDAuNSAyMTAsOC41IDIwMi41LDAuNSAxOTUsOC41IDE4Ny41LDAuNSAKCTE4MCw4LjUgMTcyLjUsMC41IDE2NSw4LjUgMTU3LjUsMC41IDE1MCw4LjUgMTQyLjUsMC41IDEzNSw4LjUgMTI3LjUsMC41IDEyMCw4LjUgMTEyLjUsMC41IDEwNSw4LjUgOTcuNSwwLjUgOTAsOC41IDgyLjUsMC41IAoJNzUsOC41IDY3LjUsMC41IDYwLDguNSA1Mi41LDAuNSA0NSw4LjUgMzcuNSwwLjUgMzAsOC41IDIyLjUsMC41IDE1LDguNSA3LjUsMC41IDEsNy41IDEsMCAwLDAgMCwxMCA3LjUsMiAxNSwxMCAyMi41LDIgMzAsMTAgCgkzNy41LDIgNDUsMTAgNTIuNSwyIDYwLDEwIDY3LjUsMiA3NSwxMCA4Mi41LDIgOTAsMTAgOTcuNSwyIDEwNSwxMCAxMTIuNSwyIDEyMCwxMCAxMjcuNSwyIDEzNSwxMCAxNDIuNSwyIDE1MCwxMCAxNTcuNSwyIDE2NSwxMCAKCTE3Mi41LDIgMTgwLDEwIDE4Ny41LDIgMTk1LDEwIDIwMi41LDIgMjEwLDEwIDIxNy41LDIgMjI1LDEwIDIzMi41LDIgMjQwLDEwIDI0Ny41LDIgMjU1LDEwIDI2Mi41LDIgMjcwLDEwIDI3Ny41LDIgMjg1LDEwIAoJMjkyLjUsMiAzMDAsMTAgMzA3LjUsMiAzMTUsMTAgMzIyLjUsMiAzMzAsMTAgMzM3LjUsMiAzNDUsMTAgMzUyLjUsMiAzNjAsMTAgMzYwLDAgIi8+CjxnPgoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI5MCwxMCAxMDUsMTAgOTcuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTA1LDEwIDEyMCwxMCAxMTIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iNzUsMTAgOTAsMTAgODIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTUwLDEwIDE2NSwxMCAxNTcuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTM1LDEwIDE1MCwxMCAxNDIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTIwLDEwIDEzNSwxMCAxMjcuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTY1LDEwIDE4MCwxMCAxNzIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iNDUsMTAgNjAsMTAgNTIuNSwyIAkiLz4KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMCwxMCAxNSwxMCA3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMwLDEwIDQ1LDEwIDM3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE1LDEwIDMwLDEwIDIyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjYwLDEwIDc1LDEwIDY3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMwMCwxMCAzMTUsMTAgMzA3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI3MCwxMCAyODUsMTAgMjc3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE4MCwxMCAxOTUsMTAgMTg3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI4NSwxMCAzMDAsMTAgMjkyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMzMCwxMCAzNDUsMTAgMzM3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjM0NSwxMCAzNjAsMTAgMzUyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMxNSwxMCAzMzAsMTAgMzIyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjE5NSwxMCAyMTAsMTAgMjAyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjIxMCwxMCAyMjUsMTAgMjE3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI0MCwxMCAyNTUsMTAgMjQ3LjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI1NSwxMCAyNzAsMTAgMjYyLjUsMiAJIi8+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjIyNSwxMCAyNDAsMTAgMjMyLjUsMiAJIi8+CjwvZz4KPC9zdmc+Cg=="
        style={ style }/>
    );
  },
});

export default BottomTear;
