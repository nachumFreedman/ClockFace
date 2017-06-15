import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { mount } from 'enzyme';

import {
  bootStores,
  connectDeviceFactory,
  networkMiddleware,

  getNextState,
  toJS,
  rejectify,
} from 'tahini';


import { getXdataMock } from './network/getXdata';
const networkHandlers = { getXdata: getXdataMock };


it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


it('loads data and converts live', () => {
  let getDevice, appStore;
  
  const stores = bootStores( [ networkMiddleware(networkHandlers) ] );
  ({ getDevice } = connectDeviceFactory( stores ));
  ({ appStore } = stores);

  const dataPath = [];
  const RootP = getDevice(App, dataPath, App.initState);
  
  
  const p = mount(
    <RootP/>
  );

  const input = p.find('input');

  console.log(input.length);
  
});
