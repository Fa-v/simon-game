import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      computer: [],
      strictMode: false,
      activeColor: null,
      playerTurn: false,
      currStep: 0,
      interval: 700,
      count: 0
    }
    this.sequence = [];
    this.timer = null;
  }

  /* playSound(color) {
    const sounds = {
      green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
      red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
      yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
      blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    };
    let buttonSound = new Audio(sounds[color]);
    buttonSound.play();
  } */

  startGame() {
    this.generateColor();
  }

  strictMode() {
    this.setState((prevState) => {
      return {
        strictMode: !prevState.strictMode
      };
    });
  }
  
  switchTurn() {
    this.setState((prevState) => {
      return {
        playerTurn: !prevState.playerTurn,
        currStep: 0
      };
    });
  }

  generateColor() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const index = colors.indexOf(color).toString();
    
    this.setState((prevState) => {
      return {
        computer: prevState.computer.concat(index),
        count: prevState.computer.length + 1
      };
    } , this.playSequence);
    /* this.playSound(color); */
    
  }
  
  componentWillUnmount() { 
    this.timer && clearTimeout(this.timer);
  }

  playSequence() {
    const { computer } = this.state;
    for (let i=0; i<computer.length; i++) {
      this.timer = setTimeout(() => {
        this.setState((prevState) => {
          return {
            activeColor: computer[i]
          }
        })
        console.log(i);
      }, 1000 * (i+1));
    }
  }

  player(color) {
    this.sequence = [...this.sequence, color];
    this.checkSequence();
    this.setState({
      playerTurn: true
    });
    /* this.playSound(color); */
  }

  checkSequence() {
    const { computer, strictMode } = this.state;
    let isCorrect = this.sequence[this.sequence.length - 1] === computer[this.sequence.length - 1];
    console.log('CHECK SEQUENCE sequence', this.sequence, 'isCorrect', isCorrect);
    if (!isCorrect && strictMode) {
      this.resetGame();
    }
    if (!isCorrect) {
      this.resetSequence();
      this.playSequence(); 
    }
    if (isCorrect && computer.length === this.sequence.length) {
      this.resetSequence();
      this.generateColor();
    }

  }

  resetSequence() {
    this.sequence = [];
  }

  resetGame() {
    this.setState((prevState) => {
      return {
        computer: [],
        player: [],
        strictMode: false,
        timer: null,
        activeColor: null,
        playerTurn: false,  
        currStep: 0,
        count: 0
      };
    });
    this.sequence = [];
    this.generateColor();
  }

  render() {
    const { count, activeColor } = this.state;
    console.log('RENDER activeColor', activeColor);
    const greenClass = activeColor  === '0' ? 'green animation' : 'green';
    const redClass = activeColor === '1' ? 'red animation' : 'red';
    const yellowClass = activeColor === '2' ? 'yellow animation' : 'yellow';
    const blueClass = activeColor === '3' ? 'blue animation' : 'blue';

    return (
      <div className="App">
        <div className="grid">
          <div className="title subitems">
            <div>Simon</div>
            <div className="screen">{count}</div>
          </div>
          <div className="buttons subitems">
            <button className="start" onClick={() => this.resetGame()}>Reset</button>
            <button className="start" onClick={() => this.startGame()}>Start</button>
            <button className="strict" onClick={() => this.strictMode()}>Strict</button>
          </div>
          <div className={greenClass} key='0' onClick={() => this.player('0')}></div>
          <div className={redClass} key='1' onClick={() => this.player('1')}></div>
          <div className={yellowClass} key='2' onClick={() => this.player('2')}></div>
          <div className={blueClass} key='3' onClick={() => this.player('3')}></div>
        </div>
      </div>
    );
  }
}

export default App;
