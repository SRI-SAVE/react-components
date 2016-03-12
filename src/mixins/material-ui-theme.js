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

// See why this is here, there ...
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// http://material-ui.com/#/get-started

// This is to eliminate warnings of "parent-based and owner-based contexts differ"
// https://gist.github.com/jimfb/0eb6e61f300a8c1b2ce7

import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

export default {

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },
}
