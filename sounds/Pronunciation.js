import React from 'react';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
import { AppContainer } from 'react-hot-loader';

function render(Component) {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>)
  }
  
