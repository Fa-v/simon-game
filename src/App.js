import React, { Component } from 'react';
import './App.css';


class App extends Component {
  colors() {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <div className="grid">
          <div className="title subitems">
            <div>Simon</div>
            <div className="screen">10</div>
          </div>
          <div className="buttons subitems">
            <button className="start">Off</button>
            <button className="start">Start</button>
            <button className="strict">Strict</button>
          </div>
          <div className="green" onClick={() => this.colors()}></div>
          <div className="red"></div>
          <div className="yellow"></div>
          <div className="blue"></div>
        </div>
      </div>
    );
  }
}

export default App;
