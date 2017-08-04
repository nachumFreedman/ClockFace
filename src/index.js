import React from 'react';
import { render } from 'react-dom';
import { bootApp, networkMiddleware } from 'tahini';

import Clock from './Clock';
import './index.css';

import networkHandlers from './network/';
import registerServiceWorker from './registerServiceWorker';
import DropDown from './DropDown'

const RootP = bootApp(
  [ networkMiddleware(networkHandlers) ]
).getDevice(Clock, [], Clock.initState);

render(
  <RootP/>,
  document.getElementById('root')
);


registerServiceWorker();
