import {update as updateSnake, draw as drawSnake,getSnakeHead,snakeIntersection,SNAKE_SPEED} from './snake.js';
import{update as updateFood, draw as drawFood} from './food.js';
import{outsideGrid} from './grid.js';
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.querySelector("#game-board");


function main(currentTime)
{
  if(gameOver){
    if(confirm("You lost. Press OK to restart")){
      window.location = '/';
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if(secondSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;
  update();
  draw();
  
}

function update()
{
  updateSnake();
  updateFood();
  checkDeath();
}

function draw()
{
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath(){
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

window.requestAnimationFrame(main);