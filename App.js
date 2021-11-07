import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let low = 1;
  let high = 98;
  let x = Math.floor((Math.random()*(high - low + 1)+ low)/2)*2;
  let y = Math.floor((Math.random()*(high - low + 1)+ low)/2)*2;
  return [x,y]
}

const initialState = {
    food: getRandomCoordinates(),
    direction: 'right',
    speed: 100,
    snakeDots: [
      [0,0],
      [2,0]
    ]
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBounds();
    this.checkIfCollision();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        this.setState({direction: 'up'});
        break;
      case 40:
        this.setState({direction: 'down'});
        break;
      case 37:
        this.setState({direction: 'left'});
        break;
      case 39:
        this.setState({direction: 'right'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch(this.state.direction)
    {
      case 'right':
        head = [head[0] + 2, head[1]];
        break;
      case 'left':
        head = [head[0] - 2, head[1]]; 
        break;
      case 'down':
        head = [head[0], head[1] + 2];
        break;
      case 'up':
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBounds () {
    let head = this.state.snakeDots[this.state.snakeDots.length -1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0)
      this.onGameOver();
  }

  checkIfCollision()
  {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1])
        this.onGameOver();
    })
  }

  checkIfEat() 
  {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if(head[0] == food[0] && head[1] == food[1]) {
      this.setState({food: getRandomCoordinates()});
      this.bigSnake();
      this.speedIncrease();
    }
  }

  bigSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({snakeDots: newSnake});
  }

  speedIncrease() {
    if (this.state.speed > 10){
      this.setState({speed: this.state.speed -10});
    }
  }

  onGameOver()
  {
    alert("Game Over you loser");
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        <div> 
          <p className="title"> Snake Game </p> 
        </div>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </div>
    );
  }
}

export default App;
