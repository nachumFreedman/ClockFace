import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { fromJS } from 'immutable';

export const convert = (amount, rate) => (
  amount*rate
).toFixed(2);

class App extends Component {
  static get namespace(){
    return 'coinx-app';
  }

  static get actions(){
    return {
      setCoin: () =>({
        network: {
          handler: 'getXdata',
          nextAction: { type: 'setXdata' },
        },
      }),

      setCurrentIn: (number)=> ({
        type: 'setCurrentIn',
        payload: number.target.value,
      })
    };
  }

  static get reducer(){
    return {
      setXdata: (state, { payload }) =>
        state.set('Xdata', fromJS(payload)),

      setCurrentIn: (state, { payload }) =>
        state.set('currentIn', payload),
    }
  }

  static get initState(){
    return fromJS({
      Xdata: null,
      currentIn: 10,
    });
  }

  componentWillMount(){
    this.props.setCoin();
  }
  
  render() {
    const Xdata = this.props.subState.get('Xdata');

    if ( Xdata === null ) return (<div> loading exchange... </div>);

    
    const fCoin = [...Xdata.keys()][0];

    return (
      <div className="App">
        <p>from: {fCoin}</p>

        <input value={this.props.subState.get('currentIn')}
               type="number"
               onChange={this.props.setCurrentIn}/>

        {
          [...Xdata.get(fCoin).keys()].map(k => (
            <p key={k}>
              {k} - {
                convert(
                  this.props.subState.get('currentIn'),
                  Xdata.getIn([fCoin, k])
                )}
            </p>
          ) )
        }

      </div>
    );
  }
}

export default App;
