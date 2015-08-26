
// See why this is here, there ...
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// http://material-ui.com/#/get-started

// Material-UI's ThemeManager component uses React's context feature to manage
// Theme objects. Contexts in React propogates values down from one component
// down to all of its children and grandchildren. Insert the following code in
// your outermost component, so that all Material-UI components used through-out
// the site have access to the theme.
//
// Please note that since v0.8.0, you also need to define a theme for components
// to start working.

import React from 'react';
import { Styles } from 'material-ui';
import ReactRenderVisualizer from 'react-render-visualizer';

const ThemeManager = new Styles.ThemeManager();

export default {

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {

    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },
}
