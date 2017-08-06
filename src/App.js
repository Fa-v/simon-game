import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      computer: [],
      strictMode: false,
      isActive: false,
      count: 0
    }
    this.sequence = [];
  }

  playSound(color) {
    const sounds = {
      green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
      red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
      yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
      blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    };
    let buttonSound = new Audio(sounds[color]);
    buttonSound.play();
  }

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
  
  generateColor() {
    const { computer } = this.state;
    const colors = ['green', 'red', 'yellow', 'blue'];
    const color = colors[Math.floor(Math.random() * colors.length)];
   
    this.playSound(color);
    this.setState((prevState) => {
      return {
        computer: prevState.computer.concat(color),
        count: prevState.computer.length + 1,
        isActive: false,
      };
    });
      this.playSequence(color);
  }

  playSequence() {
    console.log('playSequence');
  }   

  player(color) {
    const { computer } = this.state;
    this.sequence = [...this.sequence, color];
    this.checkSequence();   
    this.playSound(color);
  }

  checkSequence() {
    const { computer, strictMode } = this.state;
    let isCorrect = this.sequence[this.sequence.length - 1] === computer[this.sequence.length - 1];
    console.log('sequence', this.sequence, 'isCorrect', isCorrect);
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
        isActive: false,
        strictMode: false,
        count: 0
      };
    });
    this.sequence = [];
    this.generateColor();
  }

  render() {
    const { count, isActive, isOn } = this.state;

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
          <div className="green" index='0' onClick={() => this.player('green')}></div>
          <div className="red" index='1' onClick={() => this.player('red')}></div>
          <div className="yellow" index='2' onClick={() => this.player('yellow')}></div>
          <div className="blue" index='3' onClick={() => this.player('blue')}></div>
        </div>
      </div>
    );
  }
}

export default App;
