import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      generatedColors: [],
      strictMode: false,
      playerTurn: false,
      count: 0,
      classes: ['green', 'red', 'yellow', 'blue']
    }
    this.interval = 600;
    this.playerSequence = [];
    this.timer = null;
    this.defaultColorClasses = ['green', 'red', 'yellow', 'blue'];
  }

  playSound(color) {
    const sounds = {
      0: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
      1: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
      2: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
      3: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
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
    const colors = ['green', 'red', 'yellow', 'blue'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const index = colors.indexOf(color).toString();
    
    this.setState((prevState) => {
      return {
        generatedColors: prevState.generatedColors.concat(index),
        count: prevState.generatedColors.length + 1,
        playerTurn: false
      };
    }, this.playSequence);
  }
  
  componentWillUnmount() { 
    this.timer && clearTimeout(this.timer);
  }

  setColorClasses(colorIndex) {
    return this.defaultColorClasses.map((color, index) => {
      return Number(colorIndex) === index ? color + ' animation' : color;
    });
  }

  animateColors(colorIndex) {
    const newColorClasses = this.setColorClasses(colorIndex);
    // On for 500ms
    setTimeout(() => {
      this.playSound(Number(colorIndex));
      this.setState({ classes: newColorClasses});
    }, 500);
    // Off for 500ms
    setTimeout(() => {
      this.setState({
        classes: this.defaultColorClasses,
        playerTurn: true
      });
    }, 1000);
  }

  playSequence() {
    const { generatedColors } = this.state;
    for (let i = 0; i < generatedColors.length; i++) {
      this.timer = setTimeout(() => {
        this.animateColors(generatedColors[i]);
      }, this.interval * (i + 1));
    }; 
  }

  handlePlayerClick(color) {
    this.playerSequence = [...this.playerSequence, color];
    this.checkSequence();
    this.playSound(color);
  }

  checkSequence() {
    const { generatedColors, strictMode } = this.state;
    const lastPlayerMove = this.playerSequence[this.playerSequence.length - 1];
    const lastGeneratedColor = generatedColors[this.playerSequence.length - 1];
    const isCorrect = lastPlayerMove === lastGeneratedColor;
    const playerHasCompletedSequence = generatedColors.length === this.playerSequence.length;
    const gameIsOver = generatedColors.length === 20;

    if (!isCorrect && strictMode) {
      this.resetGame();
      this.setState({
        count: '!!'
      });
    }
    if (!isCorrect && !strictMode) {
      this.setState({
        count: '!!'
      });
      this.resetSequence();
      this.playSequence();
    }
    if (isCorrect && playerHasCompletedSequence) {
      this.resetSequence();
      this.generateColor();
    }
    if (isCorrect && playerHasCompletedSequence && gameIsOver) {
      this.resetGame();
      this.handleGameOver();
    }
  }

  resetSequence() {
    this.playerSequence = [];
  }

  resetGame() {
    const { strictMode } = this.state;
    this.setState((prevState) => {
      return {
        generatedColors: [],
        strictMode: strictMode ? true: false,
        playerTurn: false,
        count: 0,
        classes: ['green', 'red', 'yellow', 'blue']
      };
    });
    this.playerSequence = [];
    setTimeout(() => {
      this.generateColor();
    }, 1000);
  }

  handleGameOver() {
    this.setState({
      count: 'You Won!'
    });
  }

  render() {
    const { count, classes, strictMode } = this.state;

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
            <button className="strict" onClick={() => this.strictMode()}>Strict {!strictMode ? 'Off' : 'On'}</button>
          </div>
          <div className={classes[0]} onClick={() => this.handlePlayerClick('0')}></div>
          <div className={classes[1]} onClick={() => this.handlePlayerClick('1')}></div>
          <div className={classes[2]} onClick={() => this.handlePlayerClick('2')}></div>
          <div className={classes[3]} onClick={() => this.handlePlayerClick('3')}></div>
        </div>
      </div>
    );
  }
}

export default App;
